import { Component, Output, EventEmitter } from "@angular/core";
import { Task } from "src/Task.interface";
import { UiService } from "src/app/services/ui.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
	subscription: Subscription;
  isDisplayAddTaskComponent: boolean = false;

	constructor(private uiService: UiService) {
		this.subscription = this.uiService
			.onToggleShowAddTask()
			.subscribe((value) => (this.isDisplayAddTaskComponent = value));
	}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

	@Output() _addTask = new EventEmitter();

	toggleDisplayAddTaskComponent() {
		this.uiService.toggleAddTask();
	}
}
