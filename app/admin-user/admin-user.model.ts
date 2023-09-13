import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'
import { Role } from '~/common/enums'

export class AdminUserModel implements IModel {
  id!: string
  email!: string
  raw_app_meta_data!: {
    claims_admin: boolean
    role: Role
  }

  last_sign_in_at?: string
  created_at?: string
  updated_at?: string

  constructor(partial?: Partial<ExcludeMethods<AdminUserModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<AdminUserModel>(this)
  }
}
