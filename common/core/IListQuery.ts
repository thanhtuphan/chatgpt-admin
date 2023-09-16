export interface IListQuery {
  page?: number
  limit?: number
  sort?: {
    column: string
    option: boolean
  } | null
  filters?: {
    search: string
    filtersByCompany?: string
    valueSelected?: string[]
    valueSelectedCountry?: string[]
    valueDatePicker?: Date[]
  }
}
