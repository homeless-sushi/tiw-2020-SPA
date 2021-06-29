import { App } from "./App.js";

export type FilterCtor = new(app: App, args?: {[k: string]: any}) => Filter;

export abstract class Filter {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	abstract doFilter(params?: {[k: string]: string}): boolean;
}
