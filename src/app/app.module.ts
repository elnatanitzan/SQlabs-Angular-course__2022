import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// COMPONENTS REGION:
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { ButtonComponent } from "./components/button/button.component";
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { SortTasksComponent } from "./components/sort-tasks/sort-tasks.component";
import { KababCasePipe } from "./pipes/kabab-case.pipe";

const appRoutes: Routes = [
	{ path: "", redirectTo: "tasks", pathMatch: "full" },
	{
		path: "about",
		loadComponent: () =>
			import("./components/about/about.component").then(
				(module) => module.AboutComponent
			),
	},
	{ path: "tasks", component: TasksComponent },
	{ path: "tasks/edit-task/:id", component: EditTaskComponent },
	{
		path: "**",
		loadComponent: () =>
			import("./components/not-found/not-found.component").then(
				(module) => module.NotFoundComponent
			),
	},
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		TasksComponent,
		TaskItemComponent,
		ButtonComponent,
		AddTaskComponent,
		EditTaskComponent,
		SortTasksComponent,
		KababCasePipe,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FontAwesomeModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
