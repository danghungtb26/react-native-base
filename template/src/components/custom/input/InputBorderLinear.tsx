import React from 'react'
import { BaseInput, ITextInputBaseProps, Linear } from 'src/components/base'
import { useColors } from 'src/components/base/provider/Language'

interface IProps extends ITextInputBaseProps {}

const InputBorderLinear: React.FC<IProps> = ({ radius, borderWidth, ...restprops }) => {
  const colors = useColors()
  return (
    <Linear
      radius={radius}
      padding={borderWidth}
      colors={[colors.h_ff5722, colors.rgba_241_118_18_075]}>
      <BaseInput radius={radius} backgroundColor="#fff" size={14} padding={[6, 8]} {...restprops} />
    </Linear>
  )
}

export default InputBorderLinear
