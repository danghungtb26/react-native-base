import React from 'react'
import { TextInput, StyleProp, TextStyle } from 'react-native'
import type { ITextInputBaseProps } from '../Types'
import { getFontSize, getShadowText, getRadius, getMarginPaddingStyle, getBorder } from '../Utils'

/**
 * component base của input
 * @param props xem ITextInputBaseProps
 * @return React.Node
 */
const BaseInput = (props: ITextInputBaseProps) => {
  const {
    row,
    center,
    middle,
    width,
    height,
    size,
    children,
    style,
    color,
    shadow,
    shadowColor,
    backgroundColor,
    shadowType,
    refObject,
    radius,
    radiusType,

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
  const custom_style: StyleProp<TextStyle> = [
    center && { textAlign: 'center' },
    middle && { textAlignVertical: 'center' },
    size !== undefined ? getFontSize(size) : null,
    color !== undefined ? { color } : null,
    backgroundColor !== undefined ? { backgroundColor } : null,
    (typeof width === 'number' || typeof width === 'string') && { width },
    (typeof height === 'number' || typeof height === 'string') && { height },
    getShadowText({
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
    getRadius(radius, radiusType),
    style,
  ]

  return (
    <TextInput
      ref={refObject}
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      contextMenuHidden
      style={custom_style}
      {...restProps}
    />
  )
}

export default BaseInput

BaseInput.defaultProps = {
  shadowType: ['vertical'],
}
