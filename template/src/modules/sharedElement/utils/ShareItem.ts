import type React from 'react'
import { findNodeHandle, UIManager, View } from 'react-native'
import type Animated from 'react-native-reanimated'
import { Metric } from './Metric'
import type { IInsets, IPayloadRenderComponent } from '../types'

export interface IShareItem {
  view: React.RefObject<View>
  metric?: Metric
  children: React.ReactNode
  id: number
  screenId: number
  type: string | 'View' | 'Image' | 'Text'
  name: string
  setOpacity: (value: 0 | 1) => void
  renderComponent?: (props: IPayloadRenderComponent) => React.ReactNode
}

export class ShareItem implements IShareItem {
  view: React.RefObject<View>

  node?: number | null

  metric?: Metric

  children: React.ReactNode

  isInWindow?: boolean

  type: string | 'Text' | 'View' | 'Image'

  name: string

  id: number

  screenId: number

  setOpacity: (value: 0 | 1 | Animated.Adaptable<any>) => void

  renderComponent?: (props: IPayloadRenderComponent) => React.ReactNode

  constructor(props: IShareItem) {
    const { view, children, type, name, id, screenId, setOpacity, renderComponent } = props
    this.view = view
    this.id = id
    this.screenId = screenId
    this.children = children
    this.type = type
    this.name = name
    this.setOpacity = setOpacity
    this.renderComponent = renderComponent
  }

  /**
   * func tính toán vị trí của item trên window
   * sau khi tính toán xong, sẽ check xem hiện tại view đó có nằm trên windown hay không
   * @returns Promise để làm func đợi, bắt phải thực hiện xong mới lấy về
   */
  updateMetric: (props: { insets: IInsets }) => Promise<any> = ({ insets }) => {
    return new Promise((resolve) => {
      if (this.view.current !== null) {
        // @ts-ignore
        UIManager.measureInWindow(findNodeHandle(this.view.current), (x, y, width, height) => {
          // khởi tạo class để tiện cho việc check nằm trên window
          const metric = new Metric({ x, y, width, height })
          this.metric = metric
          this.isInWindow = metric.checkInWindow({ insets })

          resolve({})
        })
      }
      // this.view.current!.measureInWindow((x, y, width, height) => {
      //   console.log('ShareItem -> x', x)
      //   // khởi tạo class để tiện cho việc check nằm trên window
      //   const metric = new Metric({ x, y, width, height })
      //   this.metric = metric
      //   this.isInWindow = metric.checkInWindow()

      //   resolve({})
      // })
    })
  }
}
