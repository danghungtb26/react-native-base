import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import type { IPayloadRenderComponent } from '../../types'

interface IProps extends IPayloadRenderComponent {}

const ElementShareWithText: React.FC<IProps> = (props) => {
  const { from, to, progress } = props
  // @ts-ignore
  const { children, style } = from?.children?.props || {}

  const fromFontSize = style?.fontSize || 14

  // @ts-ignore
  const toFontSize = to?.children?.props?.style?.fontSize || 14
  return (
    <Animated.Text
      style={[
        style,
        styles.absolute,
        {
          fontSize: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [fromFontSize, toFontSize],
          }),
          width: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [from?.metric?.width || 0, to?.metric?.width || 0],
          }),
          height: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [from?.metric?.height || 0, to?.metric?.height || 0],
          }),
          top: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [from?.metric?.y || 0, to?.metric?.y || 0],
          }),
          left: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [from?.metric?.x || 0, to?.metric?.x || 0],
          }),
        },
      ]}>
      {children}
    </Animated.Text>
  )
}

export default (props: IPayloadRenderComponent) => <ElementShareWithText {...props} />

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
})
