import { CurrencyUnit } from '~/common/enums'

export interface UpdateProductMedia {
  id?: string
  media_url: string
  media_type: 'image/jpg' | 'image/png' | 'video/mp4'
  is_removed?: boolean
}

export class UpdateProductDto {
  title!: string
  tags?: string
  description?: string
  price!: number
  price_unit!: CurrencyUnit
  stock!: number
  stock_remain!: number
  product_media!: Array<UpdateProductMedia>

  constructor(partial?: Partial<UpdateProductDto>) {
    Object.assign(this, partial)
  }

  toForm() {
    return {
      ...this,
    }
  }
}
