import { bookmarksRef, timestamp } from '~/repositories/firestore/config.ts'
import { Bookmark } from '~/types/firestore'

type Payload = { uid: string } & Bookmark['album']

export const createBookmark = async (payload: Payload) => {
  const { uid, id, imageUrl, name, artist } = payload
  await bookmarksRef(uid).add({
    album: {
      id,
      imageUrl,
      name,
      artist
    },
    createdAt: timestamp
  })
}
