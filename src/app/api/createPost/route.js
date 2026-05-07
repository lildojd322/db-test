import { forwardPostToDB } from "@/lib/db"
import { NextResponse } from "next/server"
import { postSchema } from "@/lib/zod"
import { z } from "zod"




export const POST = async (request) => {
    try {
        const body = await request.json()
        const { description, title } = postSchema.parse(body)



        await forwardPostToDB(title, description)
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

