import Link from 'next/link'
import { fetchPostsFromDB, getPostsFromDBByKeyword, fetchCountPostFromDB, fetchCountPostFromDBByKeyword } from '../../lib/db'
import SearchPost from '../../components/SearchPost'


export const metadata = {
    title: "blog",
}

const Blog = async ({ searchParams }) => {

    const { search = '' } = await searchParams
    const keyword = search

    const posts = keyword ? await getPostsFromDBByKeyword(keyword) : await fetchPostsFromDB()
    const countPosts = keyword ? await fetchCountPostFromDBByKeyword(keyword) : await fetchCountPostFromDB()
    const infoWord = keyword ? 'posts found:' : 'total posts: '

    return (
        <div className='blog-container'>
            <h1>BLOG</h1>

            <SearchPost />
            <h2 className='info-word'>  {infoWord} {countPosts} </h2>


            <ul className="posts-list">
                {posts.length > 0 ? posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`}>
                            {post.title}
                        </Link>
                        <div>{post.body}</div>
                    </li>
                )) : <h1>posts not found</h1>}

            </ul>
        </div>
    )
}

export default Blog