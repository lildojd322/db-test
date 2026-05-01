import RegisterForm from "../../components/RegisterForm/RegisterForm"
import Link from "next/link"


const Register = () => {
    return (
        <div>

            <RegisterForm />
            <div className="authFooter">
                <p>
                    Already have an account? <Link href='/signin'>Sign in </Link>

                </p>
            </div>
        </div >
    )
}

export default Register