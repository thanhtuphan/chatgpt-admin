export interface IListQuery {
  page?: number
  sort?: {
    sorted: string
    sortType: string
  }
  filters?: {
    search?: string
    valueSelected?: string[]
  }
}
