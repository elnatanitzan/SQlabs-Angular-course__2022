import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Task } from "../../../Task.interface";
import { TasksService } from "../../services/tasks.service";

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"],
})
export class TasksComponent {
	constructor(private tasksService: TasksService) {}
	@Input() tasks!: Task[];

	@Output() _toggleReminder = new EventEmitter();
	@Output() _deleteTask = new EventEmitter();

	onToggleReminder(e: MouseEvent, task: Task): void {
		this._toggleReminder.emit(task)
	}

	deleteTask(task: Task): void {
		this._deleteTask.emit(task)
	}
}
