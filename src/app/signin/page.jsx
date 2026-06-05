import Link from "next/link"
import GoogleButton from "../../components/GoogleButton/GoogleButton"
import { authConfig } from '../../lib/auth'
import SignInForm from '../../components/SigninForm/SignInForm'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'



const Signin = async ({ searchParams }) => {
    const params = await searchParams
    let verified = params?.verified || ''
    let isReset = params?.isReset || ''

    const session = await getServerSession(authConfig)



    if (session) {
        redirect("/profile")
    }

    return (
        <div className="authorizeContainer">
            {verified === "true" && (
                <div style={{ color: "#22c55e", marginBottom: "15px", textAlign: "center", fontWeight: "bold", maxWidth: '300px' }}>
                    Email successfully confirmed! Now you can sign in with your password.
                </div>
            )}
            {isReset === 'true' && (
                <div style={{ color: "#22c55e", marginBottom: "15px", textAlign: "center", fontWeight: "bold", maxWidth: '300px' }}>
                    Your password has been successfully reset! You can now log in with your new password.
                </div>
            )}
            <GoogleButton />
            <div>
                <p className="signOr">or sign in with email</p>
            </div>
            <SignInForm />
            <div className="authFooter">
                <p>
                    Don't have an account? <Link href='/register'>Register right now</Link>
                </p>
                <p>
                    <Link href='/reset-password'>forgot your password?</Link>
                </p>
            </div>
        </div>
    )
}

export default Signin