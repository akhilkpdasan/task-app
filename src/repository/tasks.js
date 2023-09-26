const { Knex } = require('knex');
const knex = require('../../knex/knex.js');


exports.createTask = async function(title, description) {
    return knex('tasks').insert({title, description});
}

exports.updateTask = async function(taskid, updatedData) {
    return knex('tasks').where({id: taskid}).update({
        ...updatedData,
        updated_at: knex.raw('CURRENT_TIMESTAMP')
      });
}

exports.getTasks = async function(limit, offset) {
    return knex('tasks').select().limit(limit).offset(offset);

}

exports.getMetricsByMonth = async function() {
    return knex('tasks')
    .select(knex.raw('YEAR(created_at) as year'),
      knex.raw('MONTHNAME(created_at) as month'),
      knex.raw('SUM(CASE WHEN task_status = "open" THEN 1 ELSE 0 END) as open_tasks'),
      knex.raw('SUM(CASE WHEN task_status = "inprogress" THEN 1 ELSE 0 END) as inprogress_tasks'),
      knex.raw('SUM(CASE WHEN task_status = "complete" THEN 1 ELSE 0 END) as completed_tasks')
    )
    .groupByRaw('1, 2')
    .orderByRaw('1, 2');
}

exports.getMetrics = async function() {
    return knex.select('task_status').from('tasks').count('* as task_count').groupBy('task_status');
}