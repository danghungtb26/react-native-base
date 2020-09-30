/* eslint-disable no-undef */
const showLog = 2

const showWarn = 2

const theConsole = {}
theConsole.log = console.log

theConsole.warn = console.warn

if (!__DEV__) {
  console.log = (...arg) => {
    if (showLog === 1) {
      theConsole.log(...arg)
    }
  }
}

console.warn = (...arg) => {
  if (showWarn === 1) {
    theConsole.warn(...arg)
  }
}
