'use client'

import defaultImage from '../../icons/avat.jpeg'
import styles from './UserProfile.module.scss'
import getHighResImage from '../../hooks/getHighResImage'
import { useSession } from "next-auth/react"
import LatestUserPosts from '../../components/LatestUserPosts/LatestUserPosts'

import { useEffect } from 'react'


const UserProfile = ({ user }) => {
    if (!user) return <div className={styles.profileWrapper}>Loading...</div>
    const { data: session } = useSession()

    return (
        <div className={styles.profileWrapper}>
            <img
                src={getHighResImage(user.image) || defaultImage.src}
                alt="avatar"
                className={styles.avatar}
            />

            <h1 className={styles.name}>{user.name}</h1>
            <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>
                {`${user.name}'s`} latest posts
            </h1>
            <LatestUserPosts id={user.id} />

        </div>
    )
}


export default UserProfile