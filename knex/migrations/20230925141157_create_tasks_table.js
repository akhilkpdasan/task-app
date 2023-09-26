/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('task_status').notNullable().defaultTo('open');
        table.timestamps(true, true);
    })
}
    
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tasks');
}