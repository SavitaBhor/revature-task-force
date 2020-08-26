import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from "../todo.service";
import { Location } from '@angular/common';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;
  completedText: string;
  unsavedVersion: Todo;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: TodoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  goBack(): void {
    this.location.back();
  }

  getTodo(): void {
    var idAsString = this.route.snapshot.paramMap.get('id');
    var id: number = +idAsString;
    this.service.getTodo(id).subscribe(todo => {
      this.todo = todo; 
      if (todo.completed) {
        this.completedText = "Task is complete"
      } else {
        this.completedText = "Not complete"
      }
    });
  }

  /** 
   * Responding to Edit button 
   * Shows the edit fields
   * Hides the value fields
  */
  editTodo(clickedTodoItem: Todo): void {
    this.unsavedVersion = Object.assign({}, clickedTodoItem);
    this.editMode = true;
  }

  /** The cancel button that show when updaing an item */
  cancelUpdateTodoItem(): void {
    this.service.clickTodoItem({id: 0, title: '', completed: false});
    this.todo = Object.assign({}, this.unsavedVersion);
    this.editMode = false;
  }

  completeTodoItem(clickedTodoItem: Todo): void {
    clickedTodoItem.completed = true;
  }

  saveTodoItem(clickedTodoItem: Todo): void {
    this.service.putTodo(clickedTodoItem).subscribe(todo => this.todo);
    this.service.clickTodoItem({id: 0, title: '', completed: false});
    this.editMode = false;
  }
}
