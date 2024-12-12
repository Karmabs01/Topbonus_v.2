// migrations/20241210121821_add_fields_to_users_table.ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Список столбцов для добавления
  const columnsToAdd = [
    { name: 'VIP', type: 'string', length: 25, nullable: true },
    { name: 'balance', type: 'decimal', precision: 6, scale: 2, nullable: true, defaultTo: '0' },
    { name: 'country', type: 'string', length: 25, nullable: true },
    { name: 'input', type: 'string', length: 100, nullable: true },
    { name: 'password', type: 'string', length: 25, nullable: true },
    { name: 'tickets', type: 'string', length: 3, nullable: true, defaultTo: '50' },
    { name: 'winbalance', type: 'string', length: 255, nullable: true },
    { name: 'customer', type: 'string', length: 15, nullable: true, defaultTo: 'GURU' },
    { name: 'status_payment', type: 'text', nullable: true },
    { name: 'phone_number', type: 'string', length: 255, nullable: true },
    { name: 'spins_waiting', type: 'string', length: 3, nullable: true },
    { name: 'geo_approve', type: 'string', length: 10, nullable: true },
    { name: 'leads', type: 'text', nullable: true },
    { name: 'sales', type: 'text', nullable: true },
    { name: 'qr_code', type: 'string', length: 255, nullable: true },
  ];

  // Итерация по каждому столбцу и добавление только отсутствующих
  for (const column of columnsToAdd) {
    const exists = await knex.schema.hasColumn('users2', column.name);
    if (!exists) {
      await knex.schema.alterTable('users2', (table) => {
        if (column.type === 'string') {
          if (column.defaultTo) {
            table.string(column.name, column.length!).nullable().defaultTo(column.defaultTo);
          } else {
            table.string(column.name, column.length!).nullable();
          }
        } else if (column.type === 'decimal') {
          if (column.defaultTo) {
            table.decimal(column.name, column.precision!, column.scale!).nullable().defaultTo(column.defaultTo);
          } else {
            table.decimal(column.name, column.precision!, column.scale!).nullable();
          }
        } else if (column.type === 'text') {
          table.text(column.name).nullable();
        }
        // Добавьте другие типы столбцов при необходимости
      });
      console.log(`Столбец '${column.name}' успешно добавлен в таблицу 'users2'.`);
    } else {
      console.log(`Столбец '${column.name}' уже существует в таблице 'users2'. Пропускаем добавление.`);
    }
  }
}

export async function down(knex: Knex): Promise<void> {
  // Список столбцов для удаления
  const columnsToDrop = [
    'VIP', 'balance', 'country', 'input', 'password', 'tickets',
    'winbalance', 'customer', 'status_payment', 'phone_number',
    'spins_waiting', 'geo_approve', 'leads', 'sales', 'qr_code'
  ];

  await knex.schema.alterTable('users2', (table) => {
    for (const column of columnsToDrop) {
      table.dropColumn(column);
      console.log(`Столбец '${column}' удалён из таблицы 'users2'.`);
    }
  });
}
