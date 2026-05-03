'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from './SignInForm.module.scss'
import { loginSchema } from '@/lib/zod'


const SignInForm = () => {
    const router = useRouter()
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        const formData = new FormData(event.currentTarget)

        const data = Object.fromEntries(formData.entries())

        const validation = loginSchema.safeParse(data)


        if (!validation.success) {
            setError(validation.error.issues[0].message)
            return
        }


        const response = await signIn('credentials', {
            email: validation.data.email,
            password: validation.data.password,
            redirect: false,
        })

        if (response && !response.error) {
            router.push('/profile')
        } else {
            setError('Invalid email or password')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={styles.input}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className={styles.input}
            />
            <button type="submit" className={styles.submitButton}>
                Sign in
            </button>
        </form>
    )
}

export default SignInForm