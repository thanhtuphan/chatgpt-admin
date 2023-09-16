import { IForm } from '~/common/core/IForm'

export class CreateUserDto implements IForm {
  constructor(partial?: Partial<CreateUserDto>) {
    Object.assign(this, partial)
  }

  toForm() {
    return {
      ...this,
    }
  }
}
