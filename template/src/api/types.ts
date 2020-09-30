import type { CancelTokenSource } from 'axios'

export interface IPropsCancelToken {
  cancelToken?: CancelTokenSource
}

export interface IPropsList extends IPropsCancelToken {
  page: number
  limit?: number
}

export interface IResponse {
  success: boolean
  message?: string
  code?: number | string
  cancel?: boolean
  data?: { [x: string]: any }
}

export interface IResponseList extends IResponse {
  data?: Array<Record<string, any>>
  page?: {
    current: number
    max: number
  }
}
