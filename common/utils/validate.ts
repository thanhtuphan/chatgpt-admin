import { i18n } from './i18n'

/**
 * Validate required
 * @param value
 * @param field
 * @param message
 * @returns
 */
export const required = ({
  field,
  message,
  trigger,
}: {
  field?: string
  message?: string
  trigger?: string | string[]
}) => {
  const contentMessage = field
    ? i18n.t('common.validate.required', { field })
    : message

  return {
    required: true,
    message: contentMessage,
    trigger: trigger ?? ['blur', 'change'],
  }
}

export const requiredSelected = ({
  field,
  message,
  trigger,
}: {
  field?: string
  message?: string
  trigger?: string | string[]
}) => {
  const contentMessage = field
    ? i18n.t('common.validate.requiredSelected', { field })
    : message

  return {
    required: true,
    message: contentMessage,
    trigger: trigger ?? ['change', 'blur'],
  }
}

/**
 * Validate email address
 * @param message
 * @param trigger
 * @returns
 */
export const email = (params?: { trigger?: string | string[] }) => {
  return {
    pattern: /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/,
    message: i18n.t('common.validate.email'),
    trigger: params?.trigger ?? ['change', 'blur'],
  }
}

/**
 * Url format
 * @param message
 * @param trigger
 * @returns
 */
export const url = ({
  message,
  trigger,
}: {
  message: string
  trigger?: string | string[]
}) => {
  return {
    pattern:
      /^https?:\/\/(([a-zA-Z0-9-]+(\.[a-zA-Z]+).*)|([\d]{1,3}(\.[\d]{1,3}){3}))(:[\d]{1,5})?(\/.*)?$/,
    message,
    trigger: trigger ?? ['change', 'blur'],
  }
}
