const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (err) {
      return res
        .status(404)
        .json({ error: 'Não foi possível mostrar os usuários' })
    }
  },

  async store(req, res) {
    try {
      const data = req.body
      console.log(data)
      const user = await User.create(data)
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res
        .status(400)
        .json({ error: 'Não foi possível mostrar o usuário' })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const data = req.body

      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8)
      }

      const user = await User.update(data, {
        where: { id },
      })

      return res.json({ message: 'Atualizado com sucesso!' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível atualizar dados do usuário' })
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params
      const data = req.body

      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8)
      }

      await User.destroy({
        where: { id: Number(id) },
      })

      return res.json({ message: 'Usuário removido com sucesso!' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível remover do usuário' })
    }
  },
}
