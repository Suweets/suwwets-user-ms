import connection from '../services/pedidoConnection.js';

export async function createPedido(id_carrinho, id_user) {
  const query = `
    INSERT 
      INTO suweets_pedido_db.pedido (id_carrinho, id_user) 
    VALUES (?, ?)`;

  const [result] = await connection.query(query, [id_carrinho, id_user]);

  return result.insertId;
};

export async function linkPedido(id_pedido, id_fatia) {
  const query = `
    UPDATE suweets_menu.fatia
    SET 
      pedido = ?
    WHERE suweets_menu.fatia.id_fatia = ?;
    `;  
    
  const [result] = await connection.query(query, [id_pedido, id_fatia]);
  
  return result.affectedRows;
}