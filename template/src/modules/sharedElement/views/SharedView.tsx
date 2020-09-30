import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { IPayloadRenderComponent, IShareContextType, IShareTransitioner } from '../types'

class SharedView extends React.Component<
  { name: string; renderComponent?: (props: IPayloadRenderComponent) => React.ReactNode },
  {
    opacity: 1 | 0 | Animated.Adaptable<any>
    renderComponent?: (props: IPayloadRenderComponent) => React.ReactNode
    name: string
  }
> {
  id: number = Number(Date.now().toString())

  check_layout: boolean = false

  static contextTypes = { ...IShareContextType, ...IShareTransitioner }

  context!: typeof IShareContextType & typeof IShareTransitioner

  view = React.createRef<View>()

  constructor(props: any) {
    super(props)
    this.state = {
      opacity: 1,
      name: props.name,
      renderComponent: props.renderComponent,
    }
  }

  /**
   * ngay khi khởi tạo component sẽ đăng ký shareview với root
   * gọi func từ context để gọi đến root
   */
  componentDidMount() {
    const { registerSharedView, getRootId } = this.context
    const { children } = this.props
    const { name, renderComponent } = this.state
    registerSharedView({
      children,
      id: this.id,
      view: this.view,
      name,
      screenId: getRootId ? getRootId() : 1,
      setOpacity: this.onSetOpacity,
      // @ts-ignore
      type: children?.type?.displayName || 'View',
      renderComponent,
    })
  }

  /**
   * khi bị unmout sẽ huỷ bo đăng ký đi
   * gọi func từ context => kết nối đến root
   */
  componentWillUnmount() {
    const { unregisterSharedView, getRootId } = this.context
    const { name } = this.state
    unregisterSharedView({ id: this.id, screenId: getRootId(), name })
  }

  // tạm bỏ
  onLayout = () => {
    if (this.check_layout) return

    this.check_layout = true
  }

  // func muc dích ẩn view khi bắt đầu chạy animation share
  onSetOpacity = (opacity: 0 | 1 | Animated.Adaptable<any>) => {
    this.setState({ opacity })
  }

  render() {
    const { children } = this.props
    const { opacity } = this.state
    return (
      <View
        removeClippedSubviews={false}
        onLayout={this.onLayout}
        ref={this.view}
        collapsable={false}
        style={styles.start}>
        <Animated.View style={{ opacity }} collapsable={false}>
          {children}
        </Animated.View>
      </View>
    )
  }
}

export default SharedView

const styles = StyleSheet.create({
  start: { alignItems: 'flex-start', opacity: 1 },
})
