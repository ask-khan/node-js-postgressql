import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private todoURl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getTodoLists(): Observable<{}> {
    
    const url = `${this.todoURl}` + 'gettodo';
    return this.http.get<{}>(url)
      .pipe(
        tap(heroes => console.log('fetch heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  deleteTodoList( todoId: number ): Observable<{}> {
    
    const url = `${this.todoURl}` + 'deletetodo/' + todoId ;
    return this.http.get<{}>(url)
      .pipe(
        tap(heroes => console.log('fetch heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  addTodoList ( todoName: string ): Observable<{}> {
    
    const url = `${this.todoURl}` + 'addtodo';
    const todoObject = { "addtodo": todoName }
    return this.http.post<{}>(url, todoName, httpOptions)
      .pipe(
        tap((todo: Todo) => console.log(`added hero w/ id=${todo.todo_id}`)),
        catchError(this.handleError<{}>('addHero'))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user con/sumption
     // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }

}
