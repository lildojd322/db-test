'use client'

import { use, useEffect, useState } from 'react'
import styles from './Comments.module.scss'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import defaulImage from '../../icons/avat.jpeg'
import { commentSchema } from '../../lib/zod'

import Answer from '../Answer/Answer'
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm'



const Comments = ({ id, author }) => {
    const [comments, setComments] = useState([])
    const [countComments, setCountComments] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)



    const router = useRouter()
    const session = useSession()


    const loadComments = () => {

        if (!id) return
        fetch(`/api/comments/get?id=${id}`).then(res => res.json())
            .then(data => {
                setComments(data.data.comments || [])
                setCountComments(data.data.count || 0)

                setLoading(false)

            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })

    }

    useEffect(() => {
        loadComments()


    }, [id])



    const handleAction = (event, parentId = '') => {
        event.preventDefault()


        if (session.status !== "authenticated") {

            router.push('/signin')
            return
        }





        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        data.post_id = String(id)
        data.user_id = String(session?.data?.user?.id || '')
        data.parent_comment_id = parentId ? String(parentId) : null

        const validation = commentSchema.safeParse(data)


        if (!validation.success) {
            const firstError = validation.error.issues[0].message
            setError(firstError)
            return
        }
        setError(false)


        fetch(`/api/comments/create`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                router.refresh()
                loadComments()


                event.target.reset()


                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })

    }



    const handleDelete = (id) => {

        fetch(`/api/comments/delete?id=${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                router.refresh()
                loadComments()
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }


    return (
        <div className={styles.discussionContainer}>
            <h1>discussion</h1>

            <CreateCommentForm handleAction={handleAction} />

            <div className={styles.commentsSection}>
                <h2>Total comments: {countComments}</h2>
                <ul className={styles.commentsList}>


                    {countComments > 0 ? comments.map((comment) => {
                        return <li style={{ marginLeft: comment.parent_comment_id ? '55px' : '0px' }} key={comment.comment_id}>
                            <div className={styles.justInfoBlock}>
                                <div className={styles.info}>
                                    <Link href={`/user/${comment.user_id}`} className={styles.authorInfo}>
                                        <img width={50} height={50} src={comment.author_avatar || defaulImage.src} className={styles.authorAvatar}>

                                        </img>
                                        <div className={`${styles.authorName} ${String(author.id) === String(comment.user_id) && styles.isAuthor} `} >
                                            {comment.author_name}
                                        </div>
                                    </Link>
                                    <div className={styles.commentCreated}>
                                        {
                                            new Date(comment.created_at).toLocaleDateString('en-EN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })

                                        }
                                    </div>
                                </div>
                                {session?.data?.user && String(comment.user_id) === String(session.data.user.id) && <button onClick={() => {
                                    handleDelete(comment.comment_id)
                                }} className={styles.deleteButton}>delete</button>}

                            </div>

                            <div className={styles.commentText}>
                                {comment.parent_comment_id && <Link className={styles.parentAuthor} style={{ marginRight: '5px' }} href={`/user/${comment.parent_author_id}`}> @{comment.parent_author_name} </Link>}
                                {comment.comment_text}
                            </div>
                            <div className={styles.interactionBlock}>

                                <Answer parentId={comment.comment_id} handleAction={handleAction} />

                            </div>
                        </li>
                    }) : <h2 style={{ fontStyle: 'italic' }}>no comments</h2>}
                </ul >
            </div >
        </div >
    )
}

export default Comments