// src/db.js
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'sidekicks_db'
});
