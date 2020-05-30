import { GetterTree, MutationTree } from 'vuex'
import { Albums, Album } from '~/types/spotify-api.d.ts'

export type StoreAlbum = Album & { isBookmarked: boolean | null }

export const state = () => ({
  releases: [] as Albums,
  albums: [] as StoreAlbum[]
})

export type SpotifyState = ReturnType<typeof state>

export const getters: GetterTree<SpotifyState, SpotifyState> = {
  getAlbumById: (state) => (id: string) => {
    return state.albums.find((album) => album.id === id)
  }
}

export const mutations: MutationTree<SpotifyState> = {
  setReleases(state, payload: Albums) {
    state.releases = payload
  },
  setAlbum(state, payload: StoreAlbum) {
    state.albums = [payload, ...state.albums]
  },
  logout(state) {
    state.releases = []
    state.albums = []
  }
}
