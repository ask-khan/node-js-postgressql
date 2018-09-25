import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoTitle = "Todo List";
  todos: Todo[];
  constructor(private todoservice: TodoService) { }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList(): void {
    this.todoservice.getTodoLists()
      .subscribe(todos => this.todos = todos.data);
  }

  delete( todoId: number ): void {
    this.todos = this.todos.filter(h => h.todo_id !== todoId); 
    this.todoservice.deleteTodoList( todoId ).subscribe();
  }

  add( todoName: string ): void {
    this.todoservice.addTodoList( todoName ).subscribe(
      todo => this.todos.push( todo.data ) );
  }

}
