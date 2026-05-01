import Link from "next/link"
import GoogleButton from "../../components/GoogleButton/GoogleButton"
import SignInForm from '../../components/SigninForm/SignInForm'
const Signin = () => {
    return (
        <div className="authorizeContainer" >
            <GoogleButton />
            <div >
                <p className="signOr">or sign in with email</p>
            </div>
            <SignInForm />
            <div className="authFooter">
                <p>
                    Don't have an account?   <Link href='/register'>Register right now</Link>
                </p>
            </div>



        </div>
    )
}

export default Signin