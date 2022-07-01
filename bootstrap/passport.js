const passport = require('passport')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const uploadfileFromurl = require('../utils/uploadfileFromurl')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['displayName', 'email', 'picture.type(large)']
}, async (accessToken, refreshToken, profile, next) => {
  try {
    console.log(profile._json)
    if (!profile._json.email) {
      return next(null, false, 'กรุณายินยอมให้เข้าถึงอีเมลในเฟสบุคเนื่องจากคุณปฎิเสธ')
    }
    const haveuser = await Users.findOne({ 'oauth.facebook': profile._json.id })
    if (haveuser) {
      return next(null, haveuser)
    }
    let avatarUrl
    const avartarUrlFB = profile?._json?.picture?.data?.url
    if (avartarUrlFB) {
      avatarUrl = await uploadfileFromurl(`fb_${profile._json.id}.jpg`, avartarUrlFB)
    }

    const user = await Users.create({
      email: profile._json.email,
      avatarUrl,
      oauth: {
        facebook: profile._json.id
      }
    })
    next(null, user, 'เข้าแล้ว')
  } catch (error) {
    next(error)
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
