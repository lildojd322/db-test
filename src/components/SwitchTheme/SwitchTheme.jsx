import styles from './SwitchTheme.module.scss'

const SwitchTheme = () => {
    return (
        <div className={styles.toggleSwitch}>
            <label className={styles.switchLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.slider}></span>
            </label>
        </div>
    )
}

export default SwitchTheme