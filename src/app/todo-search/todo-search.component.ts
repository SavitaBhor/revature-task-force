import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
//import { TODOS } from '../todos';
import { TodoService } from '../todo.service';
import {TodosComponent} from '../todos/todos.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css']
})

export class TodoSearchComponent implements OnInit {
  todos$: Observable<Todo[]>;
  private searchTerms = new Subject<string>();
  title:string;
  todo:Todo;
//Arrays
  allTodos:Todo[];
  filterTodos:Todo[];


  constructor(private todoService: TodoService) {}

  search(term: string): void {
    //Search through all todos to look for matching title
    this.filterTodos = []
    for (let todo of this.allTodos) {
      if (todo.title.includes(term)) { this.filterTodos.push(todo); }
  }
  }

  ngOnInit(): void {
    //populates array with get request from api
    this.todoService.getTodos().subscribe(todos => { this.allTodos = todos; });

    this.todos$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.todoService.searchTodos(term)),
    );
  }
}
