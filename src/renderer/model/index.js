import * as remote from '@electron/remote'
import schema from './schema.json'
import store from '@/store'
import path from 'path'
import fs from 'fs'

const sqlite = require('sqlite3').verbose()
const Defs = store.state.Constants

export default class DB {
    constructor (path) {
        this.conn = new sqlite.Database(path)
    }

    static getDBPath () {
        const pathUserData = remote.app.getPath('userData')
        const dbFolderPath = path.join(pathUserData, path.sep, Defs.DB_NAME.split('.')[0])

        if (!fs.existsSync(dbFolderPath)) {
            fs.mkdirSync(dbFolderPath, { recursive: true })
        }

        const pathDB = path.join(dbFolderPath, path.sep, Defs.DB_NAME)
        if (!fs.existsSync(pathDB)) {
            fs.writeFileSync(pathDB, '', (err) => {
                if (err) {
                    this.handleDBErrorIfExists('createDataBaseFile', err)
                }
            })
        }

        return pathDB
    }

    handleDBErrorIfExists (action, err) {
        if (err && err.message) {
            console.log(`[DB_ERR] ${action}: ${err.message}`)
        }
    }

    createTable () {
        return new Promise(resolve => {
            const conn = this.conn

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

                    if (conn !== null) {
                        conn.serialize(() => {
                            conn.each(`CREATE TABLE IF NOT EXISTS ${item.table} (${columns})`, (err) => {
                                if (err) {
                                    this.handleDBErrorIfExists('dbCreateTable', err)
                                }
                            })
                        })
                    }
                }
            }

            resolve()
        })
    }
}
