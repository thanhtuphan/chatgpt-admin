export class UpdateNoticeDto {
  content!: string
  content_en?: string

  constructor(partial?: Partial<UpdateNoticeDto>) {
    Object.assign(this, partial)
  }

  toForm() {
    return {
      ...this,
    }
  }
}
