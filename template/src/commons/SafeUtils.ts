import { Platform, NativeModules, StatusBar } from 'react-native'

const { GetSizeManager, DeviceInfo } = NativeModules

// kiểm tra xem có phải là iphoneX hay không
export const isIphoneX = () => {
  return Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated
}

const defaultTop = isIphoneX() ? 44 : 20

const defaultTopWithoutMarin = isIphoneX() ? 34 : 20

const defaultBottom = isIphoneX() ? 34 : 0

const offset = {
  top: Platform.OS === 'android' ? StatusBar.currentHeight : GetSizeManager?.top || defaultTop,
  top_without_margin:
    Platform.OS === 'android'
      ? StatusBar.currentHeight ?? defaultTopWithoutMarin
      : GetSizeManager?.top - (isIphoneX() ? 12 : 0) || defaultTopWithoutMarin,
  bottom: GetSizeManager?.bottom || defaultBottom,
}

// func lấy ra khoảng cách safe area view
export const getOffset = () => {
  return offset
}
