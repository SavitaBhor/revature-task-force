import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  selectedTodo: Todo = {id: 0, title: '', completed: false};
  

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
    this.todoService.currentSelectedObservable.subscribe((val) => { this.selectedTodo = val; });
  }

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.todoService.addTodo({ title } as Todo)
      .subscribe(todo => {
        //this.todos.push(todo);
        this.getTodos();
      });
      
  }
  
  editTodo(clickedTodoItem: Todo): void {
    this.todoService.clickTodoItem(clickedTodoItem);
  }

  cancelUpdateTodoItem(): void {
    this.todoService.clickTodoItem(null);
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }
}