'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.scss'
import { useSession } from "next-auth/react"



const Navigation = ({ navLinks }) => {
    const pathname = usePathname()
    const session = useSession()
    console.log(session)
    return (
        <>
            <div className={styles.leftSection}>

            </div>
            <nav className={styles.nav}>
                {navLinks.map(link => {
                    const isActive = pathname === link.href
                    return (

                        <Link key={link.label} className={`${styles.link} ${isActive ? styles.active : ''}`} href={link.href}> {link.label} </Link>

                    )

                })}
            </nav>
            <div className={styles.rightSection}>
                {session.status === 'loading' && <span>Загрузка...</span>}

                {session.status === 'authenticated' && session?.data?.user && (
                    <Link style={{
                         marginRight: '20px',
                        height: '32px',
                        width: '32px'
                    }} href="/profile">
                        <img className={styles.userAvatar}
                            src={session.data.user.image}
                            alt="avatar"
                            style={{ width: 32, height: 32, borderRadius: '50%' }}
                        />
                    </Link>
                )}

                {session.status === 'unauthenticated' && (
                    <Link href="/api/auth/signin" className={styles.signInButton}>sign in</Link>
                )}

            </div>
        </>
    )
}

export default Navigation