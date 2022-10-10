//IMPORT PACKAGES
const express = require('express')
const app = express()
const cors = require('cors') 
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const port = 8000


// CONFIG mongoose
require('./configs/mongoose.config')

//having 2 localhost port to communicate
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
})) 

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}));

//Routes
require('./routes/user.routes')(app)
require('./routes/customer.routes')(app)
require('./routes/rep.routes')(app)

app.listen(port, () => console.log('Listening on port: 8000'));