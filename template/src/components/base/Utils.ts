import type { ViewStyle, StyleProp, ShadowStyleIOS, ColorValue } from 'react-native'
import { capitalize } from 'lodash'
import { sizes } from '../../configs'
import type {
  RadiusType,
  ShadowProps,
  SizeText,
  IMarginPaddingProps,
  position,
  IBorderProps,
} from './Types'

/**
 * func tính toán đê trả về style radius
 * @param value
 * @param type: mảng bao gồm các góc muốn bo tròn
 */
export const getRadius: (value?: number, type?: Array<RadiusType>) => StyleProp<ViewStyle> = (
  value,
  type
) => {
  /**
   * nếu @value ko được define thì không trả về gì cả
   */
  if (!value) return {}

  /**
   * nếu @type không được define hoặc rỗng => trả về borderradius
   */
  if (!type || type.length <= 0)
    return {
      borderRadius: value,
    }
  const state: StyleProp<ViewStyle> = {}

  /**
   * lọc ra các thuộc tính dựa vào mảng type đưa vào
   */
  if (type.includes('BottomLeft')) state.borderBottomLeftRadius = value
  if (type.includes('BottomRight')) state.borderBottomRightRadius = value
  if (type.includes('TopLeft')) state.borderTopLeftRadius = value
  if (type.includes('TopRight')) state.borderTopRightRadius = value

  return state
}

/**
 * func tính toán trả về shadow
 * @param param0 xem type ShadowProps
 */
export const getShadow: (
  param: ShadowProps
) => StyleProp<ShadowStyleIOS & { elevation?: number }> = ({
  value,
  color,
  horizontal,
  vertical = true,
}) => {
  if (!value) return {}

  return {
    elevation: value,
    shadowColor: color || '#000',
    shadowOffset: {
      width: horizontal ? value * 0.5 : 0,
      height: vertical ? value * 0.5 : 0,
    },
    shadowRadius: 1.5,
    shadowOpacity: 0.3,
  }
}

/**
 * func tính toán trả về shadow text
 * @param param0 xem type ShadowProps
 */
export const getShadowText: (
  param: ShadowProps
) => {
  textShadowColor?: ColorValue
  textShadowOffset?: { width: number; height: number }
  textShadowRadius?: number
} = ({ value, color, horizontal, vertical = true }) => {
  if (!value) return {}

  return {
    textShadowColor: color || '#000',
    textShadowOffset: {
      width: horizontal ? value * 0.5 : 0,
      height: vertical ? value * 0.5 : 0,
    },
    textShadowRadius: value * 0.8,
  }
}

/**
 * func tinh toan tra ve margin hoac padding (vì 2 cái này tương tự nhau, khác về cách dùng)
 * @param value
 */
export const getMargin: (
  value?: number | Array<number>,
  type?: 'margin' | 'padding'
) => Record<string, any> = (value, type = 'margin') => {
  if (typeof value === 'number') {
    return {
      [type]: value,
    }
  }

  if (Array.isArray(value)) {
    const state: Record<string, any> = {}

    if (value.length <= 1 && value.length > 0) {
      state[`${type}`] = Number(value[0])
    }

    if (value.length < 4 && value.length > 1) {
      if (typeof value[0] === 'number') {
        state[`${type}Vertical`] = Number(value[0])
      }

      if (typeof value[1] === 'number') {
        state[`${type}Horizontal`] = Number(value[1])
      }
    } else {
      if (typeof value[0] === 'number') {
        state[`${type}Top`] = Number(value[0])
      }

      if (typeof value[1] === 'number') {
        state[`${type}Bottom`] = Number(value[1])
      }

      if (typeof value[2] === 'number') {
        state[`${type}Left`] = Number(value[2])
      }

      if (typeof value[3] === 'number') {
        state[`${type}Right`] = Number(value[3])
      }
    }

    return state
  }

  return {}
}

/**
 * func trả về margin và padding đồng thời cho các view, text, input
 * @param param0 xem  IMarginPaddingProps
 */
export const getMarginPaddingStyle: (props: IMarginPaddingProps) => StyleProp<ViewStyle> = ({
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
}) => {
  return {
    ...getMargin(margin, 'margin'),
    ...(marginHorizontal ? { marginHorizontal } : {}),
    ...(marginVertical ? { marginVertical } : {}),
    ...(marginTop ? { marginTop } : {}),
    ...(marginBottom ? { marginBottom } : {}),
    ...(marginLeft ? { marginLeft } : {}),
    ...(marginRight ? { marginRight } : {}),
    ...getMargin(padding, 'padding'),
    ...(paddingHorizontal ? { paddingHorizontal } : {}),
    ...(paddingVertical ? { paddingVertical } : {}),
    ...(paddingTop ? { paddingTop } : {}),
    ...(paddingBottom ? { paddingBottom } : {}),
    ...(paddingRight ? { paddingRight } : {}),
    ...(paddingLeft ? { paddingLeft } : {}),
  }
}

/**
 * func get fontsize
 * @size xem SizeText
 */
export const getFontSize: (size: SizeText | number) => { fontSize?: number } = (size) => {
  if (typeof size === 'number')
    return {
      fontSize: size,
    }

  if (typeof size === 'string') {
    const getSize = sizes[size]
    if (typeof getSize === 'number') {
      return {
        fontSize: getSize,
      }
    }
  }

  return {}
}

/**
 * func lay ra thông tin border
 * bao gồm width, height
 * type position
 */
export const getBorderWithType: (props: {
  width?: number
  color?: string
  type?: position | undefined
}) => Record<string, any> = ({ width, color, type }) => {
  /**
   * nếu @width không phải là số thì ko có style
   */
  if (typeof width !== 'number') return {}

  const state: Record<string, any> = {
    [`border${capitalize(type) || ''}Width`]: width,
    [`border${capitalize(type) || ''}Color`]: color,
  }

  return state
}

/**
 * nhận vào thuộc tính tyle mong muốn
 *
 * @param param0 xem IBorderProps
 *
 * trả về thông tin border
 */
export const getBorder: (props: IBorderProps) => StyleProp<ViewStyle> = ({
  borderWidth,
  borderColor,
  borderTopColor,
  borderTopWidth,
  borderRightWidth,
  borderRightColor,
  borderLeftWidth,
  borderLeftColor,
  borderBottomWidth,
  borderBottomColor,
}) => {
  return {
    ...getBorderWithType({ width: borderWidth, color: borderColor }),
    ...getBorderWithType({ width: borderTopWidth, color: borderTopColor, type: 'top' }),
    ...getBorderWithType({ width: borderBottomWidth, color: borderBottomColor, type: 'bottom' }),
    ...getBorderWithType({ width: borderRightWidth, color: borderRightColor, type: 'right' }),
    ...getBorderWithType({ width: borderLeftWidth, color: borderLeftColor, type: 'left' }),
  }
}
