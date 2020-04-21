import { Middleware, Context } from '@nuxt/types'
import { User } from '~/types/firestore'

const validateLgoin: Middleware = ({ store, route, redirect }: Context) => {
  const loginUser: User = store.state.loginUser
  const isLoggedIn: boolean = !!loginUser
  const albumId: string = route.params.albumId
  const uid: string = route.params.uid

  const validPath = (paths: readonly string[]): boolean => {
    const validate = (path: string): boolean =>
      route.path === path || route.path === `${path}/`
    return !!paths.find((path) => validate(path))
  }
  const pathsShouldLoggedIn = [
    '/releases',
    `/albums/${albumId}`,
    `/users/${uid}`,
    `/settings`
  ] as const
  const pathsShouldNotLoggedIn = ['', '/signup', '/login'] as const

  if (validPath(pathsShouldLoggedIn) && !isLoggedIn) return redirect('/')
  if (validPath(pathsShouldNotLoggedIn) && isLoggedIn) {
    return redirect('/releases/')
  }
}

export default validateLgoin
