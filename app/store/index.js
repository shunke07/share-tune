export const state = () => ({
  isLoading: false
})

export const mutations = {
  setIsLoading(state, payload) {
    state.isLoading = payload
  }
}
