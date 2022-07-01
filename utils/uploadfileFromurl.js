const https = require('https')
const fs = require('fs')
const path = require('path')

module.exports = (fileName, url) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../public/fbimg', fileName)
    const file = fs.createWriteStream(filePath)
    const req = https.get(url, (res) => {
      res.pipe(file)
      res.on('error', reject)
      file.on('error', reject)
      file.on('finish', () => {
        resolve(process.env.BASE_URL + '/fbimg/' + fileName)
      })
    })
    req.on('error', reject)
  })
}
