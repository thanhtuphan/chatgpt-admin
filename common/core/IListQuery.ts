export interface IListQuery {
  page?: number
  limit?: number
  sort?: {
    column: string
    option: boolean
  } | null
  filters?: {
    search: string
    filtersByUser?: string | (string | null)[]
    valueSelected?: string[]
    valueSelectedCountry?: string[]
    valueDatePicker?: Date[]
  }
}
