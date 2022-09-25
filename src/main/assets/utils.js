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
            case 'linux':
            case 'aix':
            case 'sunos':
            case 'netbsd':
            case 'openbsd':
            case 'freebsd':
            case 'cygwin':
            case 'android':
                return 'Linux'
            case 'darwin':
                return 'Mac'
            case 'win32':
            default:
                return 'Windows'
            }
    }
}