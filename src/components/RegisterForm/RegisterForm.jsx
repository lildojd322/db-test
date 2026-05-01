"use client"
import styles from './RegisterForm.module.scss'

const RegisterForm = () => {
    return (
        <>
            <h1 className={styles.h1}>Register account</h1>
            <form className={styles.form}>

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
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat password"
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