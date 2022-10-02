export default class Constants {
    static ICON_PLUS = 'mdi-plus'
    static ICON_ACCOUNT = 'mdi-account'
    static ICON_ACCOUNT_HEART = 'mdi-account-heart'
    static ICON_SERVER = 'mdi-server'
    static ICON_ARROW_RIGHT_BOLD = 'mdi-arrow-right'
    static ICON_ETHERNET = 'mdi-ethernet'
    static ICON_ARROW_COLLAPSE_RIGHT = 'mdi-arrow-collapse-right'
    static ICON_ARROW_LEFT = 'mdi-arrow-left'

    static DIRECTION_LOCAL = {
        TARGET: 'local',
        CONTENT: "Local forwarding lets you access a remote server's listening port as though it were local.",
        GUIDE: "This port will be open on the local (current) machine to forward traffic to the remote host."
    }
    static DIRECTION_REMOTE = {
        TARGET: 'remote',
        CONTENT: "Remote forwarding opens a port on the remote machine and forwards connections to the local (current) host.",
        GUIDE: "Select a host where the port will be open. The traffic from this port will be forwarded to the destination host."
    }
    static DIRECTION_SOCKSV5 = {
        TARGET: 'socksv5',
        CONTENT: "Dynamic port forwarding turns Toolus into a SOCKSsv5 proxy server. SOCKsv5 proxy server is a protocol to request any connection via a remote host.",
        GUIDE: "This port will be open on the local (current) device. And it will receive the traffic."
    }

    static STR_DIRECTION = 'direction'
    static STR_STEP_1 = 'step1' // create session drawer
    static STR_STEP_2 = 'step2'
    static STR_STEP_3 = 'step3'
}
