export interface IShareElement {
  from?: number
  to?: number
  isMeasured: boolean
  type?: string | 'view' | 'text' | 'image'
  name?: string
}

export class ShareElement implements IShareElement {
  from?: number

  to?: number

  isMeasured: boolean = false

  type?: string | 'view' | 'text' | 'image'

  name?: string

  constructor(props: IShareElement) {
    const { from, to, type, name } = props
    this.from = from
    this.to = to
    this.isMeasured = false
    this.type = type
    this.name = name
  }

  /**
   * func update metrics của element
   * gọi 2 func updateMetrics của fromItem và toItem
   *
   * @returns Promise
   */
  // public updateMetrics: () => Promise<any> = async () => {
  //   return Promise.all([await this.from?.updateMetric, await this.to?.updateMetric]).then(() => {
  //     return {}
  //   })
  // }
}
