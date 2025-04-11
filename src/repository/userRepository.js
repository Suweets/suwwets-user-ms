import connection from "../services/connection.js";

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

export async function getUserByName(name) {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           sbn_user as sobrenome,
           telefone as telefone,
           cpf as cpf
    FROM tb_user
    WHERE nm_user LIKE ?;
  `;

  let [data] = await connection.query(query, [`%${name}%`]);

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

  let [result] = await connection.query(query, [id]);

  return result.affectedRows;
}

export async function getUserInfo(id) {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           telefone as telefone
    FROM tb_user
    WHERE id_user = ?;
  `;

  let [data] = await connection.query(query, [id]);

  return data[0];
}

export async function createUser(user) {
  const query = `
    INSERT INTO tb_user (nm_user, sbn_user, telefone, cpf)
    VALUE (?, ?, ?, ?);
  `;

  const { nome, sobrenome, telefone, cpf } = user;

  let [result] = await connection.query(query, [nome, sobrenome, telefone, cpf]);

  return result.insertId;
}