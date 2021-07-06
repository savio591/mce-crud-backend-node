const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const authConfig = require('../config/auth')

module.exports = {
  async auth(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Não há token' })
    }
    const [, token] = authHeader.split(' ')

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret)
      if (decoded.acesso == 0) {
        return res.status(400).json({ error: 'Usuario foi desativado!' })
      }
      req.user = decoded
      return next()
    } catch (err) {
      console.log(err)
      return res.status(401).json({ error: 'Token Invalido' })
    }
  },
}
