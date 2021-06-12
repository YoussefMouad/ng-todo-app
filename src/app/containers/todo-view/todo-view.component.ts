import { Component } from '@angular/core';
import { TodoListItem } from '@shared/interfaces';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent {

  constructor() { }

  public onNewItem(item: TodoListItem) {
    console.log(item);
  }

}
