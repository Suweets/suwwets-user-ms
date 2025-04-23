import { Router } from 'express';
import * as login from '../repository/loginRepository.js';

const endpoints = Router();

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