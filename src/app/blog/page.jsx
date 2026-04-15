import Link from 'next/link'
import { fetchPostsFromDB, getPostsFromDBByKeyword } from '../../lib/db'
import SearchPost from '../../components/SearchPost'


export const metadata = {
    title: "blog",
}

const Blog = async ({ searchParams }) => {
    const { search = '' } = await searchParams
    const keyword = search
    await new Promise(resolve => setTimeout(resolve, 500));
    const posts = keyword ? await getPostsFromDBByKeyword(keyword) : await fetchPostsFromDB()



    return (
        <div className='blog-container'>
            <h1>BLOG</h1>
            <SearchPost />


            <ul className="posts-list">
                {posts.length > 1 ? posts.map((post) => (
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