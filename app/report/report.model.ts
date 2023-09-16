// import { ProductModel } from '../product/product.model'
import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'

export class ReportModel implements IModel {
  // id!: string
  // email!: string
  // user_name!: string
  // name!: string
  // country!: string
  // avatar_url!: string
  // description?: string
  // user_id!: string
  // instagram_id?: string
  // facebook_id?: string
  // twitter_id?: string
  // cover_photo_url!: string
  // created_at!: string
  // updated_at!: string
  // products!: Array<ProductModel>

  constructor(partial?: Partial<ExcludeMethods<ReportModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<ReportModel>(this)
  }
}
