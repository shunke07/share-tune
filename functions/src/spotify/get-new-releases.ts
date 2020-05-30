import * as functions from 'firebase-functions'
import axios, { AxiosRequestConfig } from 'axios'
import { AuthResult, Albums, Item } from '../types/spotify-api'

const CLIENT_ID = functions.config().spotify.client_id
const CLIENT_SECRET = functions.config().spotify.client_secret

type RequestData = {
  offset: number
}
type Releases = {
  data: Albums
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

const getNewReleases = async (offset: number): Promise<Releases> => {
  const token = await getToken()
  const auth = token.data.access_token
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/browse/new-releases?country=JP&limit=20&offset=${offset}`,
    headers: {
      Authorization: `Bearer ${auth}`,
      'Accept-Language': 'ja;q=1'
    }
  }
  const response = await axios.request(config)
  return response
}

const processResult = (data: Albums) => {
  const items = data.albums.items.map((item: Item) => {
    const {
      album_type,
      artists,
      external_urls,
      id,
      images,
      name,
      release_date
    } = item

    return {
      album_type,
      artists,
      external_urls,
      id,
      images,
      name,
      release_date
    }
  })
  return items
}

module.exports = functions
  .region('asia-northeast1')
  .runWith({ memory: '512MB' })
  .https.onCall(async (data: RequestData, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called ' + 'while authenticated.'
      )
    }

    const { offset } = data

    if (typeof offset !== 'number') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'offset is must be a number',
        { offset }
      )
    }

    const result = await getNewReleases(offset)
    const response = processResult(result.data)
    return response
  })
