export default class Utils {
    static isInvalid (val) {
        return val === undefined || val === null
    }

    static isValid (val) {
        return !this.isInvalid(val)
    }

    static isNumber (num) {
        return num & !isNaN(num)
    }
}
