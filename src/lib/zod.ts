import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(2, "The name must be at least 2 characters long"),
    email: z.string().email("Incorrect email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})


export const loginSchema = z.object({
    email: z.string().email("Invalid mail format"),
    password: z.string().min(8, "Password is too short"),

})


export const postSchema = z.object({
    title: z.string().min(2, "The name must be at least 2 characters long").max(50, 'title is too long'),
    description: z.string().min(3, "The name must be at least 3 characters long").max(300, 'description is too long ')
})