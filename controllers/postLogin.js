const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (!user) {
    req.flash('err', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    return res.redirect('/login')
  } else {
    req.session.user = user
    req.flash('success', 'เข้าสู่ระบบสำเร็จ')
    return res.redirect('/')
  }
}
