import { ActionTree } from 'vuex'
// import { RoutePage } from '~/common/constants'
import { ACCESS_TOKEN_KEY } from '~/common/constants/common'

interface StateProps {}

export const state = (): StateProps => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  nuxtClientInit({ dispatch }, { $cookies }) {
    const token = $cookies.get(ACCESS_TOKEN_KEY)

    if (token) {
      dispatch('auth/getInfo', token)
    }
  },

  async logout({ commit }) {
    await this.$supabase.auth.signOut()
    commit('auth/SET_USER', null)
    this.$cookies.remove(ACCESS_TOKEN_KEY)
    // this.$router.push(RoutePage.LOGIN)
  },
}
