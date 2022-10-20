import schema from './schema.json'
import store from '../store'

const sqlite = require('@journeyapps/sqlcipher').verbose()
const dbFullPath = store.state.Constants.DB_FULL_PATH

export default class DB {
    constructor () {
        this.db = new sqlite.Database(dbFullPath)
    }

    handleDBErrorIfExists (action, err) {
        if (err && err.message) {
            console.log(`[DB_ERR] ${action}: ${err.message}`)
        }
    }

    openDatabase () {
        return new Promise(resolve => {
            const db = this.db
            const master = store.state.MasterPassword

            db.serialize(() => {
                db.run(`PRAGMA cipher_compatibility = ${master.DB_VERSION}`)
                db.run(`PRAGMA key = '${master.DB_MASTER_KEY}'`)

                for (const idx in schema) {
                    const item = schema[idx]

                    if (item.table && item.columns.length > 0) {
                        let columns = ''
                        for (const columnIdx in item.columns) {
                            const col = item.columns[columnIdx]

                            if (columnIdx !== '0') {
                                columns += ', '
                            }
                            columns += `${col.name} ${col.type}${col.unsigned ? ' UNSIGNED' : ''}${col.unique ? ' UNIQUE' : ''}${col.notNull ? ' NOT NULL' : ''}${col.primary ? ' PRIMARY KEY' : ''}${col.autoIncrement ? ' AUTOINCREMENT' : ''}${col.default ? ` DEFAULT ${col.default}` : ''}`
                        }

                        db.each(`CREATE TABLE IF NOT EXISTS ${item.table} (${columns})`, (err) => {
                            if (err) {
                                this.handleDBErrorIfExists('dbCreateTable', err)
                            }
                        })
                    }
                }

                resolve()
            })
        })
    }

    getPortForwardingTableItems () {
        return new Promise(async resolve => {
            await this.openDatabase()
            const db = this.db

            db.serialize(() => {
                db.all(`SELECT * FROM PORT_FORWARDING`, (err, row) => {
                    if (err) {
                        this.handleDBErrorIfExists('getPortForwardingTableItems', err)
                        resolve()
                    }

                    resolve(row)
                })
            })
        })
    }

    insertPortForwardingItem (item) {
        return new Promise(async resolve => {
            await this.openDatabase()
            const db = this.db
            const {
                serverHost, serverPort, serverUsername, serverPassword,
                direction,
                localHost, localPort,
                remoteHost, remotePort
            } = item

            db.serialize(() => {
                db.run('INSERT INTO PORT_FORWARDING (HOST, PORT, USERNAME, PASSWORD, DIRECTION, SOURCE_HOST, SOURCE_PORT, DESTINATION_HOST, DESTINATION_PORT) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)', [
                    serverHost, serverPort, serverUsername, serverPassword, direction, localHost, localPort, remoteHost, remotePort
                ], (err) => {
                    if (err) {
                        this.handleDBErrorIfExists('insertPortForwardingItem', err)
                        resolve()
                    }

                    db.each('SELECT * FROM PORT_FORWARDING ORDER BY ID DESC LIMIT 1', (err, rows) => {
                        if (err) {
                            this.handleDBErrorIfExists('getLastCreated', err)
                            resolve()
                        }

                        resolve(rows.ID)
                    })
                })
            })
        })
    }
}
