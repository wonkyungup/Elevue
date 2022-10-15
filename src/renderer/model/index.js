import schema from './schema.json'

const sqlite = require('@journeyapps/sqlcipher').verbose()

export default class DB {
    constructor (path) {
        this.db = new sqlite.Database(path)
    }

    handleDBErrorIfExists (action, err) {
        if (err && err.message) {
            console.log(`[DB_ERR] ${action}: ${err.message}`)
        }
    }

    openDatabase (version, key) {
        return new Promise(resolve => {
            const db = this.db

            db.serialize(() => {
                db.run(`PRAGMA cipher_compatibility = ${version}`)
                db.run(`PRAGMA key = '${key}'`)
                resolve()
            })
        })
    }

    createTable (version, key) {
        return new Promise(async resolve => {
            const db = this.db

            await this.openDatabase(version, key)
            db.serialize(() => {
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
            })

            resolve()
        })
    }
}
