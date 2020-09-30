import type {
  ViewProps,
  TextProps,
  StyleProp,
  TextStyle,
  TextInputProps,
  ViewStyle,
} from 'react-native'
import type React from 'react'
import type Animated from 'react-native-reanimated'

export declare type NumberOrString = number | string

export declare type RadiusType = 'TopRight' | 'TopLeft' | 'BottomRight' | 'BottomLeft'

export declare type ShadowType = 'horizontal' | 'vertical'

export interface ShadowProps {
  /**
   * @android : elevation
   * @ios : shadow
   */
  value?: number
  /**
   * @ios shadow color
   */
  color?: string
  /**
   * @ios
   * shadowOffset (width)
   */
  horizontal?: boolean
  /**
   * @ios
   * shadowOffset (height)
   */
  vertical?: boolean
}

// export interface IBorder
// xem style cua view RN
export interface IBorderProps {
  borderWidth?: number

  borderColor?: string

  borderRightWidth?: number

  borderRightColor?: string

  borderLeftWidth?: number

  borderLeftColor?: string

  borderTopWidth?: number

  borderTopColor?: string

  borderBottomWidth?: number

  borderBottomColor?: string
}

export interface IMarginPaddingProps {
  /**
   * đặt margin cho view
   * [top, bottom, left, right]
   */
  margin?: number | Array<number>

  marginHorizontal?: NumberOrString

  marginVertical?: NumberOrString

  marginTop?: NumberOrString

  marginBottom?: NumberOrString | undefined

  marginLeft?: NumberOrString

  marginRight?: NumberOrString
  /**
   * đăt padding cho view
   * [top, bottom, left, right]
   */
  padding?: number | Array<number>

  paddingHorizontal?: NumberOrString

  paddingVertical?: NumberOrString

  paddingTop?: NumberOrString

  paddingBottom?: NumberOrString

  paddingLeft?: NumberOrString

  paddingRight?: NumberOrString
}

export interface IBoxProps extends Omit<ViewProps, 'style'>, IBorderProps, IMarginPaddingProps {
  style?: StyleProp<ViewStyle> | StyleProp<Animated.AnimateStyle<ViewStyle>>

  refObject?: React.RefObject<any>

  hidden?: boolean

  children?: React.ReactNode
  /**
   * làm cho children nằm giữa view
   * row == false => theo chiều ngang
   * row == true => theo chiều dọc
   */
  center?: Boolean
  /**
   * đặt view theo chiều ngang
   */
  row?: Boolean
  /**
   * làm cho children nằm giữa view
   * row == true => theo chiều ngang
   * row == false => theo chiều dọc
   */
  middle?: Boolean
  /**
   * đặt background cho view
   * nếu đặt shadow thì phải đặt color
   */
  color?: string
  /**
   * đặt width cho view
   */
  width?: NumberOrString | Animated.Adaptable<any>
  /**
   * đặt height cho view
   */
  height?: NumberOrString | Animated.Adaptable<any>
  /**
   * đặt borderradius cho view
   * nếu radius not define => đặt cả 4 góc của view
   */
  radius?: number
  /**
   * mảng chứa các góc muốn đặt radius
   */
  radiusType?: Array<RadiusType>
  /**
   * đặt flex cho view (viewstyle)
   */
  flex?: number
  /**
   * đặt shadow cho view
   * @android : elevation
   * @ios : shadow (xem getShadow)
   */
  shadow?: number
  /**
   * @ios : đặt màu cho shadow (default #000)
   */
  shadowColor?: string
  /**
   * đặt shadow type (horizontal hoặc vertical)
   */
  shadowType?: Array<ShadowType>

  /**
   * có sửa dụng animation hay không
   */
  animted?: 'reanimated' | 'animated' | 'none'

  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'

  overflow?: 'visible' | 'hidden' | 'scroll'

  display?: 'none' | 'flex'

  grow?: number
  shrink?: number
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  basis?: number | string
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

  /**
   * thuoc tinh zindex cua style
   */
  zIndex?: number
}

export interface ICircleProps extends IBoxProps {
  /**
   * kick thuoc hinh tron
   * @require
   */
  size?: number
}

export declare type SizeText = 'small' | 'tiny' | 'medium' | 'normal' | 'large' | 'huge'

export declare type position = 'top' | 'bottom' | 'left' | 'right'

export interface ITextBaseProps extends IBoxProps, TextProps {
  /**
   * kich thuoc chu
   */
  size?: SizeText | number

  /**
   * style text (Override)
   */
  style?: StyleProp<TextStyle>

  /**
   * text hien thi
   * Override
   */
  children?: any

  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

export interface ITextInputBaseProps extends IBoxProps, TextInputProps, ITextBaseProps {
  /**
   * style text (Override)
   */
  style?: StyleProp<TextStyle>

  /**
   * backgroundColor cho input
   *
   */
  backgroundColor?: string
  /**
   * text hien thi
   * Override
   */
  children?: any

  rows?: number
}

export interface IAvatarText {
  /**
   * title props: style cho phần text đó
   * xem ITextBaseProps
   */
  titleProps?: ITextBaseProps
}

export interface IAvatarCircleText extends ICircleProps, IAvatarText {
  /**
   * title muốn hiển thị
   */
  children?: React.ReactText
}

export interface IAvatarBoxText extends IBoxProps, IAvatarText {
  /**
   * title muốn hiển thị
   */
  children?: React.ReactText
}
