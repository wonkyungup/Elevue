export default class Constants {
    static ICON_PLUS = 'mdi-plus'
    static ICON_ACCOUNT = 'mdi-account'
    static ICON_ACCOUNT_HEART = 'mdi-account-heart'
    static ICON_SERVER = 'mdi-server'
    static ICON_ARROW_RIGHT_BOLD = 'mdi-arrow-right'
    static ICON_ETHERNET = 'mdi-ethernet'
    static ICON_ARROW_COLLAPSE_RIGHT = 'mdi-arrow-collapse-right'

    static DIRECTION_LOCAL = {
        TARGET: 'local',
        CONTENT: "Local forwarding lets you access a remote server's listening port as though it were local."
    }
    static DIRECTION_REMOTE = {
        TARGET: 'remote',
        CONTENT: "Remote forwarding opens a port on the remote machine and forwards connections to the local (current) host."
    }
    static DIRECTION_SOCKSV5 = {
        TARGET: 'socksv5',
        CONTENT: "Dynamic port forwarding turns Toolus into a SOCKSsv5 proxy server. SOCKsv5 proxy server is a protocol to request any connection via a remote host."
    }
}
