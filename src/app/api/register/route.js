import { forwardUserToDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request) {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
        return NextResponse.json({ error: "all fields are required   " }, { status: 500 })
    }

    try {

        await forwardUserToDB(email, password, name)
        return NextResponse.json({
            message: "User created successfully",
            success: true
        }, { status: 201 });


    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
            return NextResponse.json(
                { error: "This email is already registered" },
                { status: 400 }
            )
        }
        console.log(error)
    }
}   