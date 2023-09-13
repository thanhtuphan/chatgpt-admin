import { ProductMediaModel } from '../product-media/product-media.model'
import { UserModel } from '../user/user.model'
import { IModel } from '~/common/core/IModel'
import { ExcludeMethods } from '~/common/core/types'
import { CurrencyUnit } from '~/common/enums/currency-unit'
import { toJSON } from '~/common/utils/helper'

export class ProductModel implements IModel {
  id!: string
  user_id!: string
  user?: UserModel
  title!: string
  tags?: string
  description?: string
  price!: number
  price_unit!: CurrencyUnit
  stock!: number
  stock_remain!: number
  product_media!: ProductMediaModel[]
  created_at?: string
  updated_at?: string

  constructor(partial?: Partial<ExcludeMethods<ProductModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<ProductModel>(this)
  }
}
