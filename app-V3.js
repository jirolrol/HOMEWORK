import axios from 'axios';

(function () {
  let todos = [];
  let status = 'all';

  const inputTodo = document.getElementById('input-todo');
  const todoList = document.getElementById('todo-list');

  // V2
  // filtering
  const filterTodosByStatus = function () {
    return todos.filter(({ completed }) => {
      switch (status) {
        case 'active':
          return !completed; // completed === false
        case 'completed':
          return completed; // completed === true
        default:
          return true; // all
      }
    });
  };

  const countCompletedTodos = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const countLeftTodos = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const renderTodos = () => {
    let html = '';

    const _todos = filterTodosByStatus();

    _todos.forEach(({ id, content, completed }) => {
      const checked = completed ? 'checked' : '';
      html += `<li class="list-group-item">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${id}"></span>
          </a>
          <label class="i-checks" for="${id}">
            <input type="checkbox" id="${id}" ${checked}><i></i>
            <span>${content}</span>
          </label>
        </div>
      </li>`;
    });

    todoList.innerHTML = html;

    document.getElementById('completedTodos').innerHTML = countCompletedTodos();
    document.getElementById('activeTodos').innerHTML = countLeftTodos();
  };

  const generateTodoId = () => todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1;
  

  const getTodos = () => {
    axios.get('/todos')
      .then(({ data }) => {
        todos = data;
        renderTodos();
      })
      .catch(err => console.log(err.response));
  };

  const addTodo = content => {
    
    const payload = { id: generateTodoId(), content, completed: false };
    console.log(payload);
    axios.post('/todos', payload) 
      .then(() => {getTodos()})
      .catch(err => console.log(err));
  };

  const removeTodo = id => {
     axios.delete(`/todos/id/${id}`)
      .then(({ data }) => {
      getTodos();
    })
      .catch(err => console.log(err));
  };

  const toggleTodoComplete = id => {
    const { completed } = todos.find( todo => todo.id === +id );
    // console.log({ completed });
    axios.patch(`/todos/id/${id}`, { completed: !completed }) 
      .then(() => getTodos())
      .catch(err => console.log(err));
  };
 
  const toggleTodoAllComplete = chkStatus => {
    axios.patch('/todos', { completed: chkStatus }) 
      .then(() => getTodos())
  };
  
  const removeCompletedTodo = () => {
    axios.delete('/todos/completed')
      .then(({ data }) => {
        todos = todos.filter(todo => !todo.completed);
        renderTodos();
      })
      .catch(err => console.log(err));
  };

  // load 이벤트는 모든 리소스(image, script, css 등)의 로드가 완료하면 발생한다.
  window.addEventListener('load', getTodos);

  inputTodo.addEventListener('keyup', e => {
    if (e.keyCode !== 13 || !inputTodo.value) return;
    addTodo(inputTodo.value);
    inputTodo.value = '';
  });

  todoList.addEventListener('change', e => toggleTodoComplete(e.target.id));

  todoList.addEventListener('click', e => {
    if (!e.target || e.target.nodeName !== 'SPAN' || e.target.parentNode.nodeName === 'LABEL') return;
    removeTodo(e.target.dataset.id);
  });

  // V2
  // this를 사용하므로 arrow function을 사용 불가
  document.querySelector('.nav').addEventListener('click', function (e) {
    if (!e.target || e.target.nodeName !== 'A') return;

    // 모든 .nav > li 요소에서 active 클래스 제거
    [...this.childNodes].forEach(nav => {
      // Skip text node
      if (nav.nodeName === 'LI') {
        nav.classList.remove('active');
      }
    });

    // 클릭된 a 요소의 부모 요소(.nav > li)에 active 클래스 추가
    const selectedNav = e.target.parentNode;
    selectedNav.classList.add('active');

    status = selectedNav.id;
    renderTodos();
  });

  document.getElementById('chk-allComplete').addEventListener('change', e => {
    toggleTodoAllComplete(e.target.checked);
  });

  // 완료된 todo를 일괄 제거
  document.getElementById('btn-removeCompletedTodos').addEventListener('click', () => {
    removeCompletedTodo();
  });


}(axios));


