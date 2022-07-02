const passport = require('passport')
module.exports = (strategyName) => (req, res, next) => {
  passport.authenticate(strategyName, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('err', info)
      return res.redirect(req.user ? '/' : '/login')
    }
    if (req.user) {
      req.flash('success', 'ผูกบัญชีสำเร็จ')
      return res.redirect('/')
    }
    req.login(user, (err) => {
      if (err) {
        next(err)
      }
      req.flash('success', 'เข้าสู่ระบบสำเร็จ')
      return res.redirect('/')
    })
  })(req, res, next)
}
