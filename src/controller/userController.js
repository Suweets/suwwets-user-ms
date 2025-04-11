import { Router } from 'express';
import * as user from '../repository/userRepository.js';

const endpoints = Router();

endpoints.get('/usuarios', async (req, res) => {
  let users = await user.getAllUsers();

  res.status(200).send({
    users: users
  });
});

endpoints.get('/usuarios/:name', async (req, res) => {
  const name = req.params.name;

  let users = await user.getUserByName(name);

  if (users.length === 0) {
    return res.status(404).send({
      message: 'Usuário não encontrado'
    });
  }

  return res.status(200).send({
    user:users
  });
});

endpoints.put('/usuario/:id', async (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  let result = await user.updateUser(id, userData);

  if (result === 0) {
    return res.status(404).send({
      message: 'Usuário não encontrado'
    });
  }

  return res.status(200).send({
    message: 'Usuário atualizado com sucesso!'
  });
});

endpoints.delete('/usuario/:id', async (req, res) => {
  const id = req.params.id;

  let result = await user.deleteUser(id);

  if (result === 0) {
    return res.status(404).send({
      message: 'Usuário não encontrado'
    });
  }

  return res.status(200).send({
    message: 'Usuário deletado com sucesso!'
  });
});

endpoints.get('/usuario/:id', async (req, res) => {
  const id = req.params.id;
  
  let userInfo = await user.getUserInfo(id);

  if (!userInfo) {
    return res.status(404).send({
      message: 'Usuário não encontrado.'
    });
  }

  return res.status(200).send({
    user: userInfo
  });
});

endpoints.post('/usuario', async (req, res) => {
  const userData = req.body;

  let result = await user.createUser(userData);

  let [userInfo] = await user.getUserByName(userData.nome);

  if (userInfo) {
    return res.status(403).send({
      message: 'Usuário já existente.'
    });
  }

  return res.status(200).send({
    message: 'Usuário cadastrado com sucesso!',
    affectedRows: result
  })
});

export default endpoints;