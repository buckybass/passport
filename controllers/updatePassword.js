const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  req.user.password = await bcrypt.hash(req.body.password, 10)
  await req.user.save()
  req.flash('success', 'บันทึกรหัสผ่านสำเร็จ')
  res.redirect('/')
}
