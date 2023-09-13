import numeral from 'numeral'
import { CurrencyUnit } from '~/common/enums'

export const currencyFilter = (price: number, currencyUnit: CurrencyUnit) => {
  if (currencyUnit === CurrencyUnit.JPY) {
    return `${numeral(price).format('0,0')}円`
  } else {
    return numeral(price).format('$ 0,0[.]00')
  }
}
