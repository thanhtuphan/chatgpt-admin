import { MessageBox } from 'element-ui'
import moment from 'moment'
import { i18n } from './i18n'

/**
 * Get the full name of the user
 * @returns
 */
export const toFullName = (firstName?: string, lastName?: string) => {
  return [firstName, lastName].filter(Boolean).join(' ')
}

/**
 * Convert plain object to instance
 * @param ctor
 * @param plain
 * @returns
 */
export const plainToInstance = <T>(ctor: new () => T, plain: any): T => {
  const instance = new ctor() as any
  const keys = Object.keys(instance as Record<string, unknown>)

  for (const key of keys) {
    if (plain.hasOwnProperty(key)) {
      instance[key] = plain[key]
    }
  }

  return instance
}

/**
 * Formats the time elapsed since the creation point.
 * @param field
 * @param isDesc
 * @returns
 */
export const formatRelativeTime = (time?: string) => {
  if (!time) return ''

  return moment(time).startOf('hour').fromNow()
}

/**
 * Convert path to react router path
 * @param path
 * @returns
 */
export const convertPath = (path: string): string => {
  const parts: string[] = path.split('/')
  const convertedParts: string[] = parts.map((part: string) => {
    if (part.startsWith(':')) {
      const paramName: string = part.slice(1)

      return `{${paramName}}`
    }

    return part
  })
  const convertedPath: string = convertedParts.join('/')

  return convertedPath
}

export const formatDateTime = (
  value: Date = new Date(),
  format = 'YYYY-MM-DD HH:mm'
) => {
  return moment(value).format(format)
}

/**
 * Convert object to JSON
 *
 * @param data
 * @returns
 */
export const toJSON = <T extends object>(data: T) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]: [string, any]) => {
      if (typeof val === 'object' && val !== null && 'toJSON' in val) {
        if (Array.isArray(val)) {
          return [key, val.map((v) => v.toJSON())]
        }

        return [key, val.toJSON()]
      }

      return [key, val]
    })
  ) as T
}

export const toModel = <T extends object>(data: T) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]: [string, any]) => {
      if (typeof val === 'object' && val !== null && 'toModel' in val) {
        if (Array.isArray(val)) {
          return [key, val.map((v) => v.toModel())]
        }

        return [key, val.toModel()]
      }

      return [key, val]
    })
  ) as T
}

export const deleteConfirm = () => {
  return MessageBox.confirm(
    i18n.t('common.confirm.delete.message').toString(),
    i18n.t('common.confirm.delete.title').toString(),
    {
      confirmButtonText: i18n.t('common.actions.ok').toString(),
      cancelButtonText: i18n.t('common.actions.cancel').toString(),
      type: 'warning',
    }
  )
}
