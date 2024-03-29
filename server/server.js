//IMPORT PACKAGES
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors') 
const jwt = require('jsonwebtoken')
// const path = require('path'); //added to test heroku deployment
// const publicPath = path.join(__dirname, '..', 'public'); //added to test heroku deployment

// const port = 8000

require('dotenv').config()


// CONFIG mongoose
require('./configs/mongoose.config')

//having 2 localhost port to communicate
//  app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000"
// })) 

//CHANGE THIS BEFORE PUTTING IN PRODUCTION!
app.use(cors({
 credentials: true,
 Headers: true,
 exposedHeaders: 'Set-Cookie',
 origin: process.env.FRONT_END,
 methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
 allowedHeaders: [
  'Access-Control-Allow-Origin',
  'Content-Type',
  'Authorization'
]
})) 

//Added to test heroku deployment
// app.use(express.static(publicPath));  
// app.get('*', (req, res) => {
//    res.sendFile(path.join(publicPath, 'index.html'));
// });




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