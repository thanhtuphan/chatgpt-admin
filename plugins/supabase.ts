import { Plugin } from '@nuxt/types'
import { createClient } from '@supabase/supabase-js'
import { initializeSupabase } from '~/common/utils/supabase'

const supabasePlugin: Plugin = ({ $config }, inject) => {
  const supabase = createClient($config.supabaseUrl, $config.publicAnonKey, {
    auth: {
      persistSession: false,
    },
  })

  inject('supabase', supabase)

  initializeSupabase(supabase)
}

export default supabasePlugin
