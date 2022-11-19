import SessionListener from './SessionListener'
import { Client } from 'ssh2'
import { config } from './config.js'

const SSH = Client

export default class Session {
    constructor (listener, session) {
        this._ssh = null
        this._server = null
        this._sessionListener = listener
        this._session = session
        this._stusConnect = SessionListener.MSG_SESSION_DISCONNECTED
        this._errConnectMsg = ''
    }

    onSSHError (action, err) {
        if (err) {
            const message = `[SSH_ERR] ${action}: ${err.message}`
            console.log(message)
            this._sessionListener.emit(SessionListener.MSG_SESSION_ERROR, this, message)
        }
    }

    openTunnel () {
        this._ssh = new SSH()
        this._sessionListener.emit(SessionListener.MSG_SESSION_CONNECT_ATTEMPT, this)
    }

    async doSSHConnect () {
        const session = this._session
        const ssh = this._ssh

        ssh.on('end', (err) => this.onSSHError('CONN END', err))
        ssh.on('close' ,(err) => this.onSSHError('CONN CLOSE', err))
        ssh.on('error', (err) => this.onSSHError('CONN ERROR', err))

        ssh.on('ready', () => this.onExecTunnel())
        ssh.on('tcp connection', (info, accept, reject) => this.onSSHTcpConnection(info, accept, reject))

        const options = {
            host: session.host,
            port: session.port,
            username: session.username,
            password: session.password,
            algorithms: { ...config.algorithms }
        }

        try {
            ssh.connect(options)
        } catch (err) {
            this.onSSHError('FAILED TO CONN', err)
        }
    }

    async disconnect () {
        if (this._ssh) await this._ssh.end()
        this._ssh = null
        this._server = null
    }

    onSSHTcpConnection () {
        const session = this._session

        if (session) {
            const stream = accept()

            stream.on('error', (err) => console.log(`TCP :: ERROR ${err}`))
            stream.on('close', (err) => console.log(`TCP :: CLOSE ${err}`))
            stream.pause()

            const socket = net.connect(session['destination_port'], session['destination_host'], () => {
                stream.pipe(socket)
                socket.pipe(stream)
                stream.resume()
            })
        }
    }

    onExecTunnel () {
        console.log('onExecTunnel')
        console.log(this)
    }
}