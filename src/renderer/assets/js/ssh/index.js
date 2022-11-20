import SessionListener from './SessionListener'
import { Client } from 'ssh2'
import { config } from './config.js'
import * as remote from '@electron/remote'
import Security from '@/assets/js/security'

const Defs = remote.getGlobal('Constants')
const SSH = Client
const net = require('net')

export default class Session {
    constructor (listener, session) {
        this._ssh = null
        this._server = null
        this._sessionListener = listener
        this._session = session
        this._id = session['id']
        this._stusConnect = SessionListener.MSG_SESSION_DISCONNECTED
        this._isConnect = false
        this._alert = {
            isShow: false,
            icon: 'mdi-read',
            content: '',
            type: 'info'
        }
    }

    static allocate (listener, session) {
        session['password'] = Security.decodeData(session['password'])
        return new Session(listener, session)
    }

    onSSHError (action, err) {
        if (err) {
            const message = `[SSH_ERR] ${action}: ${err.message}`
            console.log(message)
            this._sessionListener.emit(SessionListener.MSG_SESSION_ERROR, this, err.message)
        }
    }

    doExecTunnel () {
        if (!this._ssh) this._ssh = new SSH()
        this._sessionListener.emit(SessionListener.MSG_SESSION_CONNECT_ATTEMPT, this)
    }

    doSSHConnect () {
        const session = this._session
        const ssh = this._ssh

        ssh.on('ready', () => this.onExecTunnel())
        ssh.on('tcp connection', (info, accept, reject) => this.onSSHTCPConnect(info, accept, reject))

        ssh.on('end', (err) => this.onSSHError('CONNECT END', err))
        ssh.on('close' ,(err) => this.onSSHError('CONNECT CLOSE', err))
        ssh.on('error', (err) => this.onSSHError('CONNECT ERROR', err))

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
            this.onSSHError('FAILED TO CONNECT', err)
        }
    }

    async doSSHDisconnect () {
        await this._ssh.end()

        this._ssh = null
        this._server = null
    }

    onSSHTCPConnect (info, accept, reject) {
        const session = this._session
        const stream = accept()
        stream.pause()

        const socket = net.connect(session['destination_port'], session['destination_host'], () => {
            stream.pipe(socket)
            socket.pipe(stream)
            stream.resume()
        })
    }

    onExecTunnel () {
        const session = this._session

        switch (session.direction) {
            case Defs.STR_LOCAL:
                this.onExecLocalTunnel(session)
                break
            default:
                break    
        }
    }

    onExecLocalTunnel (session) {
        const server = net.createServer(socket => {
            this._ssh.forwardOut(session['source_host'], session['source_port'], session['destination_host'], session['destination_port'], (err, stream) => {
                if (err)  {
                    this.onSSHError('LOCAL FORWARDOUT', err)
                } else {
                    socket.pipe(stream)
                    stream.pipe(socket)
                }
            })
        })

        server.listen(session['source_port'], (err) => {
            if (err) {
                this.onSSHError('LOCAL LISTEN', err)
            } else {
                this._server = server
                this._sessionListener.emit(SessionListener.MSG_SESSION_CONNECTED, this)
            }
        })

        server.on('error', (err) => {
            if (err) {
                this.onSSHError('LOCAL ERROR', err)
            }
        })
    }

    closeExecTunnel () {
        const session = this._session

        switch (session.direction) {
            case Defs.STR_LOCAL:
                this.closeExecLocalTunnel(session)
                break
            default:
                break    
        }
    }

    closeExecLocalTunnel () {
        if (this._server) {
            this._server.close()
        }
        this._sessionListener.emit(SessionListener.MSG_SESSION_DISCONNECTED, this)
    }
}