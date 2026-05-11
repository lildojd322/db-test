import { fetchPostFromDBById, fetchPostsFromDB, getUserFromDBByEmail } from '../../../lib/db'
import defaultImage from '../../../icons/avat.jpeg'
import Link from 'next/link'


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
    let authorName
    let authorImage
    if (user) {
        authorName = user?.name
        authorImage = user?.image
    } else {
        authorName = "Deleted user"
        authorImage = defaultImage.src
    }


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
            {
                authorName === "Deleted user" ? <pre style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '20px',
                    marginTop: '20px',
                    color: 'inherit',
                }}> Deleted user</pre> : (<Link href={`/user/${user.id}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '20px',
                    marginTop: '20px',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                }}>
                    <pre style={{
                      
                        fontSize: '20px'
                    }}> {authorName}</pre>
                    <img src={authorImage || defaultImage.src} style={{ width: '45px', height: '45px', borderRadius: '50%' }} alt="avatar" />
                </Link>)
            }


            <pre style={{
                marginTop: '50px'
            }}>created: {formattedDate}</pre>


        </div>
    )
}

export default Post