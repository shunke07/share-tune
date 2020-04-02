import { usersRef, timestamp } from '~/repositories/firestore/config.ts'
import { User } from '~/types/firestore'

type Payload = {
  uid: string
  displayName: string
}

type UserData = {
  uid: string
  displayName: User['displayName']
  profileText: User['profileText']
  siteUrl: User['siteUrl']
  image: User['image']
}

export const createUser = async (payload: Payload): Promise<void> => {
  const { uid, displayName } = payload

  await usersRef.doc(uid).set({
    displayName,
    profileText: null,
    siteUrl: null,
    image: {
      id: null,
      url: null
    },
    createdAt: timestamp,
    updatedAt: timestamp
  })
}

export const getUser = async (uid: string): Promise<UserData | undefined> => {
  const doc = await usersRef.doc(uid).get()
  if (!doc.exists) return

  const { displayName, profileText, siteUrl, image } = doc.data() as User
  const response: UserData = {
    uid,
    displayName,
    profileText,
    siteUrl,
    image
  }

  return response
}
