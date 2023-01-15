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
	@Output() _toggleReminder = new EventEmitter();
	@Output() _deleteTask = new EventEmitter();

	tasks: Task[] = [];
	filteredTasks: Task[] = [];

	sortTasksMode: "old" | "new" = "new";

	subscription: Subscription;

	isDisplayAddTaskComponent: boolean = false;
	isShowingOnlyReminderTasks: boolean = false;
	hasNoResults: boolean = false;

	constructor(
		private tasksService: TasksService,
		private uiService: UiService
	) {
		this.subscription = this.uiService
			.onToggleShowAddTask()
			.subscribe((value) => (this.isDisplayAddTaskComponent = value));
	}

	ngOnInit(): void {
		this.tasksService
			.getTasks()
			.subscribe((tasks: Task[]) => (this.tasks = tasks.reverse()));
	}

	get filteredTasksToDisplay(): Task[] {
		if (this.filteredTasks.length) {
			if (this.isShowingOnlyReminderTasks) {
				return this.filteredTasks.filter((task) => task.reminder);
			}
			return this.filteredTasks;
		}

		if (this.isShowingOnlyReminderTasks) {
			return this.tasks.filter((task) => task.reminder);
		}
		return this.tasks;
	}

	get tasksToDisplay(): Task[] {
		if (this.sortTasksMode === "old") {
			return this.filteredTasksToDisplay.reverse();
		}
		return this.filteredTasksToDisplay;
	}

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

	addTask(task: Task): void {
		this.tasksService.addNewTask(task).subscribe(() => {
			this.tasks.unshift(task);
			this.uiService.toggleAddTask();
		});
	}

	toggleDisplayAddTaskComponent() {
		this.uiService.toggleAddTask();
	}

	onSearchTasks(e: Event) {
		const searchValue = (e.target as HTMLInputElement).value.toLowerCase();
		if (searchValue) {
			const searchResult = this.tasks.filter((task) =>
				task.text.toLowerCase().startsWith(searchValue)
			);
			this.hasNoResults = searchResult.length ? false : true;
			this.filteredTasks = searchResult;
		} else {
			this.hasNoResults = false;
			this.filteredTasks = [];
		}
	}
	//#endregion
}
