import React from 'react'
import type { StyleProp, TextStyle, ViewProps } from 'react-native'
import { sizes } from 'src/configs'
import type { IPropsTouchScale } from 'src/components/base/button/TouchScale'
import { Box, ITextBaseProps, TextBase, TouchScale } from '../../base'
import type { IBoxProps } from '../../base'

interface IPropsButtonPost extends IBoxProps, Pick<IPropsTouchScale, 'onPress'> {
  title: string
  containerStyle?: StyleProp<ViewProps>
  titleStyle?: StyleProp<TextStyle>
  titleProps?: ITextBaseProps
}

const ButtonPost: React.FC<IPropsButtonPost> = (props) => {
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
    style: containerStyle,
  }
  return (
    <Box {...propsContainer}>
      <TouchScale zoomScale={0.98} onPress={onPress}>
        <Box padding={[sizes.margin1_2, sizes.margin]} radius={2} shadow={3} {...restProps}>
          <TextBase size={16} color="#fff" weight="bold" style={titleStyle} {...titleProps}>
            {title}
          </TextBase>
        </Box>
      </TouchScale>
    </Box>
  )
}

export default ButtonPost
