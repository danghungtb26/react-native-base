import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import type { IPayloadRenderComponent } from '../../types'

interface IProps extends IPayloadRenderComponent {}

const ElementShareWithView: React.FC<IProps> = (props) => {
  const { from, to, keyview, progress } = props
  // @ts-ignore
  const { children, style, radius = 0 } = from?.children?.props || {}

  // @ts-ignore
  const { radius: radiusto = 0 } = to?.children?.props || {}
  return (
    <Animated.View
      style={[
        style,
        styles.absolute,
        {
          borderRadius: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [radius, radiusto],
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
      ]}
      key={keyview}>
      {children}
    </Animated.View>
  )
}

export default (props: IPayloadRenderComponent) => <ElementShareWithView {...props} />

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
})
