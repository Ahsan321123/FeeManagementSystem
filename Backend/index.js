const express=require('express')
const app= express()
const bodyparser=require('body-parser') 
const cors = require('cors')
// Routes import 
const studentRoutes= require('./router/student')
const feeRoutes = require('./router/student')

// middleware 
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())
app.use('/api/v1',studentRoutes)





module.exports=app;

