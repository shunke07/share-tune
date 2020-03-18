export const state = () => ({
  releases: [],
  albums: []
})

export const getters = {
  getAlbumById: (state) => (id) => {
    return state.albums.find((album) => album.id === id)
  }
}

export const mutations = {
  setReleases(state, payload) {
    state.releases = payload
  },
  setAlbum(state, payload) {
    state.albums = [payload, ...state.albums]
  }
}
