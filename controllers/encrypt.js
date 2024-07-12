const bcrypt = require('bcrypt');

class BCryptFunctions {
    constructor() {
        this.saltRounds = 10;
    }

    encryptString(string) {
        const hash = bcrypt.hashSync(string, this.saltRounds);
        return hash
    }

    comparePWString(string, hash) {
        const result = bcrypt.compareSync(string, hash);
        return result
    }
}

module.exports = BCryptFunctions