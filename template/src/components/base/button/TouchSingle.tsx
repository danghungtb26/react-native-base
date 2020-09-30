import React, { PureComponent } from 'react'
import { GestureResponderEvent, TouchableOpacityProps, Pressable } from 'react-native'

// type Props = {}
interface Props extends TouchableOpacityProps {
  delay?: number
}

type State = {}

class TouchSingle extends PureComponent<Props, State> {
  lastPress: any = Date.now()

  onPress = (event: GestureResponderEvent) => {
    const delay = Date.now() - this.lastPress
    const { onPress, delay: delayProp = 200 } = this.props
    if (delay >= delayProp) {
      if (typeof onPress === 'function') onPress(event)
    }

    this.lastPress = Date.now()
  }

  render() {
    const { delay, onPress, children, ...restProps } = this.props
    return (
      <Pressable
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onPress={this.onPress}
        {...restProps}>
        {children}
      </Pressable>
    )
  }
}

export default TouchSingle
