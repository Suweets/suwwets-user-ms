import connection from "../services/userConnection.js";

export async function createLogin(email, password) {
  const query = `
    INSERT INTO tb_login (email, password)
    VALUES (?, ?);
  `;

  let resultEmail = await getByEmail(email);

  if (resultEmail.length !== 0) {
    return 0;
  }

  let [result] = await connection.query(query, [email, password]);

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
           password
    FROM tb_login;
  `;

  let [data] = await connection.query(query);

  return data;
};

export async function updateLogin(id) {
  const query = `
    UPDATE tb_login
    SET email = ?,
        password = ?
    WHERE id_login = ?;
  `;

  let [result] = await connection.query(query, [email, senha, id]);

  return result.affectedRows;
};

export async function getByEmail(email) {
  const query = `
    SELECT id_login as id,
           email,
           password
    FROM tb_login
    WHERE email = ?;
  `;

  let [data] = await connection.query(query, [email]);

  return data.length;
}

export async function login(email, password) {
  let resultEmail = await getByEmail(email);

  console.log(resultEmail)

  if (resultEmail != 0) {
    return 0;
  }

  const query = `
    SELECT nm_user as nome,
           sbn_user as sobrenome,
           telefone as telefone,
           cpf as cpf
    FROM tb_user
    JOIN tb_login
    ON tb_user.id_login = tb_login.id_login
    WHERE tb_login.email = ? AND tb_login.password = ?;
  `;


  let [result] = await connection.query(query, [email, password]);

  if (result.length === 0) {
    return 0;
  }

  return result;
}