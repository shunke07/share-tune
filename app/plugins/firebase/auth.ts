import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

// eslint-disable-next-line
const firebasePlugin: Plugin = (context, inject) =>
  new Promise((resolve) => {
    const observable = Vue.observable({
      currentUser: firebase.auth().currentUser
    })

    inject('firebase', observable)

    firebase.auth().onAuthStateChanged(() => {
      observable.currentUser = firebase.auth().currentUser
      resolve()
    })
  })
export default firebasePlugin
