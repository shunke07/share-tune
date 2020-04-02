import { bookmarksRef, timestamp } from '~/repositories/firestore/config.ts'
import { Bookmark } from '~/types/firestore'

type Payload = {
  uid: string
  album: Bookmark['album']
}

type Query = {
  uid: string
  albumId: string
}

export const createBookmark = async (payload: Payload): Promise<void> => {
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

export const deleteBookmark = async (data: Query): Promise<void> => {
  const { uid, albumId } = data
  // get target document
  const query = await bookmarksRef(uid)
    .where('album.id', '==', albumId)
    .get()
  if (query.empty) return

  const bookmarkId = query.docs[0].id
  await bookmarksRef(uid)
    .doc(bookmarkId)
    .delete()
}

export const getIsBookmarked = async (data: Query): Promise<boolean> => {
  const { uid, albumId } = data

  const query = await bookmarksRef(uid)
    .where('album.id', '==', albumId)
    .get()

  return !query.empty
}
