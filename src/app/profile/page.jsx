'use client'
import { useSession } from "next-auth/react"
import Profile from "../../components/Profile/Profile"

const profile = () => {

    const session = useSession()


    return (
        <Profile session={session} />
    )
}

export default profile