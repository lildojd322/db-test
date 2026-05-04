'use client'
import Link from 'next/link'
import { useEffect, useState } from "react"

import styles from './MainRandomPosts.module.scss'

const MainRandomPosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        const savedPosts = sessionStorage.getItem('randomPosts')

        if (savedPosts) {

            setPosts(JSON.parse(savedPosts))
            setLoading(false)
            return  
        }

        fetch('/api/randomPosts')
            .then(res => res.json())
            .then(data => {
                const fetchedPosts = data.data || []
                setPosts(fetchedPosts)
                sessionStorage.setItem('randomPosts', JSON.stringify(fetchedPosts))
                setLoading(false)
            })
            .catch(err => {
                console.error("error:", err)
                setLoading(false)
            })
    }, [])
    if (loading) {
        return <div>Loading posts...</div>
    }

    if (posts.length === 0) {
        return <div>No posts found</div>
    }


    return (
        <ul className={styles.postsGrid}>
            {posts.map((post) => {
                return (
                    <li key={post.id} className={styles.postCard}>
                        <Link href={`/blog/${post.id}`}>
                            <span>{post.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default MainRandomPosts