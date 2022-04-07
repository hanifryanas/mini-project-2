class Middleware{
    static checkAuth(req, res, next){
        const validate = jwt.verify(req.headers.authorization, 'xxxxxxxxxxx')
        if (validate) {
            next()
        } else {
            res.status(401)
        }
    }
}

module.exports = Middleware;