import React from 'react'
import { StyleSheet, StyleProp, TextStyle, Platform } from 'react-native'
import { getOffset } from 'src/commons'
import { useColors } from 'src/components/base/provider/Language'
import { Box, IBoxProps, Linear, TextBase, TouchSingle } from '../../base'

interface IPropsHeader extends IBoxProps {
  goBack?: () => void
  customBack?: () => React.ReactNode
  renderRight?: () => React.ReactNode
  styleContent?: StyleProp<TextStyle>
  title: string
}

const HeaderLinear: React.FC<IPropsHeader> = (props) => {
  const { goBack, customBack, renderRight, styleContent, title, style, ...resProps } = props
  const colors = useColors()
  return (
    <Box zIndex={5} shadow={Platform.OS === 'ios' ? 2 : 5}>
      <Linear
        paddingTop={getOffset().top_without_margin}
        shadow={Platform.OS === 'ios' ? 2 : 6}
        zIndex={5}
        colors={[colors.h_ff5722, colors.rgba_241_118_18_075]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        color="#fff">
        <Box row center justifyContent="space-between" height={48} width="100%">
          <Box center middle style={[styles.viewContent, style]} {...resProps}>
            <TextBase size={16} color={colors.h_ffffff} style={styleContent}>
              {title}
            </TextBase>
          </Box>
          {goBack ? (
            <TouchSingle onPress={goBack}>
              {customBack ? customBack() : <Box width={40} height="100%" />}
            </TouchSingle>
          ) : (
            <Box width={40} height="100%" />
          )}

          {renderRight ? renderRight() : <Box width={40} height="100%" />}
        </Box>
      </Linear>
    </Box>
  )
}

export default HeaderLinear

const styles = StyleSheet.create({
  viewContent: {
    ...StyleSheet.absoluteFillObject,
  },
})
