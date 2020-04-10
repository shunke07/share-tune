import * as functions from 'firebase-functions'
import axios, { AxiosRequestConfig } from 'axios'
import { AuthResult, Album, Track } from '../types/spotify-api'

const CLIENT_ID = functions.config().spotify.client_id
const CLIENT_SECRET = functions.config().spotify.client_secret

type RequestData = {
  readonly albumId: string
}
type SpotifyAlbum = {
  data: Album
}

const getToken = async (): Promise<AuthResult> => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token?grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`
    }
  }
  const response = await axios.request(config)
  return response
}

const getAlbum = async (id: string): Promise<SpotifyAlbum> => {
  const token = await getToken()
  const auth = token.data.access_token
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/albums/${id}?market=JP`,
    headers: {
      Authorization: `Bearer ${auth}`,
      'Accept-Language': 'ja;q=1'
    }
  }
  const response = await axios.request(config)
  return response
}

const processResult = (data: Album): Album => {
  const {
    album_type,
    artists,
    external_urls,
    id,
    images,
    name,
    release_date
  } = data

  const tracks = data.tracks.items.map((track: Track) => {
    const {
      artists,
      external_urls,
      id,
      name,
      preview_url,
      track_number
    } = track

    return {
      artists,
      external_urls,
      id,
      name,
      preview_url,
      track_number
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
    tracks: {
      items: tracks
    }
  }
}

module.exports = functions
  .region('asia-northeast1')
  .https.onCall(async (data: RequestData) => {
    const result = await getAlbum(data.albumId)
    const response = processResult(result.data)
    return response
  })
