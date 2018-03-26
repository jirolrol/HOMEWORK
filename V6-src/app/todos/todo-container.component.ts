import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  id: number;
  todos: Todo[];
  url = environment.url;

  constructor(private http: HttpClient) {
    console.log(http);
  }

  // // todo 입력폼의 값
  // content = '';
  // navigation items
  navItems = ['All', 'Active', 'Completed'];
  // 선택된 navigation item
  selectedNavItem: string;

  ngOnInit() {
    this.getTodos();
    this.selectedNavItem = this.navItems[0];
  }

  getTodos() {
    // this.todos = [
    //   { id: 3, content: 'HTML', completed: false },
    //   { id: 2, content: 'CSS', completed: true },
    //   { id: 1, content: 'Javascript', completed: false }
    // ];
    this.http.get<Todo[]>(this.url)
     .subscribe(todos => this.todos = todos);
  }

  addTodo(content) {
    const newTodo = { id: this.lastTodoId(), content, completed: false };
    this.http.post(this.url, newTodo)
      .subscribe(() => this.todos = [newTodo, ...this.todos]);
  }

  removeTodo(id: number) {
    // console.log('[removeTodo]', id);
    this.http.delete(`${this.url}/id/${id}`, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }

  removeCompletedTodos() {
    this.http.delete(`${this.url}/completed`, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }

  toggleComplete(id: number) {
    const { completed } = this.todos.find(todo => todo.id === id ); // 배열 안 객체 리턴
    // console.log('todos', todos);
    const toggleComplete = { completed: !completed };
    // console.log('toggleComplete', toggleComplete);
    this.http.patch(`${this.url}/id/${id}`, toggleComplete, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }


  toggleAllTodoAsComplete(completed: boolean) {
    this.http.patch(`${this.url}/completed`, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }

  setCurrentNavItem(selectedNavItem: string) {
    this.selectedNavItem = selectedNavItem;
  }


  getCntCompletedTodos(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getCntActiveTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  lastTodoId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }
}



