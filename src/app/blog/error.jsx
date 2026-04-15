'use client'
const ErrorPage = ({ error }) => {
    return (
        <div className="error-container">
            <h2>ОШИБКА!</h2>
            <p>{error.message}</p>

        </div>
    )
}

export default ErrorPage