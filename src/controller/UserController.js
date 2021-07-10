const User = require('../models/User')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')

module.exports = {
  async index(req, res) {
    try {
      if (req.user.nivel === 999 && req.user.acesso === 1) {
        const users = await User.findAll()
        return res.json(users)
      }
      return res.status(401).json({ error: 'Você não tem autorização' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possivel mostrar os usuarios' })
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params
      if (req.user.nivel === 999 || req.user.id === id) {
        const user = await User.findOne({
          where: { id },
        })
        return res.status(200).json(user)
      }
      return res.status(401).json({ error: 'Você não tem autorização' })
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possivel criar o usuario' })
    }
  },
  async store(req, res) {
    try {
      const { nome, email, cpf, acesso, nivel, senha } = req.body

      const userExist = await User.findOne({
        where: Sequelize.or({ email }, { cpf }),
      })
      if (userExist) {
        if (userExist.email === email) {
          return res.status(400).json({ error: 'E-mail já cadastrado' })
        }
        return res.status(400).json({ error: 'CPF já cadastrado' })
      }
      const user = await User.create({ nome, email, cpf, acesso, nivel, senha })
      return res.json(user)
    } catch (err) {
      return res.json(err)
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8)
      }
      if (req.user.nivel === 999 || req.user.id === id) {
        await User.update(data, {
          where: { id },
        })
        return res.json({ message: 'Atualizado com sucesso!' })
      }
      return res.status(401).json({ error: 'Você não tem autorização' })
    } catch (err) {
      return res.json({ error: 'Não foi possivel atualizar o usuario' })
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params
      if (req.user.nivel === 999 || req.user.id === id) {
        await User.destroy({
          where: { id },
        })
        return res.json({ message: 'Deletado com sucesso!' })
      }
      return res.status(401).json({ error: 'Você não tem autorização' })
    } catch (err) {
      return res.json({ error: 'Não foi possivel deletar o usuario' })
    }
  },
}
