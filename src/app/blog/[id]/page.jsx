import { fetchPostFromDBById, fetchPostsFromDB, getUserFromDBById } from '../../../lib/db'
import Post from '../../../components/Post/Post'

export async function generateMetadata({ params }) {
    const { id } = await params
    const { title } = await fetchPostFromDBById(id)
    return { title: title }
}

export async function generateStaticParams() {
    const posts = await fetchPostsFromDB()
    return posts.map(post => ({ id: post.id.toString() }))
}

const PostPage = async ({ params }) => {
    const { id } = await params
    const post = await fetchPostFromDBById(id)
    const user = await getUserFromDBById(post.userId)

    return <Post post={post} user={user} />
}

export default PostPage