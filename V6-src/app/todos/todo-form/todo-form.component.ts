import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  content: string;
  @Output() enterTodo = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  addTodo(content) {
    if (!content) { return; }
    this.enterTodo.emit(content);
    this.content = '';

    // (enterTodo)=addTodo($event);
    // console.log(content);
    // if (!this.content) { return; }
    // const newTodo = { id: this.lastTodoId(), content: this.content, completed: false };
    // this.todos = [newTodo, ...this.todos];
    // this.content = '';
  }

}
