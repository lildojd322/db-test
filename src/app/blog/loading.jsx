import SearchPost from "../../components/SearchPost/SearchPost"

const LoadingPosts = () => {
    return (
        <div className="blog-container">
            <h1>BLOG</h1>
            <SearchPost />
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="post-skeleton">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                </div>
            ))}
        </div>
    )
}

export default LoadingPosts