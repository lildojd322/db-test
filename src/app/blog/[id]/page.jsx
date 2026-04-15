import { fetchPostFromDBById } from '../../../lib/db'


export async function generateMetadata({ params }) {
    const { id } = await params
    const {title} = await fetchPostFromDBById(id)

    return {
        title: title
    }
}

const Post = async ({ params }) => {
    const { id } = await params
    const post = await fetchPostFromDBById(id)
    return (
        <div className="post-container">
           <h1>{post.title}</h1>
           <p>{post.body}</p>
        </div>
    )
}

export default Post