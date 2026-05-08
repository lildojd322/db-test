import UserProfile from '../../../components/UserProfile/UserProfile'
import { getUserFromDBByEmail } from '@/lib/db'

export async function generateMetadata({ params }) {
    const { email } = await params
    const decodedEmail = decodeURIComponent(email)
    const user = await getUserFromDBByEmail(decodedEmail)

    return {
        title: user.name
    }
}

const User = async ({ params }) => {

    const { email } = await params
    const decodedEmail = decodeURIComponent(email)
    const user = await getUserFromDBByEmail(decodedEmail)


    return (
        <>
            <UserProfile user={user} />
        </>

    )
}

export default User