import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from 'src/features/home'
import Detail from 'src/features/detail'
import Panscreen from 'src/features/panscreen'
import Routes from './routes'

const Stack = createStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Home}>
      <Stack.Screen name={Routes.Home} component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name={Routes.Detail}
        component={Detail}
        options={() => {
          return {
            headerShown: false,
            animationEnabled: false,

            cardStyle: {
              backgroundColor: 'transparent',
            },
          }
        }}
      />
      <Stack.Screen name={Routes.Panscreen} component={Panscreen} />
    </Stack.Navigator>
  )
}

export default MainStack
