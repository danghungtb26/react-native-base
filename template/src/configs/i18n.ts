import I18n from 'i18n-js'
import * as RNLocalize from 'react-native-localize'
import en from './locales/en'
import vi from './locales/vi'
// const locales2 = RNLocalize.getLocales()

let currentLocale = 'vi'

export const getCurrentLocale = () => {
  return currentLocale
}

const locales = [
  { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
  { countryCode: 'VN', languageTag: 'vi-VN', languageCode: 'vi', isRTL: false },
  { countryCode: 'JP', languageTag: 'ja-JP', languageCode: 'ja', isRTL: false },
  { countryCode: 'KR', languageTag: 'ko-KR', languageCode: 'ko', isRTL: false },
]

export const setI18nConfig = (callback?: Function) => {
  const find_locale = RNLocalize.getLocales()[0]

  const index = locales.findIndex((i) => i.languageCode === find_locale.languageCode)

  let locale = locales[1]

  if (index >= 0) locale = locales[index]

  I18n.defaultLocale = 'en-US'
  currentLocale = locale.languageCode
  I18n.locale = locale.languageTag

  I18n.fallbacks = true
  I18n.translations = {
    vi,
    en,
  }

  if (typeof callback === 'function') callback(I18n)
}

export const changeLocale = (callback?: Function) => {
  const find_locale = RNLocalize.getLocales()[0]

  const index = locales.findIndex((i) => i.languageCode === find_locale.languageCode)

  let locale = locales[1]

  if (index >= 0) locale = locales[index]

  I18n.locale = locale.languageTag

  if (typeof callback === 'function') callback(I18n)
}

export default I18n
