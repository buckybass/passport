module.exports = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err) }
    req.flash('err', 'ออกจากระบบเรียบร้อย')
    res.redirect('/login')
  })
}
