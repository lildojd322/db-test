import styles from './LoadingLatestsPosts.module.scss'

const SkeletonCard = () => (
    <div className={styles.skeletonInner}>
        <div className={`skeleton-title ${styles.title}`}></div>
        <div className={styles.meta}>
            <div className={`skeleton-line short ${styles.line1}`}></div>
            <div className={`skeleton-line short ${styles.line2}`}></div>
        </div>
    </div>
)

const LoadingLatestsPosts = () => {
    return (
        <ul className={styles.container}>
            {[1, 2, 3].map((i) => (
                <li className={styles.card} key={i}>
                    <SkeletonCard />
                </li>
            ))}
        </ul>
    )
}

export default LoadingLatestsPosts