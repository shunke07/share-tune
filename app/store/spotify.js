export const state = () => ({
  releases: []
})

export const mutations = {
  setReleases(state, payload) {
    state.releases = payload
  }
}
