import Utils from './utils'

export default class Constants {
    static ICON_APP = '16x16.png'

    static OS_WINDOW = Utils.getOsFromMain() === Constants.STR_WINDOWS
    static OS_MAC = Utils.getOsFromMain() === Constants.STR_MAC

    static APP_IS_PRODUCTION = process.env.NODE_ENV !== 'development'

    static TYPE_SEPARATOR = 'separator'
    static MENU_PORT_FORWARDING = 'Port Forwarding'
    static MENU_QUIT = 'Quit'

    static STR_LINUX = 'linux'
    static STR_AIX = 'aix'
    static STR_SUNOS = 'sunos'
    static STR_NETBSD = 'netbsd'
    static STR_OEPNBSD = 'openbsd'
    static STR_FREEBSD = 'freebsd'
    static STR_CYGWIN = 'cygwin'
    static STR_ANDROID = 'android'
    static STR_DARWIN = 'darwin'
    static STR_WIN32 = 'win32'
    static STR_MAC = 'Mac'
    static STR_WINDOWS = 'Windows'
}