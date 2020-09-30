import React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { sizes } from 'src/configs'
import { useColors } from 'src/components/base/provider/Language'
import type { IPropsTouchScale } from 'src/components/base/button/TouchScale'
import { Box, ITextBaseProps, Linear, TextBase, TouchScale } from '../../base'
import type { IBoxProps } from '../../base'

interface IPropsButtonLinear extends Omit<IBoxProps, 'style'>, Pick<IPropsTouchScale, 'onPress'> {
  title: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  titleProps?: ITextBaseProps
}

const ButtonLinear: React.FC<IPropsButtonLinear> = (props) => {
  const {
    title,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    containerStyle,
    titleStyle,
    radius,
    shadow,
    zIndex,
    titleProps,
    onPress,
    ...restProps
  } = props
  const propsContainer = {
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    radius,
    shadow,
    zIndex,
    style: containerStyle,
  }
  const colors = useColors()
  return (
    <Box {...propsContainer}>
      <TouchScale zoomScale={0.98} onPress={onPress}>
        <Box color="#fff" radius={radius}>
          <Linear
            colors={[colors.h_ff5722, colors.rgba_241_118_18_075]}
            padding={[sizes.margin1_2, sizes.margin]}
            radius={radius}
            zIndex={2}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            {...restProps}>
            <TextBase color="#fff" weight="bold" size={16} style={titleStyle} {...titleProps}>
              {title}
            </TextBase>
          </Linear>
        </Box>
      </TouchScale>
    </Box>
  )
}

export default ButtonLinear
