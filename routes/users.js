const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Listagem de usuários'
  })
});

router.post('/', (req, res, next) => {
  const user = {
    nome: req.body.name
  }
  res.status(201).send({
    mensagem: 'Usuário criado com sucesso!',
    user
  })
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id
  res.status(200).send({
    mensagem: 'Detalhes do usuário',
    id: id
  })
});

router.patch('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Usuário editado com sucesso!'
  })
});

router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Usuário excluído com sucesso!'
  })
});

module.exports = router;

