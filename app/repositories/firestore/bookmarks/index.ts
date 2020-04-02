import { bookmarksRef, timestamp } from '~/repositories/firestore/config.ts'
import { Bookmark } from '~/types/firestore'

type Payload = {
  uid: string
  album: Bookmark['album']
}

export const createBookmark = async (payload: Payload) => {
  const { uid, album } = payload
  const { id, imageUrl, name, artist } = album

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
