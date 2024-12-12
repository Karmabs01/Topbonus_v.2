import { Knex } from 'knex';

declare global {
  // eslint-disable-next-line no-var
  var knexInstance: Knex | undefined;
}

export {};
