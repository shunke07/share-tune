import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

// eslint-disable-next-line
export default (context, inject) => {
  inject('firestore', firebase.firestore)
  inject('functions', firebase.app().functions('asia-northeast1'))
  inject('auth', firebase.auth())
}
