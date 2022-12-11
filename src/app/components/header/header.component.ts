import { Component, Output, EventEmitter } from "@angular/core";
import { Task } from "src/Task.interface";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent {

  @Output() _addTask = new EventEmitter();

	text: string = "abc";

  addTask(task: Task): void {
    this._addTask.emit(task);
  }

}
