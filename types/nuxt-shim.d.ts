import { LoDashStatic } from 'lodash'
import format from 'string-format'
import numeral from 'numeral'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { SupabaseClient } from '@supabase/supabase-js'
import { ConstantsCommon, RoutePage } from '~/common/constants'
import * as Utils from '~/common/utils'
import * as Enums from '~/common/enums'

interface NuxtBase {
  ConstantsCommon: typeof ConstantsCommon
  Utils: typeof Utils
  $_: LoDashStatic
  $format: typeof format
  $numeral: typeof numeral
  $cookies: NuxtCookies
  RoutePage: typeof RoutePage
  Enums: typeof Enums
  $supabase: SupabaseClient<any, 'public', any>
}

declare module 'vue/types/vue' {
  interface Vue extends NuxtBase {}
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  interface Store<S> extends NuxtBase {
    $config: any
    $store: Store<any>
  }
}

declare module '@nuxt/types' {
  interface Context extends NuxtBase {}
}
