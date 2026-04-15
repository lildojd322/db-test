'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react"

const SearchPost = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const search = searchParams.get('search') || ''
        setSearchTerm(search)
    }, [searchParams])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/blog?search=${searchTerm}`)
        } else {
            router.push(`/blog`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input 
                className="search-input" 
                placeholder="Search posts..." 
                onChange={(e) => setSearchTerm(e.target.value)} 
                type="text" 
                value={searchTerm} 
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}

export default SearchPost