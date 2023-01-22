import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "kababCase",
})
export class KababCasePipe implements PipeTransform {
	transform(value: string, ...options: string[]): string {
		if (options.some((option) => option === "toLowerCase")) {
			return value.replaceAll(" ", "-").toLowerCase();
		}
		return value.replaceAll(" ", "-");
	}
}
