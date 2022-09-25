import Utils from './utils'

export default class Constants {
    static ICON_APP = '16x16.png'

    static OS_WINDOW = Utils.getOsFromMain() === 'Windows'
    static OS_MAC = Utils.getOsFromMain() === 'Mac'

    static APP_IS_PRODUCTION = process.env.NODE_ENV !== 'development'

    static TYPE_SEPARATOR = 'separator'
    static MENU_PORT_FORWARDING = 'Port Forwarding'
    static MENU_QUIT = 'Quit'
}