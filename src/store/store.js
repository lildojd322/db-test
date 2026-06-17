
import { create } from "zustand"

export const usePostStore = create((set) => ({
    storedPosts: [],
    storedOffset: 20,
    storedHasMore: true,
    storedKeyword: '',
    addOptimisticPost: (newPost) => set((state) => {
        const currentPosts = Array.isArray(state.storedPosts) ? state.storedPosts : []

        return {
            storedPosts: [newPost, ...currentPosts]
        }
    }),

    deleteOptimisticPost: (id) => set((state) => ({
        storedPosts: state.storedPosts.filter(post => post.id !== id)
    })),
    updateOptimisticPost: (tempId, realPost) => set((state) => ({
        storedPosts: state.storedPosts.map(post =>
            post.id.toString() === tempId.toString() ? realPost : post
        )
    })),
    setPosts: (posts) => set({ storedPosts: posts }),
    setOffset: (offset) => set({ storedOffset: offset }),
    setHasMore: (hasMore) => set({ storedHasMore: hasMore }),
    setKeyword: (keyword) => set({ storedKeyword: keyword }),

    reset: () => set({ storedPosts: [], storedOffset: 20, storedHasMore: true })
}))