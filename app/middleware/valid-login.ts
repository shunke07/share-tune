import { Middleware } from '@nuxt/types'

const validateLgoin: Middleware = ({ store, route, redirect }) => {
  const loginUser = store.state.loginUser
  const isLoggedIn = !!loginUser

  const validPath = (paths: string[]) => {
    const validate = (path: string) => route.path === path
    return !!paths.find((path) => validate(path))
  }

  const { albumId } = route.params
  const pathsShouldLoggedIn = ['/releases/', `/albums/${albumId}/`]
  const pathsShouldNotLoggedIn = ['/', '/signup/', '/login/']

  if (validPath(pathsShouldLoggedIn) && !isLoggedIn) return redirect('/')
  if (validPath(pathsShouldNotLoggedIn) && isLoggedIn) {
    return redirect('/releases/')
  }
}

export default validateLgoin
