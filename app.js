const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const connectRedis = require('connect-redis')
const connectFlash = require('connect-flash')
const redis = require('redis')
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
  legacyMode: true,
  url: process.env.REDIS_URL
})
redisClient.connect().catch()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views'))

app.use(session({
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 30000
  },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY
}))
app.use(connectFlash())
app.use((req, res, next) => {
  res.locals.alertMessage = {
    err: req.flash('err'),
    success: req.flash('success')
  }
  next()
}
)
app.use(express.urlencoded({ extended: false }))

app.use(require('./router'))

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`server is start is port = ${PORT}`)
})
