import { Component, Output, EventEmitter } from "@angular/core";
import { Task } from "src/Task.interface";
import { UiService } from "src/app/services/ui.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
	subscription: Subscription;
	isDisplayAddTaskComponent: boolean = false;

	appTitle = "Task Reminder";

	liveClock = new Date();
	intervalClock: NodeJS.Timer | undefined;

	constructor(private uiService: UiService, private router: Router) {
		this.subscription = this.uiService
			.onToggleShowAddTask()
			.subscribe((value) => (this.isDisplayAddTaskComponent = value));
	}

	ngOnInit() {
		this.intervalClock = setInterval(() => this.liveClock = new Date(), 1000);
	}

	ngOnDestroy() {
		if (this.intervalClock) {
			clearInterval(this.intervalClock);
			this.intervalClock = undefined;
		}
		this.subscription.unsubscribe();
	}

	@Output() _addTask = new EventEmitter();

	toggleDisplayAddTaskComponent() {
		this.uiService.toggleAddTask();
	}

	isInTasksRoute(route: string) {
		return this.router.url === route;
	}
}
