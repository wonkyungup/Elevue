import { path, app } from './lib'

export default class Constants {
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
    static STR_LOCAL = 'local'
    static STR_REMOTE = 'remote'
    static STR_SOCKSV5 = 'socksv5'
    static STR_TABLE_STYLE_AUTO = 'Auto'
    static STR_TABLE_STYLE_COL12 = 'Col-12'
    static STR_TABLE_STYLE_COL6 = 'Col-6'
    static STR_TABLE_STYLE_COL4 = 'Col-4'
    static STR_TABLE_STYLE_COL2 = 'Col-2'

    static ICON_APP = '16x16.png'
    static ICON_PLUS = 'mdi-plus'
    static ICON_ACCOUNT = 'mdi-account'
    static ICON_ARROW_COLLAPSE_RIGHT = 'mdi-arrow-collapse-right'
    static ICON_ARROW_LEFT = 'mdi-arrow-left'
    static ICON_SERVER = 'mdi-server'
    static ICON_SERVER_SECURITY = 'mdi-server-security'
    static ICON_CLOUD = 'mdi-cloud'
    static ICON_ARROW_RIGHT_CIRCLE = 'mdi-arrow-right-circle'
    static ICON_ALPHA_L_BOX = 'mdi-alpha-l-box'
    static ICON_ALPHA_R_BOX = 'mdi-alpha-r-box'
    static ICON_ALPHA_S_BOX = 'mdi-alpha-s-box'
    static ICON_CONNECTION = 'mdi-connection'
    static ICON_CARD_TEXT = 'mdi-card-text'
    static ICON_CARD_REMOVE = 'mdi-card-remove'
    static ICON_CANCEL = 'mdi-cancel'

    static DRAWER_DIRECTION_PAGE = 0
    static DRAWER_SOURCE_PAGE = 1
    static DRAWER_SERVER_PAGE = 2
    static DRAWER_DESTINATION_PAGE = 3

    static DB_NAME = 'database.db'
    static DB_PATH = path.join(app.getPath('userData'), path.sep, Constants.DB_NAME.split('.')[0])
    static DB_FULL_PATH = path.join(Constants.DB_PATH, path.sep, Constants.DB_NAME)
    static DB_VERSION = 4
    static DB_MASTER_KEY = ''

    static SETUP_NAME = 'setup.ini'
}
