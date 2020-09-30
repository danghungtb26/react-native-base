import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'
import type { ITextBaseProps } from '../Types'
import { getFontSize, getShadowText, getMarginPaddingStyle } from '../Utils'

const TextBase = (props: ITextBaseProps) => {
  const {
    weight,
    row,
    middle,
    center,
    children,
    radiusType,
    radius,
    shadowColor,
    shadow,
    shadowType,
    style,
    color,
    size,
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
    width,
    height,
    ...restProps
  } = props
  const custom_style: StyleProp<TextStyle> = [
    center && { textAlign: 'center' },
    middle && { textAlignVertical: 'center' },
    size !== undefined ? getFontSize(size) : null,
    color !== undefined ? { color } : null,
    (typeof width === 'number' || typeof width === 'string') && { width },
    (typeof height === 'number' || typeof height === 'string') && { height },
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
    getShadowText({
      value: shadow,
      color: shadowColor,
      horizontal: shadowType?.includes('horizontal'),
      vertical: shadowType?.includes('vertical'),
    }),
    { fontWeight: weight },
    style,
  ]
  return (
    <Text style={custom_style} {...restProps}>
      {children}
    </Text>
  )
}

TextBase.displayName = 'Text'

export default TextBase

TextBase.defaultProps = {
  center: false,
  shadowType: ['vertical'],
}
