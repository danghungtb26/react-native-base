import React from 'react'
import { BaseInput, ITextInputBaseProps } from 'src/components/base'

interface IProps extends ITextInputBaseProps {}

const SearchInput: React.FC<IProps> = ({ radius, ...restprops }) => {
  return (
    <BaseInput radius={radius} backgroundColor="#fff" size={14} padding={[6, 8]} {...restprops} />
  )
}

export default SearchInput
