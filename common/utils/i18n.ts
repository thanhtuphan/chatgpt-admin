import { IVueI18n } from 'vue-i18n'

let i18n: IVueI18n

export const initializeI18n = (i18nInstance: IVueI18n) => {
  i18n = i18nInstance
}

export { i18n }
