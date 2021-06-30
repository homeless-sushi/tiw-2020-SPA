import { App } from "./App.js";

export type PageCtor = new(app: App, args: any) => Page;

export abstract class Page {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	abstract show(params?: {[k: string]: string}): void;
}

export class TitlePage extends Page {
	title: string;

	constructor(app: App, {title}: {title: string}) {
		super(app);
		this.title = title;
	}

	show() {
		document.title = this.title;
	}
}
