exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.boolean('is_verified').notNullable().defaultTo(false);
    table.string('verification_token');
    table.timestamp('verified_at');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
