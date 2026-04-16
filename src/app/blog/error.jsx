'use client'
const ErrorPage = ({ error }) => {
    return (
        <div className="error-container">
            <h2>ERROR!</h2>
            <p>{error.message}</p>

        </div>
    )
}

export default ErrorPage