'use client'
import LatestUserPosts from '../../components/LatestUserPosts/LatestUserPosts'
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import styles from './Profile.module.scss'
import getHighResImage from '../../hooks/getHighResImage'
import defaultImage from '../../icons/avat.jpeg'
import ChangeAvatar from '../ChangeAvatar/ChangeAvatar'
import { useEffect, useState } from 'react'


const Profile = () => {
    const { data: session, update } = useSession()
    const user = session?.user
    const [userImageUrl, setUserImageUrl] = useState(user?.image || defaultImage.src)
    const provider = user?.provider


    const onAvatarChange = async (file) => {
        const formData = new FormData()
        formData.append('avatar', file)

        const response = await fetch('/api/upload-avatar', {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            const { error } = await response.json()
            return
        }

        const { url } = await response.json()
        setUserImageUrl(url)
        await update({ image: url })
    }

    useEffect(() => {
        if (user?.image) {
            setUserImageUrl(user.image)
        }
    }, [user?.image])

    return (
        <div className={styles.profileContainer}>
            {user ? (
                <>
                    <div className={styles.avatarBlock}>
                        <Image className={styles.userAvatar} src={getHighResImage(userImageUrl)} width={150} height={150} alt="user avatar" />
                        {provider === 'google' ? '' : <ChangeAvatar onAvatarChange={onAvatarChange} />}
                    </div>
                    <h1 className={styles.username}> {user?.name}</h1>
                    <button className={styles.signOutButton} onClick={() => signOut({
                        callbackUrl: '/signin'
                    })} >sign out</button>
                </>
            ) : 'create an account or sign in to an existing one'

            }

            <LatestUserPosts name={user?.name} id={user?.id} />
        </div>
    )
}

export default Profile