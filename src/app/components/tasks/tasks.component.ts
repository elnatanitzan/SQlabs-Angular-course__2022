import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Task } from "../../../Task.interface";
import { TasksService } from "../../services/tasks.service";
import { UiService } from "src/app/services/ui.service";
import { Subscription } from "rxjs";

type SelectStatus = "new" | "old" | "edit";
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

	sortTasksMode: SelectStatus = "new";

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
			.subscribe((tasks: Task[]) => (this.tasks = tasks));
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
			this.tasks.push(task);
			this.uiService.toggleAddTask();
		});
	}
	//#endregion

	//#region Sorting methods:
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
			return this.filteredTasksToDisplay.sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			);
		} else if (this.sortTasksMode === "edit") {
			return this.filteredTasksToDisplay.sort(
				(a, b) =>
					new Date(b.lastEdited!).getTime() - new Date(a.lastEdited!).getTime()
			);
		}
		return this.filteredTasksToDisplay.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	}

	toggleDisplayAddTaskComponent() {
		this.uiService.toggleAddTask();
	}

	onSearchTasks(v: string) {
		const searchValue = v.trim();
		debugger;
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

	onToggleShowOnlyReminder(v: boolean) {
		this.isShowingOnlyReminderTasks = v;
	}

	onSelectOrderSorting(v: SelectStatus) {
		this.sortTasksMode = v;
	}
	//#endregion
}
