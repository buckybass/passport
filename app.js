const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
dotenv.config()
mongoose.connect(process.env.MONGODB_URL)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views'))

app.use(session({
  cookie: {
    maxAge: 30000
  },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY
}))
app.use(express.urlencoded({ extended: false }))

app.use(require('./router'))

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`server is start is port = ${PORT}`)
})
