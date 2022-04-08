const jwt = require('jsonwebtoken');
const merchantServiceModel = require('../models/merchantService');

class Middleware{
    static checkAuth(req, res, next){
        const validate = jwt.verify(req.headers.authorization, 'secret')
        if (validate) {
            next()
        } else {
            res.status(401).send('unauthorized')
        }
    }
    static async checkAdmin(req, res, next){
        const validate = await merchantServiceModel.checkAdmin(req.body.name,req.body.password);
        if (validate) {
            next()
        } 
        else {
            res.status(401).send('you are not an admin')
        }
    }
}

module.exports = Middleware;