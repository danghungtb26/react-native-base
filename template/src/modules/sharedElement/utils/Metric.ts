import { Dimensions } from 'react-native'
import type { IInsets } from '../types'

const { width, height } = Dimensions.get('window')

export interface IMetrics {
  x: number
  y: number
  width: number
  height: number
}

export class Metric {
  x: Readonly<number>

  y: Readonly<number>

  width: Readonly<number>

  height: Readonly<number>

  constructor(props: IMetrics) {
    this.x = props.x || 0

    this.y = props.y || 0

    this.width = props.width || 0

    this.height = props.height || 0
  }

  // lấy ra thông tin matric
  public getMatric: () => IMetrics = () => {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }

  /**
   * func check xem cos nam tren wwin dow hay khoong
   * @returns boolean
   */
  public checkInWindow: (props: { insets: IInsets }) => boolean = ({ insets }) => {
    if (this.width === 0 || this.height === 0) return false
    const { top, bottom, right, left } = insets

    // trường hợp nằm tận bên trái của view
    if (this.x + this.width <= left) return false

    // trường hợp nằm tận trên cùng
    if (this.y + this.height <= top) return false

    // trường hợp nằm tận bên phai
    if (this.x >= width - left - right) return false

    // trường hợp nằm tận bên dưới
    if (this.y >= height - bottom - top) return false
    return true
  }
}
