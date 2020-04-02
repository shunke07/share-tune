export type AuthResult = {
  readonly data: { access_token: string }
}

type Artists = { name: string }

type Item = {
  album_type: string
  artists: readonly Artists[]
  external_urls: { key: string }
  id: string
  images: string[]
  name: string
  release_date: string
}

type Albums = {
  albums: { items: readonly Item[] }
}

export type Track = {
  artists: readonly Artists[]
  external_urls: { key: string }
  id: string
  name: string
  preview_url: string
  track_number: number
}

type Album = {
  album_type: string
  artists: readonly Artists[]
  external_urls: { key: string }
  id: string
  images: string[]
  name: string
  release_date: string
  tracks: { items: readonly Track[] }
}
