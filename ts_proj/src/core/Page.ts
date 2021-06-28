import { App } from "./App.js";

export abstract class Page {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	abstract show(params?: {[k: string]: string}): void;
}
