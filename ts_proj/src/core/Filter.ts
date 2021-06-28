import { App } from "./App.js";

export interface FilterResult {
	accept: boolean;
	redirect?: boolean;
	location?: string;
}

export abstract class Filter {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	abstract doFilter(params?: {[k: string]: string}): FilterResult;
}
