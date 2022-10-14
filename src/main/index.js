'use strict'

import {
  app,
  Tray,
  Menu,
  path
 } from './assets/lib'
import Defs from './assets/constants'
import Utils from './assets/utils'

require('@electron/remote/main').initialize()

let tray = null
let portForwarding = null
let winURL = ''

if (Defs.APP_IS_PRODUCTION) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
  winURL = `file://${__dirname}/index.html`
} else {
  winURL = `http://localhost:9082/index.html`
}

global.Constants = Defs

function createPortForwarding () {
  if (portForwarding === null) {
    portForwarding = Utils.getPortForwardingBrowserWindow()
  }
  portForwarding.loadURL(`${winURL}#/port-forwarding`)

  portForwarding.on('page-title-updated', event => {
    event.preventDefault()
  })

  portForwarding.on('close', event => {
    event.sender.hide()
    event.preventDefault()
  })
}

function createTray () {
  if (tray === null) {
    tray = new Tray(path.join(__static, path.sep, Defs.ICON_APP))
  }

  const config = [
    {
      label: Defs.MENU_PORT_FORWARDING,
       click: () => {
        portForwarding.show()
      }
    },
    {
      type: Defs.TYPE_SEPARATOR
    },
    { label: Defs.MENU_QUIT,
      click: () => {
        if (portForwarding) {
          portForwarding = null
        }

        app.exit()
      }
    }
  ]

  if (tray && config) {
    tray.setContextMenu(Menu.buildFromTemplate(config))
  }
}

if (!app.requestSingleInstanceLock()) {
  app.exit()
}

if (Utils.getOsFromMain() === Defs.STR_MAC) {
  app.dock.hide()
}

app.on('ready', () => {
  createTray()
  createPortForwarding()
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
