// global.d.ts

import knex from 'knex';

declare global {
  var knexInstance: knex | undefined;
}
