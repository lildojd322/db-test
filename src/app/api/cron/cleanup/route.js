import { NextResponse } from "next/server"
import { deleteExpiredUsers } from '../../../../lib/db'



export async function DELETE(request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')


    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }


    try {
        await deleteExpiredUsers()

        return NextResponse.json({ success: true, message: 'cleanup successful' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 })
    }

}