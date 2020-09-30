import type { ParamListBase, RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'

export type navigationProps = StackNavigationProp<ParamListBase, string>

export type routeProps = RouteProp<{ [x: string]: any }, string>

export type navigationCustomProps = {
  navigation?: navigationProps
  route?: routeProps
}

export interface RefObject<T> {
  readonly current: T | null
}
