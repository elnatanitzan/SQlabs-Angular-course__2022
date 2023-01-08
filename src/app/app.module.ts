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
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

const appRoutes: Routes = [
	{ path: "", redirectTo: "tasks", pathMatch: "full" },
	{ path: "about", component: AboutComponent },
	{ path: "tasks", component: TasksComponent },
	{ path: "tasks/edit-task/:id", component: EditTaskComponent },
	{ path: "**", component: NotFoundComponent },
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
		AboutComponent,
  NotFoundComponent,
  EditTaskComponent,
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
