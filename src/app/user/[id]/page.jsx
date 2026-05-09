import UserProfile from '../../../components/UserProfile/UserProfile'
import { getUserFromDBById } from '@/lib/db'
import LatestUserPosts from '../../../components/LatestUserPosts/LatestUserPosts'
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import Profile from '../../../components/Profile/Profile'

export async function generateMetadata({ params }) {
    const { id } = await params
    const user = await getUserFromDBById(id)

    return {
        title: user.name
    }
}

const User = async ({ params }) => {
    const { id } = await params


    const user = await getUserFromDBById(id)

    if (!user) return <div>User not found</div>

    const session = await getServerSession(authConfig)
    const guestId = session?.user?.id
    console.log(guestId)

    return (
        <>

            {String(guestId) === String(user.id) ? <Profile /> : <UserProfile user={user} />}

        


           
        </>
    )
}

export default User