const { Router } = require('express')
const passport = require('passport')
const mustLogin = require('../middlewares/mustLogin')
const router = Router()
const postLogin = require('../controllers/postLogin')
const scopeFacebook = ['email']

router.get('/', mustLogin, require('../controllers/index'))
router.post('/update-password', mustLogin, require('../controllers/updatePassword'))
router.get('/login', require('../controllers/getLogin'))
router.post('/login', postLogin('local'))
router.get('/login/facebook', passport.authenticate('facebook', { scope: scopeFacebook }))
router.get('/login/facebook/callback', postLogin('facebook'))
router.get('/login/google', passport.authenticate('google'))
router.get('/login/google/callback', postLogin('google'))
router.get('/register', require('../controllers/getRegister'))
router.post('/register', require('../controllers/postRegister'))
router.get('/logout', require('../controllers/logout'))

router.get('/user', (req, res) => {
  res.send(req.user)
})

module.exports = router
