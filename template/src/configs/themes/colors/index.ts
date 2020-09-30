import darkbase from './dark'
import lightbase from './light'

const colors = {
  ...darkbase,
  ...lightbase,
  /**
   * format
   * hexa: h_${color_code} ex: h_fff : '#fff'
   * rgb: rgb_$(color_code) ex: 'rgb_1_1_1' : 'rbg(1,1,1)'
   * rgba: rgb_${color_code} ex: 'rgb_1_1_1_1' : 'rbg(1,1,1,1)'
   * name: name ex: white: 'white'
   */
  primary: undefined,

  h_ff5722: '#ff5722',
  /**
   * white
   */
  h_ffffff: '#ffffff',
  /**
   * black
   */
  h_000000: '#000000',

  rgba_241_118_18_075: 'rgba(241,118,18,0.75)',
}

export default colors

export const dark = {
  ...colors,
  ...darkbase,
}

export const light = {
  ...colors,
  ...lightbase,
}
