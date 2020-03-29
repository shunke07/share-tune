import { NuxtContext } from '~/types/nuxt.d.ts'

export default async ({ app, store }: NuxtContext) => {
  const user = app.$auth.currentUser
  if (!user?.emailVerified) return

  // init state loginUser
  await store.dispatch('login', { uid: user.uid })
}
