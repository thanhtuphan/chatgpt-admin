import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { ConstantsCommon, RoutePage } from '~/common/constants'

Vue.prototype.ConstantsCommon = ConstantsCommon
Vue.prototype.RoutePage = RoutePage

const constants: Plugin = (context) => {
  context.ConstantsCommon = ConstantsCommon
  context.RoutePage = RoutePage
}

export default constants
