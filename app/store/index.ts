import { ActionTree, MutationTree } from 'vuex'
import { getUser } from '~/repositories/firestore'
import { User } from '~/types/firestore'

export const state = () => ({
  isLoading: false as boolean,
  loginUser: null as null | Readonly<User>,
  activeTab: null as null | 1 | 2
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setIsLoading(state, payload: boolean) {
    state.isLoading = payload
  },
  setLoginUser(state, payload: User) {
    state.loginUser = payload
  },
  setActiveTab(state, payload: 1 | 2) {
    state.activeTab = payload
  },
  logout(state) {
    state.loginUser = null
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login({ commit }, { uid }: { uid: string }) {
    const user = await getUser(uid)
    if (!user) throw new Error('user-not-found')

    commit('setLoginUser', user)
    this.$router.push('/releases/')
  }
}
