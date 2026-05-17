import Navigation from '../Navigation/Navigation'
import { getLinksFromDB } from '../../lib/db'
import styles from './TheHeader.module.scss'


const TheHeader = async () => {
    const navItems = await getLinksFromDB()

    return (
        <header className={styles.header}>
            <Navigation navLinks={navItems} />
         
        </header>
    )
}

export default TheHeader