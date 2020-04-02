import { ActionTree, MutationTree } from 'vuex'
import { getUser } from '~/repositories/firestore/users'
import { User } from '~/types/firestore'

export const state = () => ({
  isLoading: false as boolean,
  loginUser: null as null | Readonly<User>
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setIsLoading(state, payload: boolean) {
    state.isLoading = payload
  },
  setLoginUser(state, payload: any) {
    state.loginUser = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login({ commit }, { uid }: { uid: string }) {
    const user = await getUser(uid)
    if (!user) return

    commit('setLoginUser', user)
    this.$router.push('/releases/')
  }
}
