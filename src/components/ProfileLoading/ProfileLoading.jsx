import styles from '../Profile/Profile.module.scss'
import stylesL from '../LatestUserPosts/LatestUserPosts.module.scss' 

const ProfileLoading = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.avatarBlock}>
                <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: '#6b7280',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
            </div>

            <h1 className={styles.username}>
                <div className="skeleton-title" style={{ width: '150px', height: '24px', marginTop: '20px' }}></div>
            </h1>

            <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>
                <div className="skeleton-title" style={{ width: '250px', height: '20px' }}></div>
            </h1>

            <ul>
                {[1, 2, 3].map(i => (
                    <li key={i} className={`post-skeleton ${stylesL.postItem}`} style={{ marginBottom: '1rem',  listStyleType: 'none', height: '116px' }}>
                        <div className={styles.title} style={{marginBottom: '40px'}}>
                            <div className="skeleton-title" style={{ width: '80%', height: '20px', marginBottom: '10px' }}></div>
                        </div>
                        <div className={styles.postMeta}>
                            <div className="skeleton-line short" style={{ width: '100px', height: '14px' }}></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileLoading