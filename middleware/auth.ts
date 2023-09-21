import { Middleware } from '@nuxt/types'
import AuthService from '~/app/auth/auth.service'
import { Role } from '~/common/enums'

const auth: Middleware = async ({
  redirect,
  RoutePage,
  route,
  ConstantsCommon,
  $cookies,
  store,
}) => {
  // const user = await AuthService.me(
  //   $cookies.get(ConstantsCommon.ACCESS_TOKEN_KEY)
  // )
  // if (!user) {
  //   console.log('auth')
  // return redirect({
  //   path: RoutePage.LOGIN,
  //   query: {
  //     redirect: route.fullPath,
  //   },
  // })
  // }
  // const hasPermission = [Role.SuperAdmin, Role.Admin].includes(
  //   user.app_metadata.role
  // )
  // if (!hasPermission || user.app_metadata.is_disabled === 'true') {
  //   await supabase.auth.signOut()
  //   store.commit('auth/SET_USER', null)
  //   $cookies.remove(ConstantsCommon.ACCESS_TOKEN_KEY)
  //   return redirect(RoutePage.LOGIN)
  // }
}

export default auth
