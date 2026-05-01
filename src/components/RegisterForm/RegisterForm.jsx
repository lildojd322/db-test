"use client"
import styles from './RegisterForm.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


const RegisterForm = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        if (data.password.length < 7) {
            setError('password is too short')
            return
        }
        if (data.password.length > 15) {
            setError('password is too long')
            return
        }

        if (data.password !== data.repeatPassword) {
            setError('the passwords dont match')
            return
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (response.ok) {

            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/profile'
            })
        } else {
            const result = await response.json()
            setError(result.error || 'Registration failed')
        }
    }






    return (
        <>
            <h1 className={styles.h1}>Register account</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                  {error && <div className={styles.error}>{error}</div>}
                <input
                    type="text"
                    name="name"
                    placeholder="name"

                    required
                    className={styles.input}
                />
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
                    autoComplete="new-password"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.submitButton}>
                    Register
                </button>
            </form>
        </>
    )
}

export default RegisterForm