import React from 'react'
import { StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native'
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient'
import { getRadius, getShadow, getMarginPaddingStyle, getBorder } from '../Utils'
import type { IBoxProps } from '../Types'

export interface IPropsLinear extends Omit<IBoxProps, 'style'>, LinearGradientProps {
  style?: StyleProp<ViewStyle>
}

// component custom lại view
const Linear = (props: IPropsLinear) => {
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

    colors,

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

  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} {...customProps}>
      {children}
    </LinearGradient>
  )
}

Linear.defaultProps = {
  center: false,
  row: false,
  middle: false,
  shadowType: ['vertical'],
}

export default Linear

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
