import { Component } from '@angular/core';
import { Task } from '../../../Task.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(private tasksService: TasksService) {}
  tasks: Task[] = [];

  ngOnInit(): void {
    this.tasksService
      .getTasks()
      .subscribe((tasks: Task[]) => (this.tasks = tasks));
  }
}
