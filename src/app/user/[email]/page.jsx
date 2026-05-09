import UserProfile from '../../../components/UserProfile/UserProfile'
import { getUserFromDBByEmail } from '@/lib/db'
import LatestUserPosts from '../../../components/LatestUserPosts/LatestUserPosts'
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Profile from '../../../components/Profile/Profile'

export async function generateMetadata({ params }) {
    const { email } = await params
    const decodedEmail = atob(decodeURIComponent(email))
    const user = await getUserFromDBByEmail(decodedEmail)

    return {
        title: user.name
    }
}

const User = async ({ params }) => {

    const { email } = await params

    const decodedEmail = atob(decodeURIComponent(email))
    const user = await getUserFromDBByEmail(decodedEmail)
    const session = await getServerSession(authConfig)
    const guestEmail = session?.user?.email


    return (
        <>
            {guestEmail === user.email ? <Profile /> : <UserProfile user={user} />}
            <h1 style={{marginTop: '20px', marginBottom: '20px'}}>{`${user.name}'s`} latest posts</h1>
            <LatestUserPosts email={user.email} />
        </>

    )
}

export default User