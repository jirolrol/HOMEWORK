var todos = [];
var inputTodo = document.getElementById('input-todo');
var todoList = document.getElementById('todo-list');
// console.log(inputTodo);
// console.log(todoList);

function generateId(){
    return todos.length ? Math.max.apply(null, todos.map(function(todo){
        return todo.id;
    })) + 1 : 1;
};

function addTodo(content){
    todos = todos.concat({ id: generateId(), content: content, completed: false });
};

function toggleCompletedById(id) {
    todos = todos.map(function (todo) {
        return todo.id === +id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    console.log('[TOGGLE TODO] ', todos);
}

function renderTodos(){
    var html = '';
    if(!todos.length) {
        return;
    }
    todos.forEach(function(todo){
        var checked = todo.completed ? 'checked' : '';
        html += '<li class="list-group-item">';
        html += '<div class="hover-anchor">';
        html += '<a class="hover-action text-muted">';
        html += '<span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '">';
        html += '</span>' + '</a>';
        html += '<label class="i-checks" for="' + todo.id + '">';
        html += '<input type="checkbox" id="' + todo.id + '"' + checked + '>';
        html += '<i>' + '</i>';
        html += '<span>' + todo.content + '</span>';
        html += '</label>' + '</div>' + '</li>'; 
    });
    todoList.innerHTML = html;
};

inputTodo.addEventListener('keyup', function(e){

 if (e.keyCode !== 13 || !this.value) return;


 addTodo(this.value);
 renderTodos();
 this.value = '' 
 
 });


window.addEventListener('load', function(e){
    todos = [
        { id: 1, content: 'HTML', completed: true },
        { id: 2, content: 'CSS', completed: false },
        { id: 3, content: 'Javascript', completed: false }
    ];
    renderTodos();
});

todoList.addEventListener('click', function(e){
    // if(e.target && e.target.nodeName === 'LABEL'){
    //     toggleCompletedById(e.target.firstChild.id);
    // };
    // if (e.target && e.target.nodeName === 'I'){
    //     console.log('I가 실행될때',e.target.previousSibling);
    //     toggleCompletedById(e.target.previousSibling.id);
    // };
    // if (e.target && e.target.nodeName === 'SPAN'){
    //     toggleCompletedById(e.target.previousSibling.previousSibling.id);   
    // };
    if (e.target && (e.target.nodeName === 'LABEL' || e.target.parentNode.nodeName === 'LABEL')) {
        var id = -1;
        if (e.target.nodeName === 'LABEL') {
            id = e.target.firstChild.id;
        } else {
            id = e.target.parentNode.firstChild.id;
        }
        console.log('id', id);
        toggleCompletedById(id);

    }
    
        
    renderTodos();

    // console.dir('그냥 클릭될때',e.target);
});