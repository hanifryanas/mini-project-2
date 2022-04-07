const jwt = require('jsonwebtoken');

class Middleware{
    static checkAuth(req, res, next){
        const validate = jwt.verify(req.headers.authorization, 'zxcvbnm')
        if (validate) {
            next()
        } else {
            res.status(401)
        }
    }
}

module.exports = Middleware;