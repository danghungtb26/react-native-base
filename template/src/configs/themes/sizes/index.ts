import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const margin = 24

export default {
  width,
  height,
  // phục vụ cho fontsize
  tiny: 8,
  small: 10,
  medium: 12,
  normal: 14,
  large: 16,
  huge: 20,

  padding: margin,

  margin,

  margin1_2: margin / 2,

  margin1_3: margin / 3,

  margin1_4: margin / 4,

  margin1_6: margin / 6,

  margin1_8: margin / 8,
}
