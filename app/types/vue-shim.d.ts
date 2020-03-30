import Vue from 'vue'
import * as firebase from 'firebase/app'
import dayjs from 'dayjs'

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: {
      currentUser: firebase.User | null
    }
    $firestore: any
    $functions: firebase.functions.Functions
    $auth: firebase.auth.Auth
    $dayjs(
      date?: dayjs.ConfigType,
      option?: dayjs.OptionType,
      locale?: string
    ): dayjs.Dayjs
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
    $dayjs(
      date?: dayjs.ConfigType,
      option?: dayjs.OptionType,
      locale?: string
    ): dayjs.Dayjs
  }
}
