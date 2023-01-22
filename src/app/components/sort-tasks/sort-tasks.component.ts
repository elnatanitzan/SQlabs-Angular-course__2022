import { Component, Output, EventEmitter } from "@angular/core";

type SelectStatus = "new" | "old" | "edit";

@Component({
	selector: "app-sort-tasks",
	templateUrl: "./sort-tasks.component.html",
	styleUrls: ["./sort-tasks.component.css"],
})
export class SortTasksComponent {
	@Output() _onSearchTasks = new EventEmitter();
	@Output() _onSelect = new EventEmitter();
	@Output() _onToggle = new EventEmitter();

	isDisplayAddTaskComponent: boolean = false;
	isShowingOnlyReminderTasks: boolean = false;
	hasNoResults: boolean = false;
	sortTasksMode: SelectStatus = "new";

	onSearchTasks(e: Event) {
		const searchValue = (e.target as HTMLInputElement).value;
		this._onSearchTasks.emit(searchValue);
	}

	onSelect() {
		this._onSelect.emit(this.sortTasksMode);
	}

	onToggle() {
		this._onToggle.emit(this.isShowingOnlyReminderTasks);
	}
}
