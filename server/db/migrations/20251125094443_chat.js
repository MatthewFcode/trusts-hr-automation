/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('chat', (table) => {
    table.increments('id').primary()
    table.string('message')
    table.string('message_auth0Id').references('users.auth0Id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return await knex.schema.dropTable('chat')
}
