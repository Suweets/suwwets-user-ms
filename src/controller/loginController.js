import { Router } from 'express';
import * as login from '../repository/loginRepository.js';

const endpoints = Router();

endpoints.get('/usuarios/logins', async (req, res) => {
  let logins = await login.getAllLogins();

  if (logins.length === 0){
    return res.status(404).send({
      message: 'Nenhum login encontrado'
    });
  }

  res.status(200).send({
    messgae: 'Logins encontrados com sucesso!',
    logins: logins
  })
});

endpoints.post('/usuarios/login', async (req, res) => {
  const loginData = req.body;

  let result = await login.createLogin(loginData);

  let resultEquals = await login.getLoginByEmail(loginData.email);

  if (resultEquals.length === 1) {
    return res.status(404).send({
      message: 'Login já existe!'
    });
  }

  res.status(200).send({
    message: 'Login criado com sucesso!'
  });
});

endpoints.delete('/usuarios/login/:id', async (req, res) => {
  const id = req.params.id;

  let result = await login.deleteLogin(id);

  if (result === 0) {
    return res.status(404).send({
      message: 'Login não encontrado'
    });
  }

  return res.status(200).send({
    message: 'Login deletado com sucesso!'
  });
});

endpoints.get('/usuarios/login/:email', async (req, res) => {
  const email = req.params.email;

  let result = await login.getLoginByEmail(email);

  if (result.length === 0) {
    return res.status(404).send({
      message: 'Login não encontrado'
    });
  }

  return res.status(200).send({
    message: 'Login encontrado com sucesso!',
    login: result
  });
});

endpoints.post('/usuarios/login/:id', async (req, res) => {
  const id = req.params.id;
  const loginData = req.body;

  let result = await login.updateLogin(id, loginData);

  if (result === 0) {
    return res.status(404).send({
      message: 'Login não encontrado'
    });
  }

  return res.status(200).send({
    message: 'Login atualizado com sucesso!'
  });
});

export default endpoints;