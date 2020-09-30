import React from 'react'
import type { ICircleProps } from '../Types'
import Box from './Box'

// component vẽ hình tròn
const Circle = (props: ICircleProps) => {
  const { size = 0, height, width, radius, radiusType, children, ...restProps } = props
  return (
    <Box width={size} height={size} radius={size / 2} {...restProps}>
      {children}
    </Box>
  )
}

Circle.displayName = 'View'

export default Circle
