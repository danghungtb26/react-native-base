import { Alert, AlertButton, AlertOptions } from 'react-native'

export const showAlert: (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions
) => void = (...arg) => Alert.alert(...arg)

export const showTestAlert: () => void = () => {}
