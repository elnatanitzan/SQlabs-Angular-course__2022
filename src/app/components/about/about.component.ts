import { Component } from "@angular/core";
import { KababCasePipe } from "src/app/pipes/kabab-case.pipe";

@Component({
	selector: "app-about",
	template: `
		<div class="container">
			<h1>About Task Reminder</h1>
			<p>
				This application created in a joint effort of thr students as part of
				the
				<strong>Angular</strong> course provided by SQLabs College in the winter
				2022-2023.
				<br />
				During the course we practiced many of the basic features in the process
				of creating a <strong>SPA</strong>
				(<strong>S</strong>ingle
				<strong>P</strong>age <strong>A</strong>pplication) using the
				<strong>Angular</strong> framework.
			</p>
		</div>
	`,
	standalone: true,
	styles: [
		`
			.container {
				max-width: 60%;
				margin: 0 auto;
			}
		`,
	],
})
export class AboutComponent {}
