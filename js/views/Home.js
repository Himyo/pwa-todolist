import { addTodo, getTodos } from '../routes/Todos';

const Home = (pageCtn, data) => {
    pageCtn.innerHTML = '';
    const component = document.createElement('div');
    component.innerHTML = `
        <article class="todo">
            <a>
                <h1></h1>
                <p></p>
            </a>
        </article>

    `;
    data.map(item => {
        const todo = component.querySelector('.todo').cloneNode(true);

        todo.querySelector('h1').innerHTML = item.title;
        todo.querySelector('p').innerHTML = item.description;
        todo.querySelector('a').href = `/todos/${item.id}`;

        pageCtn.append(todo);
        return todo;
    });
    pageCtn.append(makeForm());

   
    document.addEventListener('render-home', async () => {
        const pageCtn = document.querySelector('#app main [page=home]');
        const data = await getTodos();
        Home(pageCtn, data);
    });
};

const makeForm = () => {
    const form = document.createElement('div');
    form.innerHTML = `
        <form id="new-todo">
            <label for="todo-title">Title:</label>
            <input id="todo-title" type="text" name="title" required />

            <label for="todo-description">Description:</label>
            <input id="todo-description" type="text" name="description" required />

            <button id="submit" type="button">Create</button>
        </form>
    `;
    const button = form.querySelector('form#new-todo #submit');

    button.addEventListener('click', async e => {
        const form = e.target.form;
        const title = form.querySelector('#todo-title').value;
        const description = form.querySelector('#todo-description').value;

        if(!title) return;
        try {
            await addTodo({ title, description });
            document.dispatchEvent(new CustomEvent('render-home'));
        }
        catch (e) {
            alert(`Something went wrong: ${e}`);
        }
    });
    return form;
};

export default Home;