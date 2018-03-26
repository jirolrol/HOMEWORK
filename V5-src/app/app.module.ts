import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoFilterPipe } from './todo-filter.pipe';
import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoNavComponent } from './todos/todo-nav/todo-nav.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoFilterPipe,
    TodoContainerComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoNavComponent,
    TodoFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
