const Users = require('../models/Users')
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
  const redirectWithError = (msg) => {
    req.flash('err', msg)
    return res.redirect('/login')
  }
  const user = await Users.findOne({ email: req.body.email })
  if (!user) {
    redirectWithError('อีเมลไม่ถูกต้อง')
  } else {
    const result = await bcrypt.compare(req.body.password, user.password)
    if (result) {
      req.session.user = user
      req.flash('success', 'เข้าสู่ระบบสำเร็จ')
      return res.redirect('/')
    } else {
      redirectWithError('รหัสผ่านไม่ถูกต้อง')
    }
  }
}
