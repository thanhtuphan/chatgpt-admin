import moment, { MomentInput } from 'moment'

export const dateTimeFilter = (value: MomentInput) => {
  return value ? moment(value).format('YYYY/MM/DD HH:mm:ss') : '-'
}
