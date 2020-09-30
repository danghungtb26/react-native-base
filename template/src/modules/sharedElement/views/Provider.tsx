import React from 'react'
import type { View } from 'react-native'
import {
  IConfigAnimated,
  IContextType,
  IPayloadRenderComponent,
  IPropsProvider,
  IPropsRegister,
  IRenderComponent,
} from '../types'
import { ShareElement } from '../utils/ShareElement'
import { ShareItem } from '../utils/ShareItem'
import { componentsDefault, springConfigDefault, timingConfigDefault } from '../values'

export interface ISharedElementContext {
  elements: ShareElement[]
  items: ShareItem[]
  components: IRenderComponent
  configs: IConfigAnimated
  updateSharedView?: (screenId: number, callback: () => void) => void
}

export const SharedElementContext = React.createContext<ISharedElementContext>({
  items: [],
  elements: [],
  components: componentsDefault,
  configs: {
    type: 'timing',
    timing: timingConfigDefault,
    spring: springConfigDefault,
  },
})

interface IStates {
  elements: ShareElement[]
  items: ShareItem[]
}

const defaultInsets = {
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
}

/**
 * component provider
 * lưu danh sách các item được share
 * lưu các element share xem: ShareElement
 */
class SharedElementProvider extends React.Component<IPropsProvider, IStates> {
  static childContextTypes = IContextType

  constructor(props: IPropsProvider) {
    super(props)
    this.state = {
      items: [],
      elements: [],
    }
  }

  getChildContext = () => {
    return {
      registerSharedView: this.registerSharedView,
      unregisterSharedView: this.unregisterSharedView,
      updateSharedView: this.updateSharedView,
      // getInsets: this.getInsets,
      getRenderComponent: this.getRenderComponent,
    }
  }

  /**
   *
   * @param e
   * func này sẽ được gọi từ các thằng con
   * đăng ký với root để lưu nó lại
   * phục vụ cho việc tìm ra các cặp share
   */
  registerSharedView: (param: IPropsRegister<View>) => void = (param) => {
    const { items } = this.state
    const newItem = new ShareItem({ ...param })
    // tìm ra tất cả item có name và type giống với item mới để tạo thành cặp
    const findItemFrom = items.filter((i) => i.name === param.name && i.type === param.type)
    const newElement: ShareElement[] = findItemFrom.map((item) => {
      return new ShareElement({
        from: item.id,
        to: newItem.id,
        type: newItem.type,
        name: newItem.name,
        isMeasured: false,
      })
    })

    this.setState((state) => ({
      items: state.items.concat([newItem]),
      elements: newElement ? state.elements.concat(newElement) : state.elements,
    }))
  }

  /**
   * huỷ đi view được đăng ký
   */
  unregisterSharedView: (props: {
    name?: string
    id: number | string

    screenId: number
  }) => void = ({ id }) => {
    this.setState((state) => ({
      items: state.items.filter((i) => i.id !== id),
      elements: state.elements.filter((i) => i.to !== id && i.from !== id),
    }))
  }

  /**
   * update lại measure của view
   * có thể sẽ lấy ra băngf cách đăng ký thêm thuộc tính id của screen
   */
  updateSharedView = async (screenId: number, callback: () => void) => {
    const { items } = this.state

    const newData = await Promise.all(
      items.map((i) => {
        if (i.screenId !== screenId) {
          return i
        }
        return i.updateMetric({ insets: this.getInsets() }).then(() => {
          return i
        })
      })
    )
    requestAnimationFrame(() => {
      this.setState({ items: newData }, callback)
    })
  }

  /**
   * trong provider chưa tất cả các component có thể shareview
   * có 3 component default View | Image | Text
   * thêm componennt custom bằng cách truyền props vào
   *
   */
  getRenderComponent: (props: IPayloadRenderComponent) => IRenderComponent = () => {
    const { components } = this.props
    return components
  }

  getInsets = () => {
    const { insets = defaultInsets } = this.props
    return insets
  }

  /**
   * func lấy ra tất cả các component đăng ký với shareView
   * merge với 3 component default
   */
  getComponents: () => IRenderComponent = () => {
    const { components } = this.props
    return { ...componentsDefault, ...(components || {}) }
  }

  /**
   * lấy ra config cho animation của shareView
   */
  getDefaultConfigs: () => IConfigAnimated = () => {
    const { config } = this.props
    return config || { type: 'timing', timing: timingConfigDefault, spring: springConfigDefault }
  }

  render() {
    const { children } = this.props
    const { elements, items } = this.state
    return (
      <SharedElementContext.Provider
        value={{
          elements,
          items,
          updateSharedView: this.updateSharedView,
          components: this.getComponents(),
          configs: this.getDefaultConfigs(),
        }}>
        {children}
      </SharedElementContext.Provider>
    )
  }
}

export default SharedElementProvider
