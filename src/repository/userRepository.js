import connection from "../services/connection.js";

export async function getAllUsers() {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           telefone as telefone
    FROM tb_user;    
  `;

  let [data] = await connection.query(query);

  return data;
}

export async function getUserByName(name) {
  const query = `
    SELECT id_user as id,
           nm_user as nome,
           telefone as telefone
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
        telefone = ?
    WHERE id_user = ?;
  `;

  const { nome, telefone } = user

  let [result] = await connection.query(query, [nome, telefone, id]);
  
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