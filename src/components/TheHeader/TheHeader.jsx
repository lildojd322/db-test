
import Navigation from '../Navigation/Navigation'
import { getLinksFromDB } from '../../lib/db'
import styles from './TheHeader.module.scss'
import SwitchTheme from '@/components/SwitchTheme/SwitchTheme'


const TheHeader = async () => {
    const navItems = await getLinksFromDB()
    
    return (
        <header className={styles.header}>  
            <Navigation  navLinks={navItems} />
               <SwitchTheme />
        </header>
    )
}

export default TheHeader