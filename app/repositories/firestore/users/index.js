import { usersRef, timestamp } from '~/repositories/firestore/config'

export const createUser = async (payload) => {
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

export const getUser = async ({ uid }) => {
  const doc = await usersRef.doc(uid).get()
  if (!doc.exists) return

  const { displayName, profileText, siteUrl, image } = doc.data()
  return {
    uid,
    displayName,
    profileText,
    siteUrl,
    image
  }
}
