const passport = require('passport')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, next) => {
  try {
    const NextWithError = () => {
      return next(null, false, 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }
    const user = await Users.findOne({ email })
    if (!user) {
      return NextWithError()
    } else {
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        return next(null, user)
      } else {
        NextWithError()
      }
    }
  } catch (error) {
    return next(error)
  }
}))

// save to session
passport.serializeUser((user, next) => {
  next(null, user._id)
})

// id from session to user object
passport.deserializeUser(async (id, next) => {
  try {
    const user = await Users.findById(id)
    next(null, user)
  } catch (error) {
    return next(error)
  }
})
