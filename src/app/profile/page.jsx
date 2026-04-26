'use client'
import { useSession, signOut } from "next-auth/react"
import Profile from "../../components/Profile/Profile"

const profile = () => {

    const session = useSession()


    return (
        <Profile signOut={signOut} session={session} />
    )
}

export default profile