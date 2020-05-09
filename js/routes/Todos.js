import { TODOS_URL } from "../constants";

export const addTodo = ({ title, description }) => (
    fetch(TODOS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    }).then(res => res.json())
);

export const getTodo = id => (
    fetch(`${TODOS_URL}?id=${id}`, { method: 'GET' })
    .then(res => res.json())
);

export const getTodos = () => (
    fetch(`${TODOS_URL}`, { method: 'GET' })
    .then(res => res.json())
);