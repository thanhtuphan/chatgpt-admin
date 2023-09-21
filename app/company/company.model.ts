import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'

export class CompanyModel implements IModel {
  id!: number
  edinet_code!: string
  time_created!: string
  sub_industry?: string
  time_updated?: string
  sub_corporate_number?: number
  sub_type?: string
  connect?: string
  closing_date?: string
  en_name?: string
  direction?: string
  stock_code?: number
  field_distinction?: string
  capital_stock?: number
  latest_date_time_sub?: string
  jp_name?: string
  sub_name?: string

  constructor(partial?: Partial<ExcludeMethods<CompanyModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<CompanyModel>(this)
  }
}
