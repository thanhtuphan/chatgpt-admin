import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/common/utils/axios'
import { StatusCode } from '~/common/enums/status-code'

const axios: Plugin = ({
  $axios,
  error,
  redirect,
  $cookies,
  ConstantsCommon,
  RoutePage,
  store,
}) => {
  $axios.onRequest((config) => {
    const accessToken = $cookies.get(ConstantsCommon.ACCESS_TOKEN_KEY)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  })

  $axios.onError((err) => {
    const code = err.response?.status

    switch (code) {
      case StatusCode.Unauthorized:
        store.dispatch('logout')

        return redirect(RoutePage.LOGIN)

      case StatusCode.ServiceUnavailable:
        error({
          statusCode: code,
        })
        break

      default:
        return Promise.reject(err)
    }
  })

  initializeAxios($axios)
}

export default axios
