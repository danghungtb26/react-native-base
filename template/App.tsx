/* eslint-disable import/first */
import { enableScreens } from 'react-native-screens'

enableScreens()

import React from 'react'
import { View, NativeModules, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Easing } from 'react-native-reanimated'
import Navigator from './src/navigation'
import { AppProvider } from './src/components'
import { SharedProvider } from './src/modules'

interface IProps {}

interface IState {}

const App: React.FC<IProps> = () => {
  React.useEffect(() => {
    if (NativeModules.RNSplash) {
      setTimeout(() => {
        NativeModules.RNSplash.hide(1)
      }, 1000)
    }
  }, [])

  return (
    <SharedProvider
      config={{
        type: 'timing',
        timing: {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        },
      }}
      components={{}}>
      <AppProvider>
        <SafeAreaProvider>
          <View style={styles.container}>
            <Navigator />
          </View>
        </SafeAreaProvider>
      </AppProvider>
    </SharedProvider>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
