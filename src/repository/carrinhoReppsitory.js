import connection from "../services/carrinhoConnection.js";

export async function createCarrinho(num) {
  const query = `
    INSERT 
      INTO carrinho (num_carrinho) 
    VALUES (?)`;

  const [result] = await connection.query(query, [num]);


  return result.insertId;
};

export async function getCarrinho(id) {
  const query = `
    SELECT 
      c.id_carrinho,
      p.id_pedido,
    FROM 
      carrinho as c
    JOIN 
      suweets_pedido_db as p
    ON 
      c.id_carrinho = p.id_carrinho 
    WHERE 
      c.id_carrinho = ?`;

  const [result] = await connection.query(query, [id]);

  return result[0];
}