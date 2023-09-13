import { IForm } from '~/common/core/IForm'

export class CreateProductMediaDto implements IForm {
  constructor(partial?: Partial<CreateProductMediaDto>) {
    Object.assign(this, partial)
  }

  toForm() {
    return {
      ...this,
    }
  }
}
