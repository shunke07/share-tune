import { postsRef, timestamp } from '~/repositories/firestore/config'
import { getUser, UserData } from '~/repositories/firestore'
import { Post } from '~/types/firestore'

type Payload = {
  uid: string
  album: Post['album']
  comment: Post['comment']
}

type PostField = {
  album: Post['album']
  comment: Post['comment']
  createdAt: typeof timestamp
  updatedAt: typeof timestamp
}

export type PostData = Post & { user: UserData }

export const createPost = async (payload: Payload): Promise<void> => {
  const { uid, album, comment } = payload
  const { id, imageUrl, name, artist } = album

  const data: PostField = {
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

export const getUserPosts = async ({ uid }: { uid: string }) => {
  const query = await postsRef(uid)
    .orderBy('createdAt', 'desc')
    .get()
  if (query.empty) return []

  const mapping = query.docs.map(async (doc) => {
    const { album, comment, createdAt, updatedAt } = doc.data() as Post
    const { id, imageUrl, name, artist } = album

    // get author data
    const uid = doc.ref.path.split('/')[1]
    const user = await getUser(uid)
    if (!user) return

    const { displayName, profileText, siteUrl, image } = user
    const postData: PostData = {
      album: {
        id,
        imageUrl,
        name,
        artist
      },
      comment,
      createdAt,
      updatedAt,
      user: {
        uid,
        displayName,
        profileText,
        siteUrl,
        image
      }
    }
    return postData
  })

  // filter
  const posts = (await (await Promise.all(mapping)).filter(
    (post) => post !== undefined
  )) as PostData[]

  return posts
}
