import styles from '../../../components/Post/Post.module.scss'

const LoadingPost = () => {
    return (
        <div className={styles.postContainer}>
        
            <h1 className={styles.title}>
                <div className="skeleton-line short" style={{marginBottom: '2rem', width: '500px', height: '30px'}}></div>
            </h1>

            <div className={styles.body}>
                <div className="skeleton-line"></div>

                <div className="skeleton-line short"></div>
            </div>
            <div className={styles.authorLink}>
                <pre className={styles.authorName}>
                    <div className='skeleton-line short' style={{width: '100px'}}></div>
                </pre>
                <div className={styles.avatar} style={{
                    background: '#6b7280',
                    marginRight: '20px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
            </div>

           
            <pre className={styles.meta}>
                <div className='skeleton-line short' style={{width: '260px'}}></div>
            </pre>
        </div>
    )
}

export default LoadingPost