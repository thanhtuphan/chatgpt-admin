import { ExcludeMethods } from '~/common/core/types'
import { IModel } from '~/common/core/IModel'
import { toJSON } from '~/common/utils/helper'

export class ReportModel implements IModel {
  id!: number
  edinet_code!: string
  time_created!: string
  time_updated?: string
  date_time_sub?: string
  sub_document?: string
  report_period?: string
  stock_code?: number
  sub_fund?: number
  pdf_url?: string
  csv_name?: string
  csv_url?: string

  constructor(partial?: Partial<ExcludeMethods<ReportModel>>) {
    Object.assign(this, partial)
  }

  toJSON() {
    return toJSON<ReportModel>(this)
  }
}
