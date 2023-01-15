import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import type { Task } from "../../../Task.interface";

@Component({
	selector: "app-edit-task",
	templateUrl: "./edit-task.component.html",
	styleUrls: ["./edit-task.component.css"],
})
export class EditTaskComponent {
	task!: Task;
	taskId: string | null;

	constructor(
		private tasksService: TasksService,
		private activatedRoute: ActivatedRoute
	) {
		this.taskId = this.activatedRoute.snapshot.paramMap.get("id");
		if (this.taskId != null) {
			this.tasksService.getTaskById(this.taskId).subscribe((task) => {
				this.task = task;
			});
		}
	}

	onFinishEdit(task: Task) {
		this.tasksService.editTask(task).subscribe((task) => (this.task = task));
	}
}
