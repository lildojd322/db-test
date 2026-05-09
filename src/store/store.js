import { create } from "zustand"

export const usePostStore = create((set) => ({
    storedPosts: [],
    storedOffset: 20,
    storedHasMore: true,
    storedKeyword: '',

    setPosts: (posts) => set({ storedPosts: posts }),
    setOffset: (offset) => set({ storedOffset: offset }),
    setHasMore: (hasMore) => set({ storedHasMore: hasMore }),
    setKeyword: (keyword) => set({ storedKeyword: keyword }),

    reset: () => set({ storedPosts: [], storedOffset: 20, storedHasMore: true })
}))