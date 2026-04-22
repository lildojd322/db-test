


import Navigation from '..//Navigation/Navigation'
import { getLinksFromDB } from '../../lib/db'
import SwitchTheme from '@/components/SwitchTheme/SwitchTheme'




const TheHeader = async () => {

    const navItems = await getLinksFromDB()
    return (
        <header>
            <Navigation navLinks={navItems} />
            <SwitchTheme />
        </header>
    )
}

export default TheHeader 