import { SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient<any, 'public', any>

export const initializeSupabase = (
  i18nInstance: SupabaseClient<any, 'public', any>
) => {
  supabase = i18nInstance
}

export { supabase }
