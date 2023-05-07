import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

connection.connect();

export const db = {
  getAllItems: () =>
    new Promise<Item[]>((resolve, reject) =>
      connection.query('SELECT * FROM items', (error, results) => {
        if (error) reject(error);
        else resolve(results);
      })
    ),

  getItemById: (id: number) =>
    new Promise<Item>((resolve, reject) =>
      connection.query(
        'SELECT * FROM items WHERE id = ?',
        [id],
        (error, results) => {
          if (error) reject(error);
          else if (results.length === 0) reject('Item not found');
          else resolve(results[0]);
        }
      )
    ),

  createItem: (item: Item) =>
    new Promise<number>((resolve, reject) =>
      connection.query(
        'INSERT INTO items SET ?',
        [item],
        (error, results) => {
          if (error) reject(error);
          else resolve(results.insertId);
        }
      )
    ),

  updateItem: (id: number, updates: Partial<Item>) =>
    new Promise<void>((resolve, reject) =>
      connection.query(
        'UPDATE items SET ? WHERE id = ?',
        [updates, id],
        (error, results) => {
          if (error) reject(error);
          else if (results.affectedRows === 0) reject('Item not found');
          else resolve();
        }
      )
    ),

  deleteItem: (id: number) =>
    new Promise<void>((resolve, reject) =>
      connection.query(
        'DELETE FROM items WHERE id = ?',
        [id],
        (error, results) => {
            if (error) reject(error);
            else if (results.affectedRows === 0) reject('Item not found');
            else resolve();
          }
        )
      ),
  };
  
  export interface Item {
    id?: number;
    name: string;
    description: string;
    price: number;
  } 
  
  export default connection; // Optionally export the connection for convenience
