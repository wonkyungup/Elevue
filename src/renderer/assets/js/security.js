import bcrypt from 'bcrypt'
import { encode, decode } from 'js-base64'

export default class Security {
    static encryption (password) {
        return bcrypt.hashSync(password, 10)
    }

    static isComparison (password, encryptionPassword) {
        return bcrypt.compareSync(password, encryptionPassword)
    }

    static encodeData (data) {
        return encode(data)
    }

    static decodeData (data) {
        return decode(data)
    }
}
