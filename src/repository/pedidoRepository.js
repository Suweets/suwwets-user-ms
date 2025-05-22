import connection from '../services/pedidoConnection.js';

export async function createPedido(id_carrinho) {
  const query = `
    INSERT 
      INTO suweets_peido_db (id_carrinho) 
    VALUES (?)`;

  const [result] = await connection.query(query, [id_carrinho]);

  return result.insertId;
};