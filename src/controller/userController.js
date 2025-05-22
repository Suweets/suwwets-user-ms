import { Router } from 'express';
import * as user from '../repository/userRepository.js';
import { login } from '../repository/loginRepository.js';
import * as pedido from '../repository/pedidoRepository.js';

const endpoints = Router();

endpoints.get('/usuarios', async (req, res) => {
  let users = await user.getAllUsers();

  res.status(200).send({
    users: users
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

endpoints.get('/usuario/info/:id', async (req, res) => {
  const id = req.params.id;

  let userInfo = await user.getUserInfo(id);

  if (userInfo === 0) {
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

  let alredyRegistered = await user.getUserByCpf(userData.cpf);

  if (alredyRegistered != 0) {
    return res.status(400).send({
      message: 'Usuário já cadastrado.'
    });
  }

  let result = await user.createUser(userData);

  if (result === 0) {
    return res.status(400).send({
      message: 'Email já cadastrado.'
    });
  }

  return res.status(200).send({
    message: 'Usuário cadastrado com sucesso!',
    id: result
  });
});

endpoints.post('/usuario/login', async (req, res) => {
  const { email, password } = req.body;

  let result = await login(email, password);

  if (result === 0) {
    return res.status(404).send({
      message: "Email e/ou senha inválidos."
    });
  }

  return res.status(200).send({
    message: "Login efetuado com sucesso.",
    userInfo: result
  })
});

endpoints.post('/usuario/pedido', async (req, res) => {
  const { id_carrinho, id_fatia, id_user } = req.body;

  let result = await pedido.createPedido(id_carrinho, id_user);

  if (result === 0) {
    return res.status(404).send({
      message: 'Usuário não encontrado'
    });
  }

  let resultLink = await pedido.linkPedido(result, id_fatia);
  
  if (resultLink == 0) {
    return res.status(404).send({
      message: 'Pedido não encontrado'
    });
  }

  return res.status(200).send({
    message: 'Pedido criado com sucesso!'
  });
});

export default endpoints;