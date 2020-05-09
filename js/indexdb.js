import { openDB } from 'idb';

const init = async () => {
    const db = await openDB('todosDB', 1, {
        upgrade(db) {
            db.createObjectStore('todos');
            db.createObjectStore('tasks');
        }
    });
};