import { IModel } from '~/common/core/IModel'
import { ExcludeMethods } from '~/common/core/types'
import { toJSON } from '~/common/utils/helper'

export class AuthModel implements IModel {
  accessToken!: string

  constructor(partial?: Partial<ExcludeMethods<AuthModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<AuthModel>(this)
  }
}
