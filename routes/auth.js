const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const {fieldValidator} = require('../middlewares/field-validator')
const { jwtValidator } = require('../middlewares/jwt-validator')

router.post(
    '/new',
    [//middlewares
        check('name',"Name is required").not().isEmpty(),
        check('email',"Email is required").isEmail(),
        check('password',"Password should be at least six characters").isLength({min: 6}),
        fieldValidator,
    ],
    createUser)

router.post('/', 
    [
        check('email',"Email is required").isEmail(),
        check('password',"Password should be at least six characters").isLength({min: 6}),
        fieldValidator,
    ], 
    loginUser )

router.get('/renew', jwtValidator , renewToken)

module.exports = router