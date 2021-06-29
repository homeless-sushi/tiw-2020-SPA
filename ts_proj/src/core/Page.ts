import { App } from "./App.js";

export type PageCtor = new(app: App, args?: {[k: string]: any}) => Page;

export abstract class Page {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	abstract show(params?: {[k: string]: string}): void;
}
