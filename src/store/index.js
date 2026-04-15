import { create } from "zustand"

export const usePosts = create((set) => ({
    posts: [],
    loading: false,
}))