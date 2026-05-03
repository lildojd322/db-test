import type { AuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import { getUserFromDBByEmail } from '@/lib/db'
import { compare } from 'bcryptjs'
import { loginSchema } from '@/lib/zod'

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
                const parsedCredentials = loginSchema.safeParse(credentials)
                if (!parsedCredentials.success) {
                    return null
                }
                const { email, password } = parsedCredentials.data


                const currentUser = await getUserFromDBByEmail(email)

                if (currentUser && currentUser.password) {
                    const isPasswordCorrect = await compare(
                        password,
                        currentUser.password
                    )

                    if (isPasswordCorrect) {
                        const { password, ...userWithoutPass } = currentUser
                        return userWithoutPass as User
                    }
                }

                return null
            }
        })

    ],
    pages: {
        signIn: '/signin',
    },
}

