import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'

export class NoticeModel implements IModel {
  id!: string
  content!: string
  content_en?: string
  created_at!: string
  updated_at!: string

  constructor(partial?: Partial<ExcludeMethods<NoticeModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<NoticeModel>(this)
  }
}
