import { Component } from "@angular/core";
import { Task } from "../../../Task.interface";
import { TasksService } from "../../services/tasks.service";

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"],
})
export class TasksComponent {
	constructor(private tasksService: TasksService) {}
	tasks: Task[] = [];

	ngOnInit(): void {
		this.tasksService
			.getTasks()
			.subscribe((tasks: Task[]) => (this.tasks = tasks));
	}

	onToggleReminder(e: MouseEvent, task: Task): void {
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
}
