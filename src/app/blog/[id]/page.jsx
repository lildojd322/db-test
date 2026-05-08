import { fetchPostFromDBById, fetchPostsFromDB, getUserFromDBByEmail } from '../../../lib/db'
import defaultImage from '../../../icons/avat.jpeg'


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


    const authorName = user?.name || "Unknown Author";
    const authorImage = user?.image || defaultImage.src;

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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '20px',
                marginTop: '20px'
            }}>
                <pre style={{
                    marginTop: '10px'
                }}> {authorName}</pre>
                <img src={authorImage || defaultImage.src} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="avatar" />
            </div>
            <pre style={{
                marginTop: '50px'
            }}>created: {formattedDate}</pre>


        </div>
    )
}

export default Post