import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Input() selectedNavItem: string;
  @Output() remove = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();

  // ngOnInit() {
  //   console.log(this.todos);
  //   console.log(this.selectedNavItem);
  // }
}
