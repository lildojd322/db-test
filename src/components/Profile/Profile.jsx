'use client'

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import styles from './Profile.module.scss'
import getHighResImage from '../../hooks/getHighResImage'

const Profile = () => {
    const session = useSession()

const userImage = session?.data?.user?.image



    return (
        <div className={styles.profileContainer}>
            {session?.data?.user ? (
                <>
                    <Image className={styles.userAvatar} src={getHighResImage(userImage)} width={150} height={150} alt="user avatar" />
                    <h1 className={styles.username}> {session?.data?.user?.name}</h1>
                    <button className={styles.signOutButton} onClick={() => signOut({
                        callbackUrl: '/signin'
                    })} >sign out</button>
                </>
            ) : 'create an account or sign in to an existing one'

            }

        </div>
    )
}

export default Profile