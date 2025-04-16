import connection from "../services/carrinhoConnection.js";

export async function createCarrinho(num) {
  const query = `
    INSERT 
      INTO carrinho (id_carrinho) 
    VALUES (?)`;

  const [result] = await connection.execute(query, [num]);
  return result;
}