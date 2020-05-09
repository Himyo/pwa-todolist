const TODO = 'todo';
const DOING = 'doing';
const DONE = 'donezo';

const TODOS_URL = 'http://localhost:3000/todos';
const TASKS_URL = 'http://localhost:3000/tasks';

const getStatus = n => { 
    switch(n) {
        case 0:
            return TODO;
        case 1:
            return DOING;
        default:
            return DONE;
    }
};

export { getStatus, TODO, DOING, DONE, TODOS_URL, TASKS_URL };