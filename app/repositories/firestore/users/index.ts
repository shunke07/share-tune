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

type UserField = {
  displayName: User['displayName']
  profileText: User['profileText']
  siteUrl: User['siteUrl']
  image: User['image']
  createdAt: typeof timestamp
  updatedAt: typeof timestamp
}

export const createUser = async (payload: Payload): Promise<void> => {
  const { uid, displayName } = payload

  const data: UserField = {
    displayName,
    profileText: null,
    siteUrl: null,
    image: {
      id: null,
      url: null
    },
    createdAt: timestamp,
    updatedAt: timestamp
  }

  await usersRef.doc(uid).set(data)
}

export const updateUser = async (payload: UserData) => {
  const { uid, displayName, image } = payload
  let { profileText, siteUrl } = payload
  let { id, url } = image
  // if string length === 0, substitute with null
  if (!profileText) profileText = null
  if (!siteUrl) siteUrl = null
  if (!id) id = null
  if (!url) url = null

  await usersRef.doc(uid).update({
    displayName,
    profileText,
    siteUrl,
    image: {
      id,
      url
    },
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
