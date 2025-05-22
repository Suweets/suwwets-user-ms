import connection from "../services/userConnection.js";
import { createCarrinho } from "./carrinhoReppsitory.js";
import { createLogin, deleteLogin } from "./loginRepository.js"

export async function getAllUsers() {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           sbn_user as sobrenome,
           telefone as telefone,
           cpf as cpf
    FROM tb_user;    
  `;

  let [data] = await connection.query(query);

  return data;
}

export async function updateUser(id, user) {
  const query = `
    UPDATE tb_user
    SET nm_user = ?,
        sbn_user = ?,
        telefone = ?,
        cpf = ?
    WHERE id_user = ?;
  `;

  const { nome, sobrenome, telefone, cpf } = user

  let [result] = await connection.query(query, [nome, sobrenome, telefone, cpf, id]);

  return result.affectedRows;
}

export async function deleteUser(id) {
  const query = `
    DELETE FROM tb_user
    WHERE id_user = ?;
  `;

  console.log(id);

  let { id_login } = await getUserInfo(id);

  console.log(id_login);

  let [result] = await connection.query(query, [id]);

  if (result.affectedRows > 0) {
    await deleteLogin(id_login);
  }

  return result.affectedRows;
}

export async function getUserInfo(id) {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           telefone as telefone,
           cpf as cpf,
           id_login
    FROM tb_user
    WHERE id_user = ?;
  `;

  let [data] = await connection.query(query, [id]);

  return data[0];
}

export async function createUser(user) {
  const query = `
    INSERT INTO tb_user (nm_user, sbn_user, telefone, cpf, id_login, id_carrinho)
    VALUE (?, ?, ?, ?, ?, ?);
  `;

  let carrinho = Math.floor(Math.random() * 1000000);

  let resultCarrinho = await createCarrinho(carrinho);

  const { nome, sobrenome, telefone, cpf, password, email } = user;

  const idLogin = await createLogin(email, password);

  if (idLogin === 0) {
    return 0;
  }

  let [result] = await connection.query(query, [nome, sobrenome, telefone, cpf, idLogin, resultCarrinho]);

  return result.insertId;
}

export async function getUserByCpf(cpf) {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           sbn_user as sobrenome,
           telefone as telefone,
           cpf as cpf,
           id_carrinho
    FROM tb_user
    WHERE cpf = ?;
  `;

  let [data] = await connection.query(query, [cpf]);

  return data;
}