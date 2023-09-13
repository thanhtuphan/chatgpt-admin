import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import * as Enums from '~/common/enums'

Vue.prototype.Enums = Enums

const enums: Plugin = (context) => {
  context.Enums = Enums
}

export default enums
