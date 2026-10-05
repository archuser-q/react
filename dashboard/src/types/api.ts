export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}
