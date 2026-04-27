import type { AuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import { getUserFromDBByEmail } from '@/lib/db'

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) return null
                const currentUser = await getUserFromDBByEmail(credentials?.email)

                if (currentUser && currentUser.password === credentials.password) {
                    const { password, ...userWithoutPass } = currentUser

                    return userWithoutPass as User
                }

                return null
            }
        })

    ],
  /*   pages: {
        signIn: '/signin',
    }, */
}

