import GoogleButton from "../../components/GoogleButton/GoogleButton"
import SignInForm from '../../components/SigninForm/SignInForm'
const Signin = () => {
    return (
        <div  >
            <GoogleButton />
            <div >
                <span >or sign in with email</span>
            </div>
            <SignInForm />
        </div>
    )
}

export default Signin