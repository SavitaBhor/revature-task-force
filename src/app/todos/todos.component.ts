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
  selectedTodo: Todo;
  unsavedVersion: Todo;
  

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
    this.todoService.currentSelectedObservable.subscribe((val) => { this.selectedTodo = val; });
    
  }

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => { this.todos = todos; });
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
  
  /** Responding to Edit button */
  editTodo(clickedTodoItem: Todo): void {
    this.todoService.clickTodoItem(clickedTodoItem);
    this.unsavedVersion = Object.assign({}, clickedTodoItem);
  }

  /** The cancel button that show when updaing an item */
  cancelUpdateTodoItem(): void {
    this.todoService.clickTodoItem({id: 0, title: '', completed: false});
    for (var idx in this.todos) {
      if (this.unsavedVersion.id === this.todos[idx].id) {
        this.todos[idx] = Object.assign({}, this.unsavedVersion);
      }
    }
  }

  completeTodoItem(clickedTodoItem: Todo): void {
    clickedTodoItem.completed = true;
  }

  saveTodoItem(clickedTodoItem: Todo): void {
    this.todoService.putTodo(clickedTodoItem).subscribe(todo => this.getTodos());
    this.todoService.clickTodoItem({id: 0, title: '', completed: false});
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }
}