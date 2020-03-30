import { GetterTree, MutationTree } from 'vuex'
import { Albums, Album } from '~/types/spotify-api.d.ts'

export const state = () => ({
  releases: [] as Albums,
  albums: [] as Album[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAlbumById: (state) => (id: string) => {
    return state.albums.find((album) => album.id === id)
  }
}

export const mutations: MutationTree<RootState> = {
  setReleases(state, payload: Albums) {
    state.releases = payload
  },
  setAlbum(state, payload: Album) {
    state.albums = [payload, ...state.albums]
  }
}
