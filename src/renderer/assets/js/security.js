import bcrypt from 'bcrypt'

const salt = 10

export default class Security {
    static encryption (password) {
        return bcrypt.hashSync(password, salt)
    }

    static isComparison (password, encryptionPassword) {
        return bcrypt.compareSync(password, encryptionPassword)
    }
}
