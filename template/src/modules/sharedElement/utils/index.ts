import Animated, {
  block,
  clockRunning,
  set,
  startClock,
  stopClock,
  Value,
  cond,
  timing,
  and,
  call,
} from 'react-native-reanimated'
import type { ShareItem } from './ShareItem'

/**
 *
 * @param items
 * @param id
 * @param name
 * func này sẽ tìm ra item đầu tiên có id và name trung với id và name truyền vào
 * vì trên 1 màn hình các share view sẽ có name khác nhau + id là timestamp => căp đối số duy nhất
 */
export const findItemByIdAndName = (items: ShareItem[], id?: number, name?: string) => {
  return items.find((i) => i.id === id && i.name === name)
}

export function runTiming({
  clock,
  config,
  value,
  callback,
}: {
  clock: any
  config: Animated.TimingConfig
  value: number
  callback: () => void
}) {
  const state = {
    finished: new Value(1),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  return block([
    cond(clockRunning(clock), 0, [
      cond(state.finished, startClock(clock)),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
    ]),
    timing(clock, state, config),
    cond(and(state.finished, clockRunning(clock)), [
      set(state.finished, 0),
      call([], () => {
        callback()
      }),
      stopClock(clock),
    ]),
    state.position,
  ])
}

// export const findItemById = (items: ShareItem[], id?)

// export const checkItemByIdAndScreenId = ({ items })

export * from './ShareElement'

export * from './ShareItem'
