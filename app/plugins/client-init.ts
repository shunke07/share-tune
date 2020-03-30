import { Context } from '@nuxt/types'

export default async ({ app, store }: Context) => {
  const user = app.$auth.currentUser
  if (!user?.emailVerified) return

  // init state loginUser
  await store.dispatch('login', { uid: user.uid })
}
