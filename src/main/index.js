'use strict'

import { app, Tray, Menu, path, ipcMain, Notification } from './assets/lib'
import Defs from './assets/constants'
import Utils from './assets/utils'

let tray = null
let masterPassword = null
let portForwarding = null
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

global.Constants = Defs
global.MSG_MASTER_KEY = 'MSG_MASTER_KEY'

const executionNotification = () => {
  return new Notification({ title: Defs.NOTIFICATION_TITLE, body: Defs.NOTIFICATION_BODY }).show()
}

const createMasterPassword = () => {
  if (masterPassword === null) {
    masterPassword = Utils.getMasterPasswordWindow()
  }

  masterPassword.setMenu(null)
  masterPassword.loadURL(`${winURL}#/master-password`)

  masterPassword.once('ready-to-show', () => {
    masterPassword.show()
  })
  masterPassword.on('show', () => {
    masterPassword.focus()
  })
  masterPassword.on('closed', (event) => {
    event.preventDefault()
    executionNotification()
    createTray()
    createPortForwarding()
  })
}

const createPortForwarding = () => {
  if (portForwarding === null) {
    portForwarding = Utils.getPortForwardingBrowserWindow()
  }

  portForwarding.setMenu(null)
  portForwarding.loadURL(`${winURL}#/port-forwarding`)

  portForwarding.on('page-title-updated', event => {
    event.preventDefault()
  })
  portForwarding.on('close', event => {
    event.sender.hide()
    event.preventDefault()
  })
}

const createTray = () => {
  if (Utils.getOs === Defs.STR_MAC) {
    app.dock.hide()
  }

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

app.on('ready', () => {
  createMasterPassword()
})

ipcMain.on(global.MSG_MASTER_KEY, (event, args) => {
  global.Constants.DB_MASTER_KEY = args.DB_MASTER_KEY

  if (global.Constants.DB_MASTER_KEY.length > 0) {
    masterPassword.close()
  }
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
