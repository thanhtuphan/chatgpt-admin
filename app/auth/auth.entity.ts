import { AuthModel } from './auth.model'
import { IEntity } from '~/common/core/IEntity'
import { ExcludeMethods } from '~/common/core/types'
import { toJSON, toModel } from '~/common/utils/helper'

export class AuthEntity implements IEntity<AuthModel> {
  accessToken!: string

  constructor(partial?: Partial<ExcludeMethods<AuthEntity>>) {
    Object.assign(this, partial)
  }

  toModel(): AuthModel {
    return toModel<AuthModel>(this)
  }

  toJSON() {
    return toJSON<AuthEntity>(this)
  }
}
