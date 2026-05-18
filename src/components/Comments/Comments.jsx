'use client'

import { useEffect, useState } from 'react'
import styles from './Comments.module.scss'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import defaulImage from '../../icons/avat.jpeg'

const Comments = ({ id, author }) => {
    const [comments, setComments] = useState([])
    const [countComments, setCountComments] = useState(0)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const session = useSession()


    const loadComments = () => {

        if (!id) return
        fetch(`/api/comments/get?id=${id}`).then(res => res.json())
            .then(data => {
                setComments(data.data.comments || [])
                setCountComments(data.data.count || 0)
                console.log(comments)
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

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!session.status === "authenticated") {

            router.push('/signin')
            return
        }

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        fetch(`/api/comments/create?post_id=${id}&post_text=${data.comment_text}&user_id=${session?.data?.user?.id}`, {
            method: 'POST',
            body: data
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


    return (
        <div className={styles.discussionContainer}>
            <h1>discussion</h1>

            <form className={styles.commentForm} onSubmit={handleSubmit}>
                <input name="comment_text" type="text" placeholder="leave a comment" />
                <button type="submit">Send</button>
            </form>

            <div className={styles.commentsSection}>
                <h2>Total comments: {countComments}</h2>
                <ul className={styles.commentsList}>


                    {countComments > 0 ? comments.map((comment) => {
                        return <li key={comment.comment_id}>
                            <div>


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
                            <div className={styles.commentText}>
                                {comment.comment_text}
                            </div>
                        </li>
                    }) : <h2 style={{ fontStyle: 'italic' }}>no comments</h2>}
                </ul >
            </div >
        </div >
    )
}

export default Comments