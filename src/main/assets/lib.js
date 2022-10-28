import { app, Tray, Menu, BrowserWindow, ipcMain, Notification } from 'electron'
import path from 'path'
import os from 'os'

require('@electron/remote/main').initialize()

export {
    app,
    Tray,
    Menu,
    BrowserWindow,
    path,
    os,
    ipcMain,
    Notification
}
