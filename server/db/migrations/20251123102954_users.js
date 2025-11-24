/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return await knex.schema.createTable('users', (table) => {
    table.string('auth0Id').primary()
    table.string('username')
    table.string('position')
    table.string('profile_photo')
    table.string('last_active')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return await knex.schema.dropTable('users')
}
