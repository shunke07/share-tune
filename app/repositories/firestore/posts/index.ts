import { postsRef, timestamp } from '~/repositories/firestore/config'
import { Post } from '~/types/firestore'

type Payload = {
  uid: string
  album: Post['album']
  comment: Post['comment']
}

type PostData = {
  album: Post['album']
  comment: Post['comment']
  createdAt: typeof timestamp
  updatedAt: typeof timestamp
}

export const createPost = async (payload: Payload): Promise<void> => {
  const { uid, album, comment } = payload
  const { id, imageUrl, name, artist } = album

  const data: PostData = {
    album: {
      id,
      imageUrl,
      name,
      artist
    },
    comment,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  await postsRef(uid).add(data)
}
