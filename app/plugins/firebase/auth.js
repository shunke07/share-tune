import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default (context, inject) =>
  new Promise((resolve) => {
    const observable = Vue.observable({
      currentUser: firebase.auth().currentUser
    })

    inject('currentUser', observable.currentUser)

    firebase.auth().onAuthStateChanged(() => {
      observable.currentUser = firebase.auth().currentUser
      resolve()
    })
  })
