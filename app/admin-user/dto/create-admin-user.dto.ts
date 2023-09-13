import { IForm } from '~/common/core/IForm'
import { Role } from '~/common/enums'

export class CreateAdminUserDto implements IForm {
  email!: string
  password!: string
  role!: Role

  constructor(partial?: Partial<CreateAdminUserDto>) {
    Object.assign(this, partial)
  }

  toForm() {
    return {
      ...this,
    }
  }
}
