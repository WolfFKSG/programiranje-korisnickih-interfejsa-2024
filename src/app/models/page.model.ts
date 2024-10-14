import { SortModel } from "./sort.model"

export interface PageModel<T> {
    content: T[]
    pageable: {
        sort: SortModel
        pageNumber: number
        pageSize: number
        offset: number
        paged: boolean
        unpaged: boolean
    }
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: SortModel
    numberOfElements: number
    first: boolean
    empty: boolean
}