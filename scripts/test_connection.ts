// scripts/test_connection.ts

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const testConnection = async () => {
  try {
    // Подключение к основной базе данных
    const mainConnection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to main database successfully.');
    await mainConnection.end();

    // Подключение к shadow базе данных
    const shadowConnection = await mysql.createConnection(process.env.SHADOW_DATABASE_URL);
    console.log('Connected to shadow database successfully.');
    await shadowConnection.end();
  } catch (error) {
    console.error('Error connecting to databases:', error);
  }
};

testConnection();
