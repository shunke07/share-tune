import Vue from 'vue'
import * as firebase from 'firebase/app'

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: {
      currentUser: firebase.User | null
    }
    $firestore: any
    $functions: firebase.functions.Functions
    $auth: firebase.auth.Auth
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $firebase: {
      currentUser: firebase.User | null
    }
    $firestore: any
    $functions: firebase.functions.Functions
    $auth: firebase.auth.Auth
  }
}
