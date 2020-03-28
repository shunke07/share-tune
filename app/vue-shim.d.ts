import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: any
    $firestore: any
    $functions: any
    $auth: any
  }
}
