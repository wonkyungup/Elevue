import Defs from './constants'
import { os } from './lib'

export default class Utils {
    static getCommonWebPreferences () {
        return {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            backgroundThrottling: false
        }
    }

    static getOsFromMain () {
        switch(os.platform()) {
            case Defs.STR_LINUX:
            case Defs.STR_AIX:
            case Defs.STR_SUNOS:
            case Defs.STR_NETBSD:
            case Defs.STR_OEPNBSD:
            case Defs.STR_FREEBSD:
            case Defs.STR_CYGWIN:
            case Defs.STR_ANDROID:
                return Defs.STR_LINUX.Defs.STR_LINUX.replace(/\b[a-z]/, value => value.toUpperCase())
            case Defs.STR_DARWIN:
                return Defs.STR_MAC
            case Defs.STR_WIN32:
            default:
                return Defs.STR_WINDOWS
            }
    }
}