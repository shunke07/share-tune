// list of album object
export type Albums = readonly Item[]

interface Item {
  album_type: string
  artists: { key: string }[]
  external_urls: { key: string }
  id: string
  images: string[]
  name: string
  release_date: string
}

// single album object

export interface Album {
  album_type: string
  artists: Artists[]
  external_urls: { key: string }
  id: string
  images: string[]
  name: string
  release_date: string
  tracks: { items: Track[] }
}

interface Artists {
  name: string
}

interface Track {
  artists: { key: string }[]
  external_urls: { key: string }
  id: string
  name: string
  preview_url: string
  track_number: number
}
