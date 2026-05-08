'use client'

import defaultImage from '../../icons/avat.jpeg'
import styles from './UserProfile.module.scss'
import getHighResImage from '../../hooks/getHighResImage'
import { useSession } from "next-auth/react"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


const UserProfile = ({ user }) => {
    if (!user) return <div className={styles.profileWrapper}>Loading...</div>
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {

        if (session?.user?.email === user.email) {

            router.push('/profile')
            return
        }
    }, [session, user, router])
    return (
        <div className={styles.profileWrapper}>
            <img
                src={getHighResImage(user.image) || defaultImage.src}
                alt="avatar"
                className={styles.avatar}
            />

            <h1 className={styles.name}>{user.name}</h1>



        </div>
    )
}


export default UserProfile