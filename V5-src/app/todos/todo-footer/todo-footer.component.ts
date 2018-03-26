import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  @Input() getactive: number;
  @Input() getcompleted: number;
  @Output() toggleAllToCompleted = new EventEmitter();
  @Output() deleteCompletedTodo = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
