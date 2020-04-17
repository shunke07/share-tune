import firebase from '~/plugins/firebase/init'
import 'firebase/firestore'

const db = firebase.firestore()
const fieldVal = firebase.firestore.FieldValue
export const timestamp = fieldVal.serverTimestamp()

type Collection = 'users'
type UsersSubCollection = 'bookmarks' | 'posts'

// reference of collection
const ref = (ref: Collection) => db.collection(ref)

export const usersRef = ref('users')

const usersSubCollection = (uid: string, ref: UsersSubCollection) =>
  usersRef.doc(uid).collection(ref)

export const bookmarksRef = (uid: string) =>
  usersSubCollection(uid, 'bookmarks')
export const postsRef = (uid: string) => usersSubCollection(uid, 'posts')
