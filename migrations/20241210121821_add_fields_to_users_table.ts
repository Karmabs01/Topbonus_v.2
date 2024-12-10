// migrations/xxxx_add_fields_to_users2_table.js

exports.up = function(knex) {
    return knex.schema.table('users2', function(table) {
      table.string('login', 100).notNullable().unique().alter();
      table.string('VIP', 25).nullable();
      table.decimal('balance', 6, 2).defaultTo(0.00).nullable();
      table.string('country', 25).nullable();
      table.string('input', 100).nullable();
      table.string('password', 25).nullable();
      table.string('tickets', 3).defaultTo('50').nullable();
      table.string('winbalance', 255).nullable();
      table.string('customer', 15).defaultTo('GURU').nullable();
      table.text('status_payment').nullable();
      table.string('phone_number', 255).nullable();
      table.string('spins_waiting', 3).nullable();
      table.string('geo_approve', 10).nullable();
      table.text('leads').nullable();
      table.text('sales').nullable();
      table.string('qr_code', 255).nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users2', function(table) {
      table.dropColumns(
        'login',
        'VIP',
        'balance',
        'country',
        'input',
        'password',
        'tickets',
        'winbalance',
        'customer',
        'status_payment',
        'phone_number',
        'spins_waiting',
        'geo_approve',
        'leads',
        'sales',
        'qr_code'
      );
    });
  };
  