import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { TodoFilterPipe } from '../../todo-filter.pipe';

// 부모에게서 todos중 어떤 것이 completed: true 인지 completed: false인지를 정보를 받아야 한다.

@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent {
  @Input() navItems: string[]; // 부모가 준 프로퍼티 명과 같은 명으로 받는다.
  @Input() selectedNavItem: string;
  @Output() changeCurrenttNavItem = new EventEmitter();

  // ngOnInit() {
  //   console.log(this.navItems);
  //   console.log(this.selectedNavItem);
  // }
}
