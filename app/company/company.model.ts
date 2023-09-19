// import { ProductModel } from '../product/product.model'
import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'

export class CompanyModel implements IModel {
  edinet_code!: string
  created_at!: string
  submitter_type!: string
  field_distinction!: string
  connect!: string
  capital!: number
  closing_date?: string
  proposer_name!: string
  proposer_name_english?: string
  submitter_name?: string
  location?: string
  submitter_industry!: string
  stock_code!: number
  submitter_corporate_number!: number

  constructor(partial?: Partial<ExcludeMethods<CompanyModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<CompanyModel>(this)
  }
}
