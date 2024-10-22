const {response} = require('express')
const jwt = require('jsonwebtoken')

const jwtValidator = (req, res = response, next ) =>{

    //x-token in headers
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token not provided in the request'
        })
    }

    try {
        const { name, uid} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        )

        req._id = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not provided'
        })
    }

    next()
}

module.exports = {
    jwtValidator,
}