'use client'

import { useEffect, useState } from 'react'
import styles from './SwitchTheme.module.scss'


const SwitchTheme = () => {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; theme=`)
        if (parts.length === 2) {
            const themeValue = parts.pop().split(';').shift()
            setTheme(themeValue || 'dark')
        }
    }, [])

    const toogleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        document.cookie = `theme=${newTheme}; path=/`
        setTheme(newTheme)
       document.documentElement.setAttribute('data-theme', newTheme);
    }
    return (
        <div className={styles.toggleSwitch} >
            <label className={styles.switchLabel}>
                <input type="checkbox" className={styles.checkbox} onChange={toogleTheme} checked={theme === 'light'} />
                <span className={styles.slider}></span>
            </label>
        </div>
    )
}

export default SwitchTheme