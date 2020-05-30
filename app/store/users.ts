import { MutationTree } from 'vuex'
import { Bookmark } from '~/types/firestore'
import { PostData } from '~/repositories/firestore'

export const state = () => ({
  posts: [] as PostData[],
  bookmarks: [] as Bookmark[]
})

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {
  setPosts(state, payload: PostData[]) {
    state.posts = payload
  },
  setBookmarks(state, payload: Bookmark[]) {
    state.bookmarks = payload
  },
  logout(state) {
    state.posts = []
    state.bookmarks = []
  }
}
