import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
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
  searchType:string;
//Arrays
  allTodos:Todo[];
  filterTodos:Todo[];


  constructor(private todoService: TodoService) {}


  searchSet(lookFor:string):void{
this.searchType =lookFor;
  }
  searchTitle(term: string): void {
    //Search through all todos to look for matching title
    this.filterTodos = [];
    for (let todo of this.allTodos) {
      if (todo.title.toUpperCase().includes(term.toUpperCase())) { this.filterTodos.push(todo); }
  }
  }
  searchActive(term: string): void {
    //Search through all todos to look for if they are completed or not
    this.filterTodos = [];
    let isItDone:Boolean;
    if(term.toUpperCase() == 'TRUE'||term.toUpperCase() == 'YES')
    {
   
    isItDone = true;
  }
  else if(term.toUpperCase() == 'FALSE'||term.toUpperCase() == 'NO')
  {
    isItDone = false;

  }
  
    for (let todo of this.allTodos) {
      if (todo.completed===isItDone) { this.filterTodos.push(todo); }
    }

  }
  searchId(term: number): void {
    //Search through all todos to look for matching id
    this.filterTodos = [];
    for (let todo of this.allTodos) {
      if (todo.id.valueOf()==term.valueOf()) { this.filterTodos.push(todo); }
  }
  }
  findall():void {
    //Search through all todos to look for matching title
    this.filterTodos = [];
    for (let todo of this.allTodos) {
       this.filterTodos.push(todo); 
  
  }
}
  ngOnInit(): void {
    //populates array with get request from api
    this.todoService.getTodos().subscribe(todos => { this.allTodos = todos; });
    this.searchType = 'Title';
    this.todos$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.todoService.searchTodos(term)),
    );
  }
}
