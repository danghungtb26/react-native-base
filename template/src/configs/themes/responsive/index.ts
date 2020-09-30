import { Dimensions, Platform, PixelRatio } from 'react-native'
import { getOffset } from '../../../commons'

const { width, height } = Dimensions.get('window')

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height - getOffset().top - getOffset().bottom

// based on iPhoneX's scale
const wscale: number = SCREEN_WIDTH / 375
const hscale: number = SCREEN_HEIGHT / (812 - 78)

/**
 * func tinh toán lại width theo kich thước của từng device
 * @param size
 */
export const widthLize: (size: number) => number = (size) => {
  const newSize = size * wscale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * func tính toán lại height theo kích thước của device
 * @param size
 */
export const heightLize: (size: number) => number = (size) => {
  const newSize = size * hscale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * func tinhs toan fontsize theo kích thước của device
 */

export const fontSizeLine: (size: number) => number = (size) => {
  return Math.round(size * hscale)
}
