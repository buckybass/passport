const { Router } = require('express')
const mustLogin = require('./middlewares/mustLogin')
const router = Router()

router.get('/', mustLogin, require('./controllers/index'))
router.get('/login', require('./controllers/getLogin'))
router.post('/login', require('./controllers/postLogin'))
router.get('/register', require('./controllers/getRegister'))
router.post('/register', require('./controllers/postRegister'))
router.get('/logout', require('./controllers/logout'))

module.exports = router
