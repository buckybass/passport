const User = require('../models/Users')

module.exports = async (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    return res.redirect('/register')
  }
  await User.create(req.body)
  res.redirect('/')
}
