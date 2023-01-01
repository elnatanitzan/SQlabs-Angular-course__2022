import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Task } from "../../../Task.interface";
import { TasksService } from "../../services/tasks.service";
import { UiService } from "src/app/services/ui.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"],
})
export class TasksComponent {
	subscription: Subscription;
	isDisplayAddTaskComponent: boolean = false;
	
	constructor(
		private tasksService: TasksService,
		private uiService: UiService
	) {
		this.subscription = this.uiService
			.onToggleShowAddTask()
			.subscribe((value) => (this.isDisplayAddTaskComponent = value));
	}

	tasks: Task[] = [];

	ngOnInit(): void {
		this.tasksService
			.getTasks()
			.subscribe((tasks: Task[]) => (this.tasks = tasks));
	}

	@Output() _toggleReminder = new EventEmitter();
	@Output() _deleteTask = new EventEmitter();

	//#region HttpRequest:
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

	toggleDisplayAddTaskComponent() {
		this.uiService.toggleAddTask();
	}

	addTask(task: Task): void {
		this.tasksService.addNewTask(task).subscribe(() => {
			this.tasks.push(task);
			this.uiService.toggleAddTask();
		});
	}
	//#endregion
}
