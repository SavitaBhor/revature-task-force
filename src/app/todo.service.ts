import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { Observable, BehaviorSubject, throwError, observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  selectedTodoItem: Todo;
  selectionResponse = new BehaviorSubject<any>('');
  currentSelectedObservable = this.selectionResponse.asObservable();

  todosUrl:string ='http://localhost:8080/todos'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

   /** GET todos from the server */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
    

  }

  /** PUT hero by id. Alertboxes with any error. */
  putTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.todosUrl, todo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /** POST: add a new hero to the server */
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`;
  
    return this.http.delete<Todo>(url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  /** For letting all the todo items know who is selected */
  clickTodoItem(selectedTodoItem: Todo) {
    this.selectionResponse.next(selectedTodoItem);
  }
}
