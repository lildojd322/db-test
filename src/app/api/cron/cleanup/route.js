import { NextResponse } from "next/server"
import { deleteExpiredUsers } from '../../../../lib/db'



export async function GET(request) {

    const authHeader = request.headers.get('Authorization')
    const cronSecret = process.env.CRON_SECRET


    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }


    try {
        await deleteExpiredUsers()

        return NextResponse.json({ success: true, message: 'cleanup successful' }, { status: 200 })

    } catch (error) {
        console.log(error)

        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 })
    }

}