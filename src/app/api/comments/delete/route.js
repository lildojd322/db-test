    import { deleteCommentById } from '../../../../lib/db'
    import { NextResponse } from 'next/server'
    import { idParamSchema } from '../../../../lib/zod'

    export async function DELETE(request) {
        try {
            const { searchParams } = new URL(request.url)
            const validation = idParamSchema.safeParse({
                id: searchParams.get('id')
            })


            if (!validation.success) {

                console.log("backend Zod error:", validation.error.format())
                return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
            }
            const { id } = validation.data
            await deleteCommentById(id)
            return NextResponse.json({
                message: "comments deleted successfully",
                success: true,

            }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
        }


    }