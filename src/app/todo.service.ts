import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { Todo } from './Todo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // todosUrl:string = 'http://100.25.22.116:8080/todos';
  todosUrl:string = 'http://localhost:8080/todos';
  selectedTodoItem: Todo;

  selectionResponse = new BehaviorSubject<any>('');
  currentSelectedObservable = this.selectionResponse.asObservable();

  constructor(private http:HttpClient) { }

  // Get Todos
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}`);
    //return this.http.get<Todo[]>(`${this.todosUrl}`);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
  
  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Handles the user clicking on todo row
  clickTodoItem(selectedTodoItem: Todo) {
    this.selectedTodoItem = selectedTodoItem;
    this.selectionResponse.next(selectedTodoItem);
  }
}

