
        import { fetchPostsFromDB, getPostsFromDBByKeyword, fetchCountPostFromDB, fetchCountPostFromDBByKeyword } from '../../lib/db'
        import SearchPost from '../../components/SearchPost/SearchPost'
        import PostsList from '../../components/PostsList/PostsList'

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
                    <PostsList initialPosts={posts} keyword={keyword} />
                </div>
            )
        }

        export default Blog