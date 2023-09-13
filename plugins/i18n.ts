import { Plugin } from '@nuxt/types'
import { initializeI18n } from '~/common/utils/i18n'

const i18nPlugin: Plugin = ({ i18n }) => {
  initializeI18n(i18n)
}

export default i18nPlugin
