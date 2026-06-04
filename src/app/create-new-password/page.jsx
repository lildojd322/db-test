import { redirect } from 'next/navigation'
import { authConfig } from '../../lib/auth'
import styles from '../reset-password/reset.module.scss'
import { getServerSession } from 'next-auth'
import { getUserFromDBByResetToken, deleteResetTokenById, updateUserPassword } from '../../lib/db'
import { newPasswordSchema } from '../../lib/zod'
import { NextResponse } from 'next/server'

const ResetPassword = async ({ searchParams }) => {
    const session = await getServerSession(authConfig)

    if (session?.user) {
        redirect('/profile')
    }
    let currentUser = null
    const params = await searchParams
    const token = params.token
    const errorToken = params?.error

    if (!token) {
        return (
            <div style={{ maxWidth: "450px", margin: "100px auto", textAlign: "center", fontFamily: "sans-serif" }}>
                <h2 style={{ color: "#ef4444" }}>
                    Reset error</h2>
                <p>Invalid or broken link. Token missing.</p>
            </div>
        )
    }


    try {

        currentUser = await getUserFromDBByResetToken(token)

        if (!currentUser) {
            return (<div style={{ maxWidth: "450px", margin: "100px auto", textAlign: "center", fontFamily: "sans-serif" }}>
                <h2 style={{ color: "#ef4444" }}>     Activation error</h2>
                <p>
                    The link is invalid or user does not exist.</p>
            </div>)
        }
        const expirationTime = new Date(currentUser.resetToken_createdAt).getTime() + 60 * 60 * 1000


        if (Date.now() > expirationTime) {
            await deleteResetTokenById(currentUser.id)

            return (
                <div style={{ maxWidth: "450px", margin: "100px auto", textAlign: "center", fontFamily: "sans-serif" }}>
                    <h2 style={{ color: "#ef4444" }}>Link has expired</h2>
                    <p>The link's validity period (1 hour) has expired. Please reset again.</p>
                </div>
            )
        }

    } catch (error) {
        console.error("SERVER CONFIRM ERROR:", error);
        return (
            <div style={{ maxWidth: "450px", margin: "100px auto", textAlign: "center", fontFamily: "sans-serif" }}>
                <h2>Server error</h2>
                <p>An internal error occurred during activation. Please try again later.</p>
            </div>
        )
    }


    const handleSubmit = async (formData) => {
        'use server'

        const data = Object.fromEntries(formData.entries())

        const validation = newPasswordSchema.safeParse(data)


        if (!validation.success) {
            const firstError = validation.error.issues[0].message
            redirect(`?token=${token}&error=${encodeURIComponent(firstError)}`)
        }

        const { password } = validation.data



        await updateUserPassword(password, currentUser.id)
        redirect('/signin?isReset=true')

    }



    return (
        <form action={handleSubmit}>
            <h2 className={styles.h2}>Enter new password</h2>

            {errorToken && <p style={{ color: '#ef4444', textAlign: 'center' }}>{errorToken}</p>}

            <div className={styles.inputContainer}>

                <input className={styles.input} required placeholder='password' type="password" name="password" />
                <input className={styles.input} required placeholder='repeat password' type="password" name="repeatPassword" />
                <button className={styles.submitButton} type='submit'> confirm</button>
            </div>


        </form>
    )
}

export default ResetPassword