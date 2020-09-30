import React from 'react'
import { StyleSheet } from 'react-native'
import BaseInput from './BaseInput'
import type { ITextInputBaseProps } from '../Types'
import { getFontSize, getMarginPaddingStyle } from '../Utils'

const AreaInput = (props: ITextInputBaseProps) => {
  const {
    rows = 1,
    size = 14,
    padding,
    paddingVertical = 0,
    paddingTop = 0,
    paddingBottom = 0,
    style,
  } = props
  const getsize = (getFontSize(size).fontSize || 14) * 1.2

  // lấy ra toàn bộ object liên quan đến
  const paddingObject = StyleSheet.flatten([
    getMarginPaddingStyle({
      padding,
      paddingVertical,
      paddingTop,
      paddingBottom,
    }),
    style,
  ])

  // giá trị default dựa vào padding hoặc là paddingvertical
  let cal: number = Number(paddingObject.paddingVertical || paddingObject.padding || 0) * 2

  // nếu có paddingTop sẽ bỏ đi 1phần padding và + với padding top
  if (typeof paddingObject.paddingTop === 'number') {
    cal =
      cal -
      Number(paddingObject.paddingVertical || paddingObject.padding || 0) +
      paddingObject.paddingTop
  }

  // nếu có paddingbottom sẽ bỏ đi 1 phần padding và + padding bôttm
  if (typeof paddingObject.paddingBottom === 'number') {
    cal =
      cal -
      Number(paddingObject.paddingVertical || paddingObject.padding || 0) +
      paddingObject.paddingBottom
  }

  const height = getsize * rows + cal

  return <BaseInput multiline size={size} height={height} {...props} />
}

export default AreaInput
