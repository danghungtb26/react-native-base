import React from 'react'

import { Box, IBoxProps } from '../../base'

interface IProps extends IBoxProps {}

const Divide: React.FC<IProps> = (props) => {
  return <Box height={1} color="gray" width="100%" {...props} />
}

export default Divide
