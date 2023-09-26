const taskRepo = require('../repository/tasks')

const addTask = async (req, res) => {
    //Creates a new task given task title and description
    const title = req.body.title;
    const description = req.body.description;

    if (!title) {
        res.status(400);
        res.send({'message': 'Title cannot be empty'});
        return;
    }

    if (!description) {
        res.status(400);
        res.send({'message': 'Description cannot be empty'});
        return;
    }

    const response = await taskRepo.createTask(title, description)
    res.send({id: response[0], title, description})
}

const updateTask = async (req, res) => {
    //Given a task id updates the task details using
    //data passed in request body
    if (!req.params.id) {
        res.status(400);
        res.send({'message': 'Task ID is madatory'});
        return;
    }

    if (req.body.task_status) {
        if (!['open', 'inprogress', 'complete'].includes(req.body.task_status)) {
            res.status(400);
            res.send({'message': 'Invalid task_status'});
        }
    }

    //TODO: validate rest of the req body

    const response = await taskRepo.updateTask(req.params.id, req.body)
    if (response === 0) {
        res.status(400);
        res.send({'message': 'Task ID is invalid'});
        return;
    }

    res.send({'message': 'Task updated successfuly'})
}

const getTasks = async (req, res) => {
    //Returns a paginated list of tasks
    //page number and size can be passed in query params
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    if (page < 1) {
        res.status(400);
        res.send({'message': 'Bad page number'});
        return;
    }

    if (limit < 1) {
        res.status(400);
        res.send({'message': 'Bad page limit'});
        return;
    }

    const task = await taskRepo.getTasks(limit, (limit * (page - 1)));
    res.send(task);
}

const getTasksMetrics = async (req, res) => {
    let monthWise = req.query.monthWise;


    //If momthwise param is not passed
    //we fetch task grouped by their status
    //else we fetch tasks grouped by month and status
    console.log(monthWise);
    if (!monthWise ||  monthWise == 'false') {
        const dbResult = await taskRepo.getMetrics();
        const formattedResults = {}
        dbResult.forEach((result) => {
            formattedResults[result['task_status']] = result['task_count']
        });

        res.send(formattedResults);
        return;

    } else {
        const dbResult = await taskRepo.getMetricsByMonth();
        const formattedResults = dbResult.map((result) => ({
            date: `${result.month} ${result.year}`,
            metrics: {
              open: result.open_tasks,
              inprogress: result.inprogress_tasks,
              complete: result.completed_tasks,
            },
          }));
          return res.send(formattedResults)
    }

}


module.exports =  {
    addTask,
    updateTask,
    getTasks,
    getTasksMetrics
};