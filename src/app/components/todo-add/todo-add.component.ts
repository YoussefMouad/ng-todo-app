import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListItem } from '@shared/interfaces';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent {

  @Output() private newItem = new EventEmitter<TodoListItem>();

  public form: FormGroup = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  public onSubmit(): void {
    this.newItem.emit(this.form.value);
  }
}
