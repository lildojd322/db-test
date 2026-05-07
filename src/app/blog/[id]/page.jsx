import { fetchPostFromDBById, fetchPostsFromDB, getUserFromDBByEmail } from '../../../lib/db'


export async function generateMetadata({ params }) {
    const { id } = await params
    const { title } = await fetchPostFromDBById(id)

    return {
        title: title
    }
}


export async function generateStaticParams() {
    const posts = await fetchPostsFromDB()

    return posts.map(post => ({
        slug: post.id.toString()
    }))
}


const Post = async ({ params }) => {

    const { id } = await params
    const post = await fetchPostFromDBById(id)

    const user = await getUserFromDBByEmail(post.author_email)
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-EN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    return (
        <div className="post-container">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <pre style={{
                marginTop: '50px'
            }}>created: {formattedDate}</pre>
            <pre style={{
                marginTop: '10px'
            }}>author: {user.name}</pre>
        </div>
    )
}

export default Post