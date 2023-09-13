import { Plugin } from '@nuxt/types'
import format from 'string-format'

const stringFormat: Plugin = (_, inject) => {
  inject('format', format)
}

export default stringFormat
