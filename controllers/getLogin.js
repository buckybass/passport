module.exports = (req, res) => {
  res.render('login', {
    err: req.flash('err')
  })
}
