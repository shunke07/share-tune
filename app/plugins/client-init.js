export default async ({ app, store }) => {
  const user = app.$auth.currentUser
  if (!user || !user.emailVerified) return

  // init state loginUser
  await store.dispatch('login', { uid: user.uid })
}
