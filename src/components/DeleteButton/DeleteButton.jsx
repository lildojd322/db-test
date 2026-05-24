'use client'
import { useState } from 'react'
import styles from './DeleteButton.module.scss'
import { useRouter } from 'next/navigation'
import AreYouSureModal from '../AreYouSureModal/AreYouSureModal'





const DeleteButton = ({ children, postId }) => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleClick = async () => {
        
        await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
        router.refresh()
         router.back() 
    }

    const changeModalStatus = () => {
        if (!isOpen) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }

    }

    return (
        <>
            <button type='submit' onClick={changeModalStatus} className={styles.deleteButton}>{children}</button>
            {isOpen && <AreYouSureModal handleClick={handleClick} changeModalStatus={changeModalStatus} />}
        </>
    )
}

export default DeleteButton