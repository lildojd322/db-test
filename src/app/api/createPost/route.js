import { forwardPostToDB } from "@/lib/db"
import { NextResponse } from "next/server"
import { postSchema } from "@/lib/zod"
import { z } from "zod"
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next"



export const POST = async (request) => {
    const session = await getServerSession(authConfig)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {

        const userName = session.user.name
        const userEmail = session.user.email
        const userId = session.user.id

        const body = await request.json()
        const { description, title } = postSchema.parse(body)



        await forwardPostToDB(title, description, userEmail, userName,userId)
        return NextResponse.json({
            message: "post created successfully",
            success: true
        }, { status: 201 })
    } catch (error) {
        console.error("API ERROR:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

