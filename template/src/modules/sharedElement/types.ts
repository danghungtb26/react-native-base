import type React from 'react'

import type { View } from 'react-native'
import type Animated from 'react-native-reanimated'
import type { ShareItem } from './utils'

export interface IShareElementProvider {}

export interface IWrapperComponent {}

export interface IWrapperFromComponent extends IWrapperComponent {}

export interface IWrapperToComponent extends IWrapperComponent {}

export interface IPayloadRenderComponent {
  progress: Animated.Adaptable<any>
  to?: ShareItem
  from?: ShareItem
  type?: string
  name?: string
  keyview: string
}

export interface IPropsRegister<T> {
  view: React.RefObject<T>
  setOpacity: (value: 0 | 1) => void
  children: React.ReactNode
  name: string
  id: number
  screenId: number
  type: string | 'View' | 'Image' | 'Text'
  renderComponent?: (props: IPayloadRenderComponent) => React.ReactNode
}

export interface SCT<T extends View> {
  registerSharedView: (param: IPropsRegister<T>) => void
  unregisterSharedView: (param: { name?: string; id: number | string; screenId: number }) => void
}

export interface USV {
  updateSharedView: (id: number, callback: () => void) => void
}

export interface ST {
  getRootId: () => number
}

export const IShareUpdate: USV = {
  updateSharedView: () => {},
}

export const IShareTransitioner: ST = {
  getRootId: () => {
    return 0
  },
}

export const IShareContextType: SCT<any> = {
  registerSharedView: () => {},
  unregisterSharedView: () => {},
}

export interface IInsets {
  top: number
  bottom: number
  right: number
  left: number
}

export const IInsetsContext: {
  getInsets: () => IInsets
} = {
  getInsets: () => ({ top: 0, bottom: 0, right: 0, left: 0 }),
}

export interface IRenderComponent {
  [x: string]: {
    renderComponent: (props: IPayloadRenderComponent) => React.ReactNode
  }
}

export type IReturnComponent =
  | {
      renderComponent: (props: IPayloadRenderComponent) => React.ReactNode
    }
  | null
  | undefined

export const IRender: {
  getRenderComponent: () => IReturnComponent
} = {
  getRenderComponent: () => undefined,
}

export const IContextType = {
  ...IShareContextType,
  ...IShareUpdate,
  // ...IInsetsContext,
  ...IRender,
}

export interface IConfigAnimated {
  type: 'spring' | 'timing'
  timing: Omit<Animated.TimingConfig, 'toValue'>
  spring?: Animated.SpringConfig
}

export interface IPropsProvider {
  insets?: {
    top: number
    right: number
    left: number
    bottom: number
  }
  components: IRenderComponent
  config?: IConfigAnimated
}
