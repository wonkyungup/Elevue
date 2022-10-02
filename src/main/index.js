'use strict'

import {
  app,
  Tray,
  Menu,
  path,
  BrowserWindow
 } from './assets/lib'
import Defs from './assets/constants'
import Utils from './assets/utils'

let tray = null
let portForwading = null
let winURL = ''

if (Defs.APP_IS_PRODUCTION) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
  winURL = `file://${__dirname}/index.html`
} else {
  winURL = `http://localhost:9082/index.html`
}

if (!app.requestSingleInstanceLock()) {
  app.exit()
}

function createPortForwading () {
  portForwading = new BrowserWindow({
    frame: true,
    title: Defs.MENU_PORT_FORWARDING,
    minWidth: 700,
    width: 700,
    height: 400,
    minHeight: 250,
    useContentSize: true,
    center: true,
    show: false,
    webPreferences: {
      ...Utils.getCommonWebPreferences()
    }
  })

  // settings
  portForwading.setMenu(null)
  portForwading.loadURL(`${winURL}#/port-forwarding`)

  // event
  portForwading.on('page-title-updated', event => {
    event.preventDefault()
  })
  portForwading.on('close', event => {
    event.sender.hide()
    event.preventDefault()
  })
}

app.on('ready', () => {
  createPortForwading()

  if (Defs.ICON_APP) {
    app.dock.hide()
  }

  tray = new Tray(path.join(__static, path.sep, Defs.ICON_APP))
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: Defs.MENU_PORT_FORWARDING,
       click: () => {
        portForwading.show()
      }
    },
    {
      type: Defs.TYPE_SEPARATOR
    },
    { label: Defs.MENU_QUIT,
      click: () => {
        if (portForwading) {
          portForwading = null
        }

        app.exit()
      }
    }
  ]))
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
