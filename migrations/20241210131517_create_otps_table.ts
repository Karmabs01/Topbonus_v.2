// migrations/xxxx_create_otps_table.js

exports.up = function(knex) {
    return knex.schema.createTable('otps2', function(table) {
      table.string('id', 36).primary(); // UUID
      table.string('email', 255).notNullable();
      table.string('code', 6).notNullable(); // OTP код из 6 цифр
      table.timestamp('expires_at').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('otps');
  };
  