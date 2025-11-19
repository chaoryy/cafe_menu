// Загружаем переменные из .env файла
require('dotenv').config();

const mysql = require('mysql2');

// Создаем подключение используя переменные из .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Ошибка подключения к БД:', err.message);
        return;
    }
    console.log('✅ Подключено к базе данных MySQL');
});

module.exports = connection;