import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import _ from 'lodash'
import Animated from 'react-native-reanimated'
import type { ShareElement } from '../utils/ShareElement'
import type { ShareItem } from '../utils/ShareItem'
import { SharedElementContext } from './Provider'
import { findItemByIdAndName } from '../utils'
import type { IRenderComponent } from '../types'
import { componentsDefault } from '../values'

interface IProps {
  id: number
  progress: Animated.Adaptable<any>
  startShare: (callback: () => void, animated?: boolean) => void
}

interface IState {}

class Overlay extends Component<IProps, IState> {
  context!: React.ContextType<typeof SharedElementContext> & {
    updateSharedView: () => {}
  }

  check_layout: boolean = false

  componentDidMount() {
    const { id } = this.props
    const { elements, items } = this.context
    const listElement = elements.filter(
      (i) => findItemByIdAndName(items, i.to, i.name)?.screenId === id
    )
    if (listElement.length <= 0) {
      setTimeout(
        () => {
          this.startShareWithoutAnimation()
        },
        Platform.OS === 'android' ? 200 : 100
      )
    }
  }

  /**
   *
   * @param p
   * @param s
   * @param c
   * mục đích của việc này là check để không bị render lại
   */
  shouldComponentUpdate(p: IProps, s: IState, c: any) {
    const { id } = this.props
    const { elements, items } = this.context
    const listElement = elements.filter(
      (i) => findItemByIdAndName(items, i.to, i.name)?.screenId === id
    )
    const nextList = c.elements.filter(
      (i: any) => findItemByIdAndName(c.items, i.to, i.name)?.screenId === id
    )

    const { progress } = this.props
    return !_.isEqual(listElement, nextList) || !_.isEqual(progress, p.progress)
  }

  componentWillUnmount() {
    const { id } = this.props
    this.showShareView(id)
  }

  // sau khi register hết các element rồi, sẽ bắt đầu render
  // sau khi render xong => sẽ tiến hành
  onLayout = () => {
    if (this.check_layout) return
    this.check_layout = true
    const { updateSharedView } = this.context

    const { id } = this.props

    /**
     * Ngay sau khi view bọc tất cả overlay được khởi tạo => bắt đầu init view với
     * và có đầy đủ item share
     * gọi lại func update matric của các ShareView
     * Sau khi update thành công => đặt tất cả view share (to) opacity: 0 để chạy animation
     */
    updateSharedView(id, () => {
      this.hideShareView(id)
      const { items, elements } = this.context
      const listElement = elements.filter((i) => {
        const itemTo: ShareItem | undefined = findItemByIdAndName(items, i.to, i.name)
        const itemFrom: ShareItem | undefined = findItemByIdAndName(items, i.to, i.name)
        return itemTo?.screenId === id && itemTo?.isInWindow && itemFrom?.isInWindow
      })
      const { startShare } = this.props
      startShare(() => {
        this.showShareView(id)
      }, listElement.length > 0)
    })
  }

  startShareWithoutAnimation = () => {
    if (this.check_layout) return
    this.check_layout = true

    const { startShare } = this.props
    startShare(() => {}, false)
  }

  hideShareView = (id: number) => {
    const { items, elements } = this.context
    const listElement = elements.filter((i) => {
      const itemTo: ShareItem | undefined = findItemByIdAndName(items, i.to, i.name)
      const itemFrom: ShareItem | undefined = findItemByIdAndName(items, i.to, i.name)
      return itemTo?.screenId === id && itemTo?.isInWindow && itemFrom?.isInWindow
    })
    listElement.forEach((e) => {
      if (findItemByIdAndName(items, e.from, e.name))
        findItemByIdAndName(items, e.from, e.name)!.setOpacity(0)
    })
  }

  showShareView = (id: number) => {
    const { items, elements } = this.context
    const listElement = elements.filter(
      (i) => findItemByIdAndName(items, i.to, i.name)?.screenId === id
    )
    listElement.forEach((e) => {
      if (findItemByIdAndName(items, e.from, e.name))
        findItemByIdAndName(items, e.from, e.name)!.setOpacity(1)
    })
  }

  getComponents: () => IRenderComponent = () => {
    const { components } = this.context
    return components
  }

  getViewItem = (type?: string) => {
    if (!type) return undefined

    const components = this.getComponents() || componentsDefault

    return components[type.toLowerCase()]
  }

  renderItem = (e: ShareElement) => {
    const { items } = this.context
    const from = findItemByIdAndName(items, e.from, e.name)
    const to = findItemByIdAndName(items, e.to, e.name)
    const { progress } = this.props

    if (!from?.isInWindow || !to?.isInWindow) return null
    /**
     * nếu được khai báo sẽ dùng của từng share thay vì dùng chung
     */
    if (typeof to?.renderComponent === 'function') {
      return (
        <React.Fragment key={`${e.to}-${e.from}-${e.name}`}>
          {to?.renderComponent({
            from,
            to,
            name: e.name,
            keyview: `${e.to}-${e.from}-${e.name}`,
            type: e.type,
            progress,
          })}
        </React.Fragment>
      )
    }

    /**
     * nếu không có, sẽ tìm view ben trong kho lưu trữ
     */
    const view = this.getViewItem(e.type)

    // nếu không có thoả mãn => ko hiển thị gì hết
    if (!view) return null

    return (
      <React.Fragment key={`${e.to}-${e.from}-${e.name}`}>
        {view.renderComponent({
          from,
          to,
          name: e.name,
          keyview: `${e.to}-${e.from}-${e.name}`,
          type: e.type,
          progress,
        })}
      </React.Fragment>
    )
  }

  /**
   * view chưa tất cả các transition share
   */
  renderContent = () => {
    const { items, elements } = this.context
    const { id } = this.props
    const listElement = elements.filter(
      (i) => findItemByIdAndName(items, i.to, i.name)?.screenId === id
    )
    if (listElement.length <= 0) {
      return null
    }
    return (
      <Animated.View style={[styles.container]} onLayout={this.onLayout}>
        {listElement.map((e) => this.renderItem(e))}
      </Animated.View>
    )
  }

  render() {
    return (
      <Animated.View style={StyleSheet.absoluteFillObject}>{this.renderContent()}</Animated.View>
    )
  }
}

export default Overlay

Overlay.contextType = SharedElementContext

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
  },
})
