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
}
