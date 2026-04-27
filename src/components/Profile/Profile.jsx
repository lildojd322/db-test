'use client'

import { useSession, signOut } from "next-auth/react"

import styles from './Profile.module.scss'

const Profile = () => {
    const session = useSession()



    return (
        <div className={styles.profileContainer}>
            {session?.data?.user ? (
                <>
                    <img className={styles.userAvatar} src={session?.data?.user?.image} alt="user avatar" />
                    <h1 className={styles.username}> {session?.data?.user?.name}</h1>
                    <button className={styles.signOutButton} onClick={() => signOut({
                        callbackUrl: '/'
                    })} >sign out</button>
                </>
            ) : 'create an account or sign in to an existing one'

            }

        </div>
    )
}

export default Profile