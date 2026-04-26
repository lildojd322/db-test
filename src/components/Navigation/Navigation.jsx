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

            <nav className={styles.nav}>
                {navLinks.map(link => {
                    const isActive = pathname === link.href
                    return (

                        <Link key={link.label} className={`${styles.link} ${isActive ? styles.active : ''}`} href={link.href}> {link.label} </Link>

                    )

                })}
            </nav>
            {session.status === 'loading' && <span>Загрузка...</span>}

            {session.status === 'authenticated' && session?.data?.user && (
                <Link href="/profile">
                    <img className={styles.userAvatar}
                        src={session.data.user.image}
                        alt="avatar"
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                    />
                </Link>
            )}

            {session.status === 'unauthenticated' && (
                <Link href="/api/auth/signin">sign in</Link>
            )}
        </>
    )
}

export default Navigation