'use client'


import { postSchema } from '../../lib/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './CreatePostModal.module.scss'
import { useSession } from "next-auth/react"

const CreatePostModal = ({ isOpen, changeModalStatus }) => {
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()
    const session = useSession()

    const handleOverlayClick = (e) => {

        if (e.target === e.currentTarget) {
            changeModalStatus()
        }


    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        const formData = new FormData(event.currentTarget)

        const data = Object.fromEntries(formData.entries())


        const validation = postSchema.safeParse(data)

        if (!validation.success) {
            const firstError = validation.error.issues[0].message
            setError(firstError)
            return
        }

        setIsPending(true)

        const response = await fetch('/api/createPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data)
        })


        if (response.ok) {
            changeModalStatus()
            router.refresh()
        } else {
            const result = await response.json()
            setError(result.error || 'failed')
        }
    }



    return (
        <div onMouseDown={handleOverlayClick} className={styles.overlay} >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.h1}>Create post</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        required
                        className={styles.input}

                    />
                    <textarea
                        name="description"
                        placeholder="description"
                        required
                        className={styles.textarea}
                    />
                    <button disabled={isPending} type="submit" className={styles.submitButton}>
                        create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePostModal