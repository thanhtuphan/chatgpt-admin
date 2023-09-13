import { Middleware } from '@nuxt/types'
import AuthService from '~/app/auth/auth.service'
import { Role } from '~/common/enums'

const superAdmin: Middleware = async ({
  redirect,
  RoutePage,
  route,
  ConstantsCommon,
  $cookies,
}) => {
  const user = await AuthService.me(
    $cookies.get(ConstantsCommon.ACCESS_TOKEN_KEY)
  )

  if (!user) {
    return redirect({
      path: RoutePage.LOGIN,
      query: {
        redirect: route.fullPath,
      },
    })
  }

  const hasPermission = user.app_metadata.role === Role.SuperAdmin

  if (!hasPermission) {
    return redirect(RoutePage.ADMIN)
  }
}

export default superAdmin
