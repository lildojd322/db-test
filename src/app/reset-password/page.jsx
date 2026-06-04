import { getServerSession } from 'next-auth'
import { forwardResetTokenToDB } from '../../lib/db'
import { createTransport } from 'nodemailer'
import styles from './reset.module.scss'
import { redirect } from 'next/navigation'
import { authConfig } from '../../lib/auth'


const resetPassword = async ({ searchParams }) => {

    const session = await getServerSession(authConfig)

    if (session?.user) {
        redirect('/profile')
    }

    const params = await searchParams
    const isSent = params?.success === 'true'

    const handleSubmit = async (formData) => {
        'use server'
        const email = formData.get('email')
        const res = await forwardResetTokenToDB(email)
        const token = res.token


        if (token) {

            const confirmationLink = `${process.env.NEXTAUTH_URL}/create-new-password?token=${token}`

            const transport = createTransport({
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                secure: true,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            })


            await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'mail confirmation',
                html: `
            <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Welcome!</h2>
                    <p>To reset your password, click the button below:</p>
                    <a href="${confirmationLink}" style="background: #2563eb; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                     reset password
                    </a>
                    <p style="margin-top: 15px; color: #666; font-size: 12px;">The link will expire in 1 hour.</p>
                </div>
         `

            })

        }





        redirect('?success=true')
    }
    if (isSent) {
        return <h1> We have sent a confirmation to your email.</h1>
    }


    return (
        <form action={handleSubmit} >
            <h2 className={styles.h2}>
                Enter your email
            </h2>
            <div className={styles.inputContainer}>
                <input placeholder="Email"
                    required className={styles.input} type="email" name="email" />
                <button type='submit' className={styles.submitButton}>confirm</button>
            </div>

        </form>
    )
}

export default resetPassword