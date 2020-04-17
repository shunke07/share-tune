import { bookmarksRef, timestamp } from '~/repositories/firestore/config'
import { Bookmark } from '~/types/firestore'

export type Payload = {
  uid: string
  album: Bookmark['album']
}

type Query = {
  uid: string
  albumId: string
}

type BookmarkData = {
  album: Bookmark['album']
  createdAt: typeof timestamp
}

export const createBookmark = async (payload: Payload): Promise<void> => {
  const { uid, album } = payload
  const { id, imageUrl, name, artist } = album

  const data: BookmarkData = {
    album: {
      id,
      imageUrl,
      name,
      artist
    },
    createdAt: timestamp
  }

  await bookmarksRef(uid).add(data)
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

export const getBookmarks = async (
  uid: string
): Promise<Bookmark[] | undefined> => {
  const query = await bookmarksRef(uid)
    .orderBy('createdAt', 'desc')
    .get()

  if (query.empty) return

  const response = query.docs.map((doc) => {
    const { album, createdAt } = doc.data() as Bookmark
    return { album, createdAt }
  })

  return response
}
