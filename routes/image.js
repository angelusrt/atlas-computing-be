const router = require("express").Router()
const path = require('path')
const fs = require('fs')

const _dir = path.join(__dirname.slice(0, __dirname.length - 1 - 6), 'public/images')

const _mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
}

router.get('/:image', async (req, res) => {
  try {
    console.log(_dir)

    const file = path.join(_dir, req.path)
    
    if (file.indexOf(_dir + path.sep) !== 0) 
      return res.status(403).end('Forbidden')
    
    const type = _mime[path.extname(file).slice(1)] || 'text/plain'
    const s = fs.createReadStream(file)

    s.on('open', async () => {
      res.set('Content-Type', type)
      s.pipe(res)
    })
    s.on('error', async () => {
      res.set('Content-Type', 'text/plain')
      res.status(404).end('Not found')
    })
  } catch (err) {res.status(404).json(err)}
})

module.exports = router