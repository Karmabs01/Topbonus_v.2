// knexfile.js

require('dotenv').config(); // Загружаем переменные окружения из .env

module.exports = {
  development: {
    client: 'mysql2', // Используем 'mysql2' для MySQL
    connection: {
      host: process.env.MYSQL_HOST || 'ny509616.mysql.tools',
      port: process.env.MYSQL_PORT || 3306, // Стандартный порт для MySQL
      user: process.env.MYSQL_USER || 'ny509616_test',
      password: process.env.MYSQL_PASSWORD || 'gN@M6;h7z7',
      database: process.env.MYSQL_DATABASE || 'ny509616_test',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
