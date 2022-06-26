const User = require('../models/Users')

module.exports = async (req, res) => {
  function redirectWithError (msg, url) {
    req.flash('err', msg)
    return res.redirect(url)
  }
  if (req.body.password !== req.body.confirmpassword) {
    redirectWithError('รหัสผ่านไม่ตรงกัน', '/register')
  }
  const user = User.findOne({ email: req.body.email })
  if (user) {
    redirectWithError('อีเมลนี้มีการสมัครแล้ว', '/register')
  }
  try {
    await User.create(req.body)
  } catch (error) {
    redirectWithError(error.message || 'พบปัญหาบางอย่าง', '/register')
  }
  req.flash('success', 'สมัครสมาชิกสำเร็จ')
  return res.redirect('/')
}
