// utils/db.ts

import knex from 'knex';
import knexConfig from '../../knexfile'; // Убедитесь, что путь корректен

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

// Используем глобальную переменную для предотвращения множественных подключений в режиме разработки
const db = (global as any).knexInstance || knex(config);

if (process.env.NODE_ENV !== 'production') {
  (global as any).knexInstance = db;
}

export default db;
