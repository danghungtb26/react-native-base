import React from 'react'
import { Text, View } from 'react-native'
import type { IAvatarCircleText } from '../Types'
import { Circle } from '../view'
import { TextBase } from '../text'

// component sử dụng cho ảnh thumb: dùng text hiển thị
const AvatarText = (props: IAvatarCircleText) => {
  const { children, titleProps, ...restProps } = props
  return (
    <Circle center middle shadow={2} {...restProps}>
      <TextBase {...titleProps}>{children}</TextBase>
    </Circle>
  )
}

export const AvatarTextBox: () => React.ReactNode = () => {
  return (
    <View>
      <Text>AvatarText</Text>
    </View>
  )
}

export default AvatarText
