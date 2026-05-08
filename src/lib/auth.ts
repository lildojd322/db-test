import type { AuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import { getUserFromDBByEmail, createGoogleUserInDB } from '@/lib/db'
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
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const currentUser = await getUserFromDBByEmail(user.email!)

                    if (!currentUser) {
                        await createGoogleUserInDB({
                            name: user.name,
                            email: user.email,
                            image: user.image
                        })
                    }
                } catch (error) {
                    console.error("Error saving google user:", error)
                    return true
                }
            }
            return true
        },
    
    }
}

