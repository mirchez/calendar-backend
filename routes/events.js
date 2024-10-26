//every should be validated
const express = require('express')
const router = express.Router()
const { jwtValidator } = require('../middlewares/jwt-validator')
const { check } = require('express-validator')
const {fieldValidator} = require('../middlewares/field-validator')
const {isDate} = require('../helpers/isDate')


const {  
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent, } = require('../controllers/events')

//validate events
router.use( jwtValidator )

//get event
router.get('/get', getEvent )

//create a new event
router.post('/create',
    [
        check('title',"title is required").not().isEmpty(),
        check('start', "start date is required").custom(isDate),
        check('end', "end date is required").custom(isDate),
        fieldValidator
    ],createEvent )

//update a new event
router.put('/:id',
    [
        check('title',"title is required").not().isEmpty(),
        check('start', "start date is required").custom(isDate),
        check('end', "end date is required").custom(isDate),
        fieldValidator
    ], updateEvent )

//delete events
router.delete('/:id',
    [

    ], deleteEvent)

module.exports = router