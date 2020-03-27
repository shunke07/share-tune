import * as functions from 'firebase-functions'
import axios, { AxiosRequestConfig } from 'axios'

const CLIENT_ID = functions.config().spotify.client_id
const CLIENT_SECRET = functions.config().spotify.client_secret

interface RequestData {
  offset: number
}
interface AuthResult {
  data: AccessToken
}
interface AccessToken {
  access_token: string
}
interface Releases {
  data: Albums
}
interface Albums {
  albums: { items: Item[] }
}
interface Item {
  album_type: string
  artists: Array<{key: string}>
  external_urls: {key: string}
  id: string
  images: string[]
  name: string
  release_date: string
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

const getNewReleases = async (offset: number): Promise<Releases> => {
  const token = await getToken()
  const auth = token.data.access_token
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/browse/new-releases?country=JP&limit=20&offset=${offset}`,
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
    const result = await getNewReleases(data.offset)
    const items = result.data.albums.items.map((item: Item) => {
      // process return value
      const  {
        album_type,
        artists,
        external_urls,
        id,
        images,
        name,
        release_date,
      } = item
      return {
        album_type,
        artists,
        external_urls,
        id,
        images,
        name,
        release_date,
      }
    })
    return items
  })
