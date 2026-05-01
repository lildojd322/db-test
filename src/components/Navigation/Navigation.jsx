'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.scss'
import { useSession } from "next-auth/react"
import Image from "next/image"
import getHighResImage from '../../hooks/getHighResImage'


const Navigation = ({ navLinks }) => {
    const pathname = usePathname()
    const session = useSession()

    const userImage = session?.data?.user?.image

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
                        <Image className={styles.userAvatar}
                            src={getHighResImage(userImage)}
                            alt="avatar"
                            width={32}
                            height={32}

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