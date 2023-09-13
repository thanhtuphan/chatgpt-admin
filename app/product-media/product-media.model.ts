import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'

export class ProductMediaModel implements IModel {
  id!: string
  product_id!: string
  media_url!: string
  media_type!: 'image/jpg' | 'image/png' | 'video/mp4'
  created_at?: string
  updated_at?: string

  constructor(partial?: Partial<ExcludeMethods<ProductMediaModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<ProductMediaModel>(this)
  }
}
