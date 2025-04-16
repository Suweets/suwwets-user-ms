import connection from "../services/userConnection.js";

export async function createLogin(user) {
  const query = `
    INSERT INTO tb_login (email, senha)
    VALUES (?, ?);
  `;

  const { email, senha } = user;

  let [result] = await connection.query(query, [email, senha]);

  return result.insertId;
};

export async function deleteLogin(id) {
  const query = `
    DELETE FROM tb_login
    WHERE id_login = ?;
  `;

  let [result] = await connection.query(query, [id]);

  return result.affectedRows;
};

export async function getAllLogins() {
  const query = `
    SELECT id_login as id,
           email,
           senha
    FROM tb_login;
  `;

  let [data] = await connection.query(query);

  return data;
};

export async function getLoginByEmail(email) {
  const query = `
    SELECT id_login as id,
           email,
           senha
    FROM tb_login
    WHERE email = ?;
  `;

  let [data] = await connection.query(query, email);

  return data;
};

export async function updateLogin(id) {
  const query = `
    UPDATE tb_login
    SET email = ?,
        senha = ?
    WHERE id_login = ?;
  `;

  let [result] = await connection.query(query, [email, senha, id]);

  return result.affectedRows;
}