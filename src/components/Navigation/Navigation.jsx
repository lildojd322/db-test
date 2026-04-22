'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.scss'

const Navigation = ({ navLinks }) => {
    const pathname = usePathname()
    return (

        <nav className={styles.nav}>
            {navLinks.map(link => {
                const isActive = pathname === link.href
                return (

                    <Link key={link.label} className={`${styles.link} ${isActive ? styles.active : ''}`} href={link.href}> {link.label} </Link>
                )
            })}
        </nav>
    )
}

export default Navigation