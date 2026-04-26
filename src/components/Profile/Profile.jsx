import styles from './Profile.module.scss'

const Profile = ({ session }) => {
    return (
        <div className='div'>
            <img className={styles.userAvatar} src={session?.data?.user?.image} alt="user avatar" />
            <h1 className={styles.username}> {session?.data?.user?.name}</h1>

        </div>
    )
}

export default Profile