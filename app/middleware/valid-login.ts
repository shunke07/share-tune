import { Middleware } from '@nuxt/types'

const validateLgoin: Middleware = ({ store, route, redirect }) => {
  const loginUser: any = store.state.loginUser
  const isLoggedIn: boolean = !!loginUser

  const validPath = (paths: readonly string[]): boolean => {
    const validate = (path: string) => route.path === path
    return !!paths.find((path) => validate(path))
  }

  const albumId: string = route.params.albumId
  const pathsShouldLoggedIn = ['/releases/', `/albums/${albumId}/`] as const
  const pathsShouldNotLoggedIn = ['/', '/signup/', '/login/'] as const

  if (validPath(pathsShouldLoggedIn) && !isLoggedIn) return redirect('/')
  if (validPath(pathsShouldNotLoggedIn) && isLoggedIn) {
    return redirect('/releases/')
  }
}

export default validateLgoin
