exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('username', 128).notNullable()
        table.string('password').notNullable()
        table.string('department', 128).notNullable()
    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
