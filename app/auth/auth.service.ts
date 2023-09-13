import { User } from '@supabase/supabase-js'
import { supabase } from '~/common/utils/supabase'

const AuthService = {
  /**
   * Get user info
   * @param id
   * @returns
   */
  async me(token: string): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser(token)

    if (error) {
      return null
    }

    return data.user
  },
}

export default AuthService
