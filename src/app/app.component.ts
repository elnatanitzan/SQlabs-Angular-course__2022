import { Component } from '@angular/core';
import { Task } from "./../Task.interface";
import { TasksService } from "./services/tasks.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private tasksService: TasksService) {}
  tasks: Task[] = [];

  ngOnInit(): void {
		this.tasksService
			.getTasks()
			.subscribe((tasks: Task[]) => (this.tasks = tasks));
	}

  onToggleReminder(task: Task): void {
		task.reminder = !task.reminder;
		this.tasksService.toggleTaskReminder(task).subscribe();
	}

  deleteTask(task: Task): void {
		this.tasksService
			.deleteTask(task)
			.subscribe(
				() => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
			);
	}

  addTask(task: Task): void {
    console.log(task);
  }
}
