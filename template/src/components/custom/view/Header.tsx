import React from 'react'
import { StyleSheet, StyleProp, TextStyle, Platform } from 'react-native'
import { getOffset } from 'src/commons'
import { Box, TextBase, TouchSingle } from '../../base'

interface IPropsHeader {
  goBack?: () => void
  customBack?: () => React.ReactNode
  renderRight?: () => React.ReactNode
  styleContent?: StyleProp<TextStyle>
  title: string
}

const Header: React.FC<IPropsHeader> = (props) => {
  const { goBack, customBack, renderRight, styleContent, title } = props
  return (
    <Box
      paddingTop={getOffset().top}
      shadow={Platform.OS === 'ios' ? 2 : 5}
      zIndex={5}
      color="#fff">
      <Box row center justifyContent="space-between">
        <Box style={styles.viewContent} center middle>
          <TextBase size={16} style={styleContent}>
            {title}
          </TextBase>
        </Box>
        <TouchSingle onPress={goBack}>
          {customBack ? customBack() : <Box width={40} height={40} />}
        </TouchSingle>

        {renderRight ? renderRight() : <Box width={40} height={40} />}
      </Box>
    </Box>
  )
}

export default Header

const styles = StyleSheet.create({
  viewContent: {
    ...StyleSheet.absoluteFillObject,
  },
})
