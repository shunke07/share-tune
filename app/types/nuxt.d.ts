import { NuxtAppOptions } from '@nuxt/types'
import { Store } from 'vuex'

export interface NuxtContext {
  app: NuxtAppOptions
  store: Store<any>
}
