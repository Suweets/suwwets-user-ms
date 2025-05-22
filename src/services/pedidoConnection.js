import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_PEDIDO,
  typeCast: function (field, next){
    if (field.type === 'TINY' && field.length === 1) {
      return  field.string() === '1';
    }

    return next();
  }
});

console.log('Conexão realizada com sucesso!');

export default connection;