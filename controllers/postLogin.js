const Users = require('../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (!user) {
    return res.redirect('/login')
  } else {
    req.session.user = user
    res.redirect('/')
  }
}
