import { Plugin } from '@nuxt/types'
import _ from 'lodash'

const lodash: Plugin = (_context, inject) => {
  inject('_', _)
}

export default lodash
