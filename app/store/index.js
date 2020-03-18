import { getUser } from '~/repositories/firestore/users'

export const state = () => ({
  isLoading: false,
  loginUser: null
})

export const mutations = {
  setIsLoading(state, payload) {
    state.isLoading = payload
  },
  setLoginUser(state, payload) {
    state.loginUser = payload
  }
}

export const actions = {
  async login({ commit }, uid) {
    const user = await getUser({ uid })
    if (!user) return

    commit('setLoginUser', user)
  }
}
