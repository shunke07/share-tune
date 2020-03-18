import firebase from '~/plugins/firebase/init'
import 'firebase/firestore'

const db = firebase.firestore()
const fieldVal = firebase.firestore.FieldValue
export const timestamp = fieldVal.serverTimestamp()

// reference of collection
const ref = (ref) => db.collection(ref)
export const usersRef = ref('users')
