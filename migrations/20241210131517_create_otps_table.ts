// migrations/20241002190048_create_otps_table.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('otps10', (table) => {
    table.string('id').primary();
    table.string('email').notNullable();
    table.string('code').notNullable();
    table.timestamp('expires_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('otps10');
}
