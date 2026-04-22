'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Navigation = ({ navLinks }) => {
    const pathname = usePathname()
    return (

        <nav>
            {navLinks.map(link => {
                const isActive = pathname === link.href
                return (

                    <Link key={link.label} className={isActive ? 'active' : ''} href={link.href}> {link.label} </Link>
                )
            })}
        </nav>
    )
}

export default Navigation