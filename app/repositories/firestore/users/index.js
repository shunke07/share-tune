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
