import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { add, multiply, interpolate, timing } from 'react-native-reanimated'
import type { navigationCustomProps } from 'src/commons'
import { IConfigAnimated, IRenderComponent, IShareTransitioner } from '../types'

import Overlay from './Overlay'
import { SharedElementContext } from './Provider'

interface ITransitionerProps {}

class Transitioner extends React.Component<
  {
    children: (props: ITransitionerProps) => ReactNode
    hasShareElement?: Boolean
    configs?: IConfigAnimated
    components?: IRenderComponent
  } & navigationCustomProps,
  {
    blockView: boolean
  }
> {
  static childContextTypes = IShareTransitioner

  context!: React.ContextType<typeof SharedElementContext> & {
    updateSharedView: () => {}
  }

  screenId: number = Number(Date.now().toString())

  progress = new Animated.Value<number>(0)

  configs?: IConfigAnimated

  components?: IRenderComponent

  overlay = React.createRef<Overlay>()

  constructor(props: any) {
    super(props)
    this.configs = props.configs || {}

    this.components = props.components || {}
  }

  getChildContext: () => typeof IShareTransitioner = () => {
    return {
      getRootId: this.getRootId,
    }
  }

  getRootId: () => number = () => {
    return this.screenId
  }

  getConfigTiming: () => Omit<Animated.TimingConfig, 'toValue'> = () => {
    const { configs } = this.context
    return { ...configs.timing, ...(this.configs?.timing || {}) }
  }

  getConfigSpring: () => Animated.SpringConfig | {} = () => {
    const { configs } = this.context
    return { ...configs.spring, ...(this.configs?.spring || {}) }
  }

  /**
   *
   * @param callback
   * func props cho các màn hình
   * tại mỗi màn hình, khi gọi func chuyển view sẽ phải gọi func này để update lại matric cho các shareView
   */
  updateSharedView = (callback: () => void) => {
    const { updateSharedView } = this.context
    updateSharedView(this.getRootId(), callback)
  }

  goBack = (callback: () => void) => {
    if (this.overlay.current !== null) {
      this.overlay.current!.hideShareView(this.getRootId())
      this.onEndShare(() => {
        if (this.overlay.current) this.overlay.current!.showShareView(this.getRootId())
        requestAnimationFrame(() => {
          this.updateSharedView(callback)
        })
      })
    } else {
      this.onEndShare(callback)
    }
  }

  onStartShare: (callback: () => void, animate?: boolean) => void = (callback, animate) => {
    requestAnimationFrame(() => {
      if (!animate) this.progress.setValue(1)
      else {
        timing(this.progress, { ...this.getConfigTiming(), toValue: 1 }).start(({ finished }) => {
          if (finished) {
            callback()
          }
        })
      }
    })
  }

  onEndShare: (callback: () => void) => void = (callback) => {
    requestAnimationFrame(() => {
      timing(this.progress, { ...this.getConfigTiming(), toValue: 0 }).start(({ finished }) => {
        if (finished) {
          callback()
        }
      })
    })
  }

  render() {
    const { children } = this.props
    const opacity = interpolate(this.progress, {
      inputRange: [0, 0.99999, 1],
      outputRange: [0, 0, 1],
    })
    return (
      <View pointerEvents="box-none" style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { opacity: add(multiply(opacity, -1), 1) }]}>
          <Overlay
            ref={this.overlay}
            startShare={this.onStartShare}
            progress={this.progress}
            id={this.screenId}
          />
        </Animated.View>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.viewContent,
            {
              opacity,
            },
          ]}>
          {children({ updateSharedView: this.updateSharedView, goBack: this.goBack })}
        </Animated.View>
      </View>
    )
  }
}

Transitioner.contextType = SharedElementContext

/**
 *
 * @param Component
 * hoc để bọc phần màn hình chính của việc share element
 * mục đích truyền screen_id cho các thằng con
 * đồng thời: sẽ tạo func update measure của các thằng con
 */
function withTransitioner<P extends navigationCustomProps>(
  Component: React.ComponentType<P>,
  hasShareElement?: boolean,
  more?: {
    configs?: IConfigAnimated
    components?: IRenderComponent
  }
) {
  return React.forwardRef((props: P, ref: React.Ref<P>) => (
    <Transitioner {...more} hasShareElement={hasShareElement} navigation={props.navigation}>
      {(transitionProps: ITransitionerProps) => (
        <Component {...transitionProps} {...props} ref={ref} />
      )}
    </Transitioner>
  ))
}

export default withTransitioner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  viewContent: {
    backgroundColor: '#fff',
  },
})
