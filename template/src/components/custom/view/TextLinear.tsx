import MaskedView from '@react-native-community/masked-view'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import type { LinearGradientProps } from 'react-native-linear-gradient'
import { ITextBaseProps, Linear, TextBase, useColors } from 'src/components/base'

interface ITextLinearProps extends Omit<LinearGradientProps, 'style' | 'colors'>, ITextBaseProps {
  children?: string
  colors?: (string | number)[]
  maskStyle?: StyleProp<ViewStyle>
}

const TextLinear: React.FC<ITextLinearProps> = (props) => {
  const { children, maskStyle, style, ...restProps } = props
  const colors = useColors()
  return (
    <MaskedView
      style={maskStyle}
      maskElement={
        <TextBase style={style} {...restProps}>
          {children}
        </TextBase>
      }>
      <Linear colors={[colors.h_ff5722, colors.rgba_241_118_18_075]}>
        <TextBase style={[style, styles.text]} {...restProps}>
          {children}
        </TextBase>
      </Linear>
    </MaskedView>
  )
}

export default TextLinear

const styles = StyleSheet.create({
  text: {
    opacity: 0,
  },
})
