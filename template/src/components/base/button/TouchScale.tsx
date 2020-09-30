/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import {
  TapGestureHandler,
  State,
  GestureHandlerGestureEventNativeEvent,
} from 'react-native-gesture-handler'
import Animated, { startClock, stopClock } from 'react-native-reanimated'

const { event, cond, set, eq, call, block, spring, Value, Clock, and } = Animated

const zoomScale = 0.95

export interface IPropsTouchScale {
  children: React.ReactNode
  onPress?: () => void
  zoomScale?: number
}

class TouchScale extends PureComponent<IPropsTouchScale> {
  zoomScale: number = this.props.zoomScale || zoomScale

  state_spring = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(1),
    time: new Value(0),
  }

  clock = new Clock()

  config = {
    damping: 28,
    mass: 0.01,
    stiffness: 300,
    overshootClamping: false,

    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(this.zoomScale),
  }

  stateGesture = new Animated.Value(State.UNDETERMINED)

  tapgestureEvent = event([
    {
      nativeEvent: ({ state }: GestureHandlerGestureEventNativeEvent) => {
        return block([
          set(this.stateGesture, state),
          spring(this.clock, this.state_spring, this.config),

          cond(eq(this.stateGesture, State.END), [
            stopClock(this.clock),
            set(this.state_spring.finished, 0),
            //   set(this.state_spring.position, 0.5),
            set(this.state_spring.velocity, 0),
            set(this.state_spring.time, 0),
            set(this.config.toValue, 1),
            startClock(this.clock),
            spring(this.clock, this.state_spring, this.config),
            //   cond(this.state_spring.finished, set(this.state_spring.finished, 0)),
          ]),
          cond(and(this.state_spring.finished, eq(this.state_spring.position, 1)), [
            stopClock(this.clock),
            set(this.config.toValue, this.zoomScale),
            call([], () => {
              const { onPress } = this.props
              if (typeof onPress === 'function') {
                onPress()
              }
            }),
          ]),
        ])
      },
    },
  ])

  constructor(props: IPropsTouchScale) {
    super(props)

    this.zoomScale = props.zoomScale || zoomScale
  }

  render() {
    const { children } = this.props
    return (
      <TapGestureHandler
        onGestureEvent={this.tapgestureEvent}
        onHandlerStateChange={this.tapgestureEvent}>
        <Animated.View
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={{ transform: [{ scale: this.state_spring.position }] }}>
          {children}
        </Animated.View>
      </TapGestureHandler>
    )
  }
}

export default TouchScale
