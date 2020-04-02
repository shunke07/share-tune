import { usersRef, timestamp } from '~/repositories/firestore/config.ts'
import { User } from '~/types/firestore'

type Payload = {
  uid: string
  displayName: string
}

export const createUser = async (payload: Payload) => {
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

export const getUser = async ({ uid }: { uid: string }) => {
  const doc = await usersRef.doc(uid).get()
  if (!doc.exists) return

  const { displayName, profileText, siteUrl, image } = doc.data() as User

  return {
    uid,
    displayName,
    profileText,
    siteUrl,
    image
  }
}
