import mysql from 'mysql2/promise';
const DATABASE_URL='mysql://root:root@localhost:3306/productos'

const connection = await mysql.createConnection(DATABASE_URL)
const pool = mysql.createPool(DATABASE_URL);

export default connection
export {pool} 
