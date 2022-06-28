const bcrypt = require('bcrypt')
const User = require('../models/Users')

module.exports = async (req, res) => {
  const redirectWithError = (msg, url) => {
    req.flash('err', msg)
    return res.redirect(url)
  }
  if (req.body.password !== req.body.confirmpassword) {
    return redirectWithError('รหัสผ่านไม่ตรงกัน', '/register')
  }
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return redirectWithError('อีเมลนี้มีการสมัครแล้ว', '/register')
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await User.create(req.body)
  } catch (error) {
    redirectWithError(error.message || 'พบปัญหาบางอย่าง', '/register')
  }
  req.flash('success', 'สมัครสมาชิกสำเร็จ')
  return res.redirect('/login')
}
