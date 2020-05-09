import { TASKS_URL } from '../constants';
import { getTodo } from './Todos';

export const updateTaskStatus = item => (
    fetch(`${TASKS_URL}/${item.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...item, status: (item.status + 1) % 3 })
    }).then(res => res.json())
);
export const addTask = ({ todosId, status, content }) => (
    fetch(TASKS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todosId , status, content })
    }).then(res => res.json())
);
export const getTask = id => (
    fetch(`${TASKS_URL}?todosId=${id}`, { method: 'GET' })
    .then(res => res.json())
);

export const getTodoList = id => (
    Promise.all([
        getTodo(id),
        getTask(id)
    ]).then(res => {
        return { 'todo': {...res[0] }, 'tasks': { ...res[1] } }
    })
);