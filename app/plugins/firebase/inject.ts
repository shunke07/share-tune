import firebase from 'firebase/app'
import { Plugin } from '@nuxt/types'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

// eslint-disable-next-line
const firebasePlugin: Plugin = (context, inject) => {
  inject('firestore', firebase.firestore)
  inject('functions', firebase.app().functions('asia-northeast1'))
  inject('auth', firebase.auth())
}
export default firebasePlugin
