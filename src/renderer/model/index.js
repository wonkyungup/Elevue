import schema from './schema.json'
import store from '../store'

const sqlite = require('@journeyapps/sqlcipher').verbose()
const dbFullPath = store.state.Constants.DB_FULL_PATH

const getObjectToLowerCase = (list) => {
    return Object.keys(list).reduce((acc, cur) => {
        acc[cur.toLowerCase()] = list[cur]
        return acc
    }, {})
}

export default class DB {
    constructor () {
        this.db = new sqlite.Database(dbFullPath)
    }

    handleDBError (action, err) {
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

                        db.each(`CREATE TABLE IF NOT EXISTS ${item.table}
                                 (
                                     ${columns}
                                 )`, (err) => {
                            if (err) {
                                this.handleDBError('dbCreateTable', err)
                                resolve()
                            }
                        })
                    }
                }

                resolve(db)
            })
        })
    }

    getPortForwardingTableItems () {
        return new Promise(async resolve => {
            const db = await this.openDatabase()

            db.serialize(() => {
                db.all(`SELECT * FROM PORT_FORWARDING`, (err, rows) => {
                    if (err) {
                        this.handleDBError('getPortForwardingTableItems', err)
                        resolve()
                    }

                    resolve(
                        rows.map(value => Object.keys(value).reduce((acc, cur) => {
                            acc[cur.toLowerCase()] = value[cur]
                            return acc
                        }, {}))
                    )
                })
            })
        })
    }

    insertPortForwardingItem (session) {
        return new Promise(async resolve => {
            const db = await this.openDatabase()
            db.serialize(() => {
                db.run('INSERT INTO PORT_FORWARDING (HOST, PORT, USERNAME, PASSWORD, DIRECTION, SOURCE_HOST, SOURCE_PORT, DESTINATION_HOST, DESTINATION_PORT) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)', [
                    session['host'], session['port'], session['username'], session['password'], session['direction'], session['source_host'], session['source_port'], session['destination_host'], session['destination_port']
                ], (err) => {
                    if (err) {
                        this.handleDBError('insertPortForwardingItem', err)
                        resolve()
                    }

                    db.each('SELECT * FROM PORT_FORWARDING ORDER BY ID DESC LIMIT 1', async (err, row) => {
                        if (err) {
                            this.handleDBError('getLastCreated', err)
                            resolve()
                        }

                        resolve(getObjectToLowerCase(row))
                    })
                })
            })
        })
    }

    updatePortForwardingItem (session) {
        return new Promise(async resolve => {
            const db = await this.openDatabase()
            db.serialize(() => {
                db.run('UPDATE PORT_FORWARDING SET HOST=?, PORT=?, USERNAME=?, PASSWORD=?, SOURCE_HOST=?, SOURCE_PORT=?, DESTINATION_HOST=?, DESTINATION_PORT=? WHERE ID=?', [
                    session['host'], session['port'], session['username'], session['password'], session['source_host'], session['source_port'], session['destination_host'], session['destination_port'], session['id']
                ], (err) => {
                    if (err) {
                        this.handleDBError('updatePortForwardingItem', err)
                        resolve()
                    }

                    resolve(true)
                })
            })
        })
    }

    deletePortForwardingItem (id) {
        return new Promise(async resolve => {
            const db = await this.openDatabase()
            db.serialize(() => {
                db.run('DELETE FROM PORT_FORWARDING WHERE ID=?', [id], (err) => {
                    if (err) {
                        this.handleDBError('deletePortForwardingItem', err)
                        resolve()
                    }

                    resolve(true)
                })
            })
        })
    }
}
