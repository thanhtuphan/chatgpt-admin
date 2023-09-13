import { User } from '@supabase/supabase-js'
import { ActionTree, MutationTree } from 'vuex'
import AuthService from '~/app/auth/auth.service'

interface StateProps {
  user: User | null | any
}

export const state = (): StateProps => ({
  user: null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_USER(state, user: User | null) {
    state.user = user
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getInfo({ commit }, token: string) {
    const user = await AuthService.me(token)

    commit('SET_USER', user)
  },
}
