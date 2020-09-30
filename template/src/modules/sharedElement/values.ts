import Animated, { Easing } from 'react-native-reanimated'
import type { IRenderComponent } from './types'
import { renderText, renderView } from './views/elements'

export const timingConfigDefault: Animated.TimingConfig = {
  toValue: 0,
  duration: 350,
  easing: Easing.inOut(Easing.ease),
}

export const springConfigDefault: Animated.SpringConfig = {
  ...Animated.SpringUtils.makeDefaultConfig,
}

export const componentsDefault: IRenderComponent = {
  view: {
    renderComponent: renderView,
  },
  text: {
    renderComponent: renderText,
  },
}
