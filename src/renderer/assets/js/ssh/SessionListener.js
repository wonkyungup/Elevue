import * as EventEmitter from 'events'

export default class SessionListener extends EventEmitter {
    static MSG_SESSION_CONNECT_ATTEMPT = 'MSG_SESSION_CONNECT_ATTEMPT'
    static MSG_SESSION_CONNECTED = 'MSG_SESSION_CONNECTED'
    static MSG_SESSION_DISCONNECTED = 'MSG_SESSION_DISCONNECTED'
    static MSG_SESSION_ERROR = 'MSG_SESSION_ERROR'

    constructor () {
        super()
        this._useless = false
    }
}
