import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import * as Utils from '~/common/utils'

Vue.prototype.Utils = Utils

const utils: Plugin = (context) => {
  context.Utils = Utils
}

export default utils
