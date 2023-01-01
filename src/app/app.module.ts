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

const appRoutes: Routes = [
	{ path: "", component: TasksComponent },
	{ path: "about", component: AboutComponent },
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
