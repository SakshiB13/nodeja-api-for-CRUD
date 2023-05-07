"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});
connection.connect();
exports.db = {
    getAllItems: () => new Promise((resolve, reject) => connection.query('SELECT * FROM items', (error, results) => {
        if (error)
            reject(error);
        else
            resolve(results);
    })),
    getItemById: (id) => new Promise((resolve, reject) => connection.query('SELECT * FROM items WHERE id = ?', [id], (error, results) => {
        if (error)
            reject(error);
        else if (results.length === 0)
            reject('Item not found');
        else
            resolve(results[0]);
    })),
    createItem: (item) => new Promise((resolve, reject) => connection.query('INSERT INTO items SET ?', [item], (error, results) => {
        if (error)
            reject(error);
        else
            resolve(results.insertId);
    })),
    updateItem: (id, updates) => new Promise((resolve, reject) => connection.query('UPDATE items SET ? WHERE id = ?', [updates, id], (error, results) => {
        if (error)
            reject(error);
        else if (results.affectedRows === 0)
            reject('Item not found');
        else
            resolve();
    })),
    deleteItem: (id) => new Promise((resolve, reject) => connection.query('DELETE FROM items WHERE id = ?', [id], (error, results) => {
        if (error)
            reject(error);
        else if (results.affectedRows === 0)
            reject('Item not found');
        else
            resolve();
    })),
};
exports.default = connection; // Optionally export the connection for convenience
