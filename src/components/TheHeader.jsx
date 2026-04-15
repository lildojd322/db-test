import Link from 'next/link'
import Navigation from './Navigation'
import { getLinksFromDB } from '../lib/db'




const TheHeader = async () => {

    const navItems = await getLinksFromDB()
    return (
        <header>
            <Navigation navLinks={navItems} />

        </header>
    )
}

export default TheHeader 