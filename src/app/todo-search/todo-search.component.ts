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

  constructor(private todoService: TodoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
        console.log(term);
        //this.todoService.searchTodos(term);
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.todos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.todoService.searchTodos(term)),
    );
  }
}
