import React from 'react'
import { View, StyleSheet, Animated, ViewProps, StyleProp, ViewStyle } from 'react-native'
import ReAnimated from 'react-native-reanimated'
import { getRadius, getShadow, getMarginPaddingStyle, getBorder } from '../Utils'
import type { IBoxProps } from '../Types'

// component custom lại view
const Box = (props: IBoxProps) => {
  const {
    center,
    middle,
    row,
    color,
    width,
    height,
    radius,
    radiusType,
    style,
    shadow,
    shadowColor,
    shadowType,
    flex,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    animted,
    children,
    justifyContent,
    alignItems,
    display,
    hidden,
    grow,
    shrink,
    wrap,
    basis,
    zIndex,

    borderRightColor,
    borderRightWidth,
    borderWidth,
    borderBottomColor,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftWidth,
    borderTopColor,
    borderTopWidth,
    ...restProps
  } = props
  const style_custom: StyleProp<ViewStyle> = [
    flex ? { flex } : null,
    center && styles.center,
    middle && styles.middle,
    row && styles.row,
    !!color && { backgroundColor: color },
    (typeof width === 'number' || typeof width === 'string') && { width },
    (typeof height === 'number' || typeof height === 'string') && { height },
    getRadius(radius, radiusType),
    getShadow({
      value: shadow,
      color: shadowColor,
      horizontal: shadowType?.includes('horizontal'),
      vertical: shadowType?.includes('vertical'),
    }),
    // lấy ra margin và padding dựa vào props
    getMarginPaddingStyle({
      margin,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,

      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      padding,
    }),
    // lấy ra thông tin style border
    getBorder({
      borderRightColor,
      borderRightWidth,
      borderWidth,
      borderBottomColor,
      borderBottomWidth,
      borderColor,
      borderLeftColor,
      borderLeftWidth,
      borderTopColor,
      borderTopWidth,
    }),
    typeof grow === 'number' ? { flexGrow: grow } : null,
    typeof shrink === 'number' ? { flexShrink: shrink } : null,
    wrap ? { flexWrap: wrap } : null,
    typeof basis === 'number' ? { flexBasis: grow } : null,
    justifyContent ? { justifyContent } : null,
    alignItems ? { alignItems } : null,
    typeof zIndex === 'number' ? { zIndex } : null,
    { display: display ?? 'flex' },
    hidden && { display: 'none' },
    // @ts-ignore
    style,
  ]

  const customProps: ViewProps = {
    style: style_custom,
    ...restProps,
  }
  if (animted === 'animated') return <Animated.View {...customProps}>{children}</Animated.View>

  if (animted === 'reanimated')
    return <ReAnimated.View {...customProps}>{children}</ReAnimated.View>

  return <View {...customProps}>{children}</View>
}

Box.defaultProps = {
  center: false,
  row: false,
  middle: false,
  shadowType: ['vertical'],
}

Box.displayName = 'View'

export default Box

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
})
