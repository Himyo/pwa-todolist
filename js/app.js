import page from 'page';
import { getTodos } from './routes/Todos';
import { getTodoList } from './routes/Tasks';


const setView = (pageCtn, pages) => {
    pages.forEach(page => page.removeAttribute('active'));
    pageCtn.setAttribute('active', true);
}; 
const setTitle = title => {
    const docTitle = document.head.querySelector('title');
    document.title = `${docTitle.dataset.base} - ${title}`;
} 
const setStyle = name => {
    const isset = document.head.querySelectorAll(`#${name}`).length;
    if(!isset) {
        const style = document.createElement('link');
        style.id = name;
        style.rel = 'stylesheet';
        style.href = `/styles/${name}.css`;
        document.head.appendChild(style);
    }
}

(async () => {
    const app = document.querySelector('#app main');

    const homeCtn = app.querySelector('[page=home]');
    const todoCtn = app.querySelector('[page=todos]');
  
    const pages = [
      homeCtn,
      todoCtn
    ];

    page('/', async (ctx) => {
        const module = await import('./views/Home.js');
        const Home = module.default;

        const data = await getTodos();

        Home(homeCtn, data);
        setTitle('Home');
        setStyle('home');
        setView(homeCtn, pages);
    });

    page('/todos/:id', async (ctx) => {
        const module = await import('./views/Todo.js');
        const Todo = module.default;
        
        const data = await getTodoList(ctx.params.id);

        Todo(todoCtn, data);
        setTitle('Todos')
        setStyle('todo');
        setView(todoCtn, pages);
    });
    
    page();
})();