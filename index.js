const express = require('express')
require('dotenv').config()
const {dbConnection} = require('./database/config')
const cors = require('cors')

//create express server 
const app =  express()

//Database connection
dbConnection()

//cors
app.use(cors())

//public directory
app.use( express.static('public'))

//read and parse of the body
app.use( express.json())

//route
app.use( '/api/auth', require('./routes/auth'))
app.use( '/api/events', require('./routes/events'))

//listener
app.listen( process.env.PORT, () =>{
    console.log(`server: ${process.env.PORT}`)
})