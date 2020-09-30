import React from 'react'
import { Appearance } from 'react-native'
import I18n, { setI18nConfig } from 'src/configs/i18n'
// @ts-ignore
import I18njs from 'i18n-js'
import * as RNLocalize from 'react-native-localize'
// @ts-ignore
import { colors as colorConfig } from 'src/configs/index'
import { dark, light } from 'src/configs/themes/colors'

interface IStates {
  i18n: typeof I18njs
  colors: typeof colorConfig
}

export const AppContext = React.createContext<IStates>({
  i18n: I18n,
  colors: Appearance.getColorScheme() === 'dark' ? dark : light,
})

export const useI18n: () => typeof I18njs = () => {
  const { i18n } = React.useContext(AppContext)
  return i18n
}

export const useColors: () => typeof colorConfig = () => {
  const { colors: color } = React.useContext(AppContext)
  return color
}

export class AppProvider extends React.Component<{ children: React.ReactNode }, IStates> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = {
      i18n: I18n,
      colors: Appearance.getColorScheme() === 'dark' ? dark : light,
    }
  }

  componentDidMount() {
    setI18nConfig((i18n: typeof I18njs) => {
      this.setState({ i18n })
    })
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
    Appearance.addChangeListener(this.handleColorChange)
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
    Appearance.removeChangeListener(this.handleColorChange)
  }

  handleColorChange = ({ colorScheme }: Appearance.AppearancePreferences) => {
    this.setState({ colors: colorScheme === 'dark' ? dark : light })
  }

  handleLocalizationChange = () => {
    setI18nConfig((i18n: typeof I18njs) => {
      this.setState({ i18n })
    })
  }

  render() {
    const { children } = this.props
    const { i18n, colors } = this.state
    return <AppContext.Provider value={{ i18n, colors }}>{children}</AppContext.Provider>
  }
}
