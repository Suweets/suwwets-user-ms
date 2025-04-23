import connection from "../services/carrinhoConnection.js";

export async function createCarrinho(num) {
  const query = `
    INSERT 
      INTO carrinho (num_carrinho) 
    VALUES (?)`;

  const [result] = await connection.query(query, [num]);


  return result.insertId;
};