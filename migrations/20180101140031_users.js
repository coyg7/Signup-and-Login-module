
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('timezone').notNullable();
    table.string('password_digest').notNullable();
    table.timestamps(); //creates created_at and updated_at fields
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
