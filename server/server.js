//IMPORT PACKAGES
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors') 
const jwt = require('jsonwebtoken')

// const port = 8000

require('dotenv').config()


// CONFIG mongoose
require('./configs/mongoose.config')

//having 2 localhost port to communicate
 app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
})) 

//CHANGE THIS BEFORE PUTTING IN PRODUCTION!
//app.use(cors({
 // credentials: true,
 // origin: "https://mern-deployment-five.vercel.app",
 // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
//})) 




app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({ extended: true}));

//Routes
require('./routes/user.routes')(app)
require('./routes/customer.routes')(app)
require('./routes/rep.routes')(app)
require('./routes/comment.routes')(app)

const serverPort = process.env.PORT || 3100
app.listen(serverPort, () => {
  console.log(`🚀 Server is listening on port: ${serverPort}`)
})

// app.listen(port, () => console.log('Listening on port: 8000'));