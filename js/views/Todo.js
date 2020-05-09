import { getStatus, TODO, DOING, DONE } from '../constants';
import { addTask, getTodoList, updateTaskStatus } from '../routes/Tasks';


const Tasks = (pageCtn, data) => {
    const { todo, tasks } = data;
    pageCtn.innerHTML = `
        <header>
            <h1> ${ todo[0].title } </h1>
            <p> ${ todo[0].description } </p>
            <a href="/">Home</a>
        </header>
        <div class="row todo-item">
            <div class="column ${TODO}">
                <div class='title'>
                    <p class="status">TODO</p>
                </div>
                <div class="task-list">
                </div>
            </div>

            <div class="column ${DOING}">
                <div class='title'>
                    <p class="status"> DOING </p>
                </div>
                <div class="task-list">
                </div>
            </div>

            <div class="column ${DONE}">
                <div class='title'>
                    <p class="status">DONEZO</p>
                </div>
                <div class="task-list">
                </div>
            </div>
        </div>

        <form id="new-task">
            <label for="task-content">Content:</label>
            <textarea id="task-content" type="text" name="content" required></textarea>

            <label for="task-status">Status:</label>
            <select id="task-status" name="status">
                <option value=1>TODO<option/>
                <option value=2>DOING<option/>
                <option value=3>DONEZO<option/>
            </select>
            <button id="submit" type="button">Create</button>
        </form>

    `;

    const component = document.createElement('div');
    component.innerHTML = `
        <article class="task">
            <span class="task-id"></span>
            <p class="task-content"></p>
        </article>

    `;

    Object.keys(tasks).map( key => {
        const item = tasks[key];

        const task = component.querySelector('.task').cloneNode(true);
        task.querySelector('span').innerHTML = item.id;
        task.querySelector('p').innerHTML = item.content;
        registerTaskListeners(task, item);

        pageCtn.querySelector(`.column.${getStatus(item.status)} .task-list`).append(task);
        return task;
    });

    document.addEventListener('render-tasks', async () => {
        const pageCtn = document.querySelector('#app main [page=todos]');
        const data = await getTodoList(todo[0].id);
        console.log(data);
        Tasks(pageCtn, data);
    });

    registerButtonListeners(pageCtn, todo[0].id);
};
const registerTaskListeners = (task, item) => {
    task.addEventListener('click', async e => {
        try {
            await updateTaskStatus(item); 
            document.dispatchEvent(new CustomEvent('render-tasks'));
        }
        catch (e) {
            alert(`Something went wrong: ${e}`);
        }
    });
};

const registerButtonListeners = (pageCtn, todosId) => {
    const button = pageCtn.querySelector('form#new-task button');

    button.addEventListener('click', async e => {
        const form = e.target.form;
        const content = form.querySelector('#task-content').value;
        const status = form.querySelector('#task-status').value;

        if(!content || ! status) return;
        try {
            await addTask({ todosId, status, content });
            document.dispatchEvent(new CustomEvent('render-tasks'));
        }
        catch (e) {
            alert(`Something went wrong: ${e}`);
        }
    });
};

export default Tasks;