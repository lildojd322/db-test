import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { updateUserAvatarByEmail } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth'


export const POST = async (request) => {


    try {

        const session = await getServerSession(authConfig)

        const formData = await request.formData()
        const file = formData.get('avatar')

        if (!file) {
            return NextResponse.json({ error: 'No file' }, { status: 400 })
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'JPG, PNG or WebP only' }, { status: 400 })
        }


        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const optimized = await sharp(buffer)
            .resize(300, 300, { fit: 'cover' })
            .webp({ quality: 80 })
            .toBuffer()


        const avatarsDir = path.join(process.cwd(), 'public/avatars')
        await mkdir(avatarsDir, { recursive: true })

        const filename = `avatar-${Date.now()}.webp`
        const filepath = path.join(avatarsDir, filename)
        await writeFile(filepath, optimized)

        const url = `/avatars/${filename}`


        await updateUserAvatarByEmail(session?.user?.email, url)
        return NextResponse.json({ url })


    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }


}