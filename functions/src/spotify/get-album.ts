import * as functions from 'firebase-functions'
import axios, { AxiosRequestConfig } from 'axios'

const CLIENT_ID = functions.config().spotify.client_id
const CLIENT_SECRET = functions.config().spotify.client_secret

interface RequestData {
  albumId: string
}
interface AuthResult {
  data: AccessToken
}
interface AccessToken {
  access_token: string
}
interface Releases {
  data: Album
}
interface Album {
  album_type: string
  artists: Array<{key: string}>
  external_urls: {key: string}
  id: string
  images: string[]
  name: string
  release_date: string
  tracks: { items: Track[] }
}
interface Track {
  artists: Array<{key: string}>
  external_urls: {key: string}
  id: string
  name: string
  preview_url: string
  track_number: number
}

const getToken = async (): Promise<AuthResult> => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token?grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    },
  }
  return await axios.request(config)
}

const getAlbum = async (id: string): Promise<Releases> => {
  const token = await getToken()
  const auth = token.data.access_token
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/albums/${id}?market=JP`,
    headers: {
      'Authorization': `Bearer ${auth}`,
      'Accept-Language': 'ja;q=1'
    }
  }
  return await axios.request(config)
}

module.exports = functions
  .region('asia-northeast1')
  .https.onCall(async (data: RequestData) => {
    const result = await getAlbum(data.albumId)
    const {
      album_type,
      artists,
      external_urls,
      id,
      images,
      name,
      release_date
    } = result.data

    const tracks = result.data.tracks.items.map((track: Track) => {
      // process return value
      return{
        artists: track.artists,
        external_urls: track.external_urls,
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        track_number: track.track_number
      }
    })

    return {
      album_type,
      artists,
      external_urls,
      id,
      images,
      name,
      release_date,
      tracks
    }
  })
