import { Plugin } from '@nuxt/types'
import numeralFormat from 'numeral'

const numeral: Plugin = (_context, inject) => {
  inject('numeral', numeralFormat)
}

export default numeral
