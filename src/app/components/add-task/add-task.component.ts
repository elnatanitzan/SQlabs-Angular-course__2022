import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Task } from "src/Task.interface";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.component.html",
	styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent {
	@Output() _addTask = new EventEmitter();
	@Output() _onFinishEdit = new EventEmitter();
	@Input() taskToEdit?: Task;

	text: string = "";
	reminder: boolean = false;
	buttonText = "Create Task";

	ngOnInit(): void {
		if (this.taskToEdit) {
			this.text = this.taskToEdit.text;
			this.reminder = this.taskToEdit.reminder;
			this.buttonText = "Done";
		}
	}

	onSubmit(e: SubmitEvent): void {
		if (!this.taskToEdit) {
			const createDate = new Date().toLocaleString();
			const newTask: Task = {
				id: Math.random().toString(36),
				text: this.text.trim(),
				date: createDate,
				reminder: this.reminder,
				lastEdited: createDate,
			};
			this._addTask.emit(newTask);
		} else {
			const editedTask: Task = {
				id: this.taskToEdit.id,
				text: this.text.trim(),
				date: this.taskToEdit.date,
				reminder: this.reminder,
				lastEdited: new Date().toLocaleString(),
			};
			this._onFinishEdit.emit(editedTask);
		}
	}
}
