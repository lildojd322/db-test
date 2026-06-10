'use client'

import { use, useEffect, useState, useOptimistic, startTransition } from 'react'
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

    const [optimisticComments, modifyOptimisticComments] = useOptimistic(
        comments,
        (currentComments, action) => {

            switch (action.type) {
                case 'ADD':
                    const newComment = action.payload

                    if (!newComment.parent_comment_id) {
                        return [newComment, ...currentComments]
                    }
                    const updatedList = [...currentComments]


                    const parentIndex = updatedList.findIndex(
                        c => String(c.comment_id) === String(newComment.parent_comment_id)
                    )

                    if (parentIndex !== -1) {

                        updatedList.splice(parentIndex + 1, 0, newComment)
                        return updatedList
                    }


                    return [action.payload, ...currentComments]
                case 'DELETE':
                    return currentComments.filter(comment =>
                        comment.comment_id !== action.payload &&
                        comment.parent_comment_id !== action.payload
                    )
                default:
                    return currentComments
            }

        }

    )



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


    const handleAction = async (event, parentId = '') => {
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

        const targetForm = event.target


        const parentComment = comments.find(c => String(c.comment_id) === String(parentId))

        const newComment = {
            comment_id: Math.random(),
            parent_comment_id: parentId ? String(parentId) : null,
            post_id: String(id),
            user_id: String(session?.data?.user?.id || ''),
            comment_text: data.comment_text,
            created_at: new Date().toISOString(),
            isPending: true,
            author_name: session?.data?.user?.name || 'You',
            author_avatar: session?.data?.user?.image || defaulImage.src,
            parent_author_id: parentComment ? parentComment.user_id : null,
            parent_author_name: parentComment ? parentComment.author_name : null
        }

        startTransition(() => {



            modifyOptimisticComments({ type: 'ADD', payload: newComment },)
            setCountComments(prev => prev + 1)

        })
        targetForm.reset()

        try {
            const res = await fetch(`/api/comments/create`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            await res.json()



            await loadComments()

        } catch (err) {
            setCountComments(prev => prev - 1);
            await loadComments()

        }

    }


    const handleDelete = async (id) => {
        startTransition(async () => {

            modifyOptimisticComments({ type: 'DELETE', payload: id })
            setCountComments(prev => prev - 1)
            try {
                const res = await fetch(`/api/comments/delete?id=${id}`, {
                    method: 'DELETE',
                })
                await res.json()

                router.refresh()
                await loadComments()
            } catch (error) {
                console.error(error)
                setCountComments(prev => prev + 1)

            }

        })


    }


    return (
        <div className={styles.discussionContainer}>
            <h1>discussion</h1>

            <CreateCommentForm handleAction={handleAction} />

            <div className={styles.commentsSection}>
                <h2>Total comments: {countComments}</h2>
                <ul className={styles.commentsList}>


                    {countComments > 0 ? optimisticComments.map((comment) => {
                        return <li style={{ marginLeft: comment.parent_comment_id ? '45px' : '0px' }} key={comment.comment_id}>
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