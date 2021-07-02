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
	title: string | ((params?: {[k: string]: string}) => string);

	constructor(app: App, {title}: {title: string}) {
		super(app);
		this.title = title;
	}

	show(params?: {[k: string]: string}) {
		const title = typeof this.title === "function" ?
			this.title(params) :
			this.title;
		document.title = title;
	}
}

export class RedirectPage extends Page {
	location: string | ((params?: {[k: string]: string}) => string);

	constructor(app: App, {location}: {location: string}) {
		super(app);
		this.location = location;
	}

	show(params?: {[k: string]: string}) {
		const location = typeof this.location === "function" ?
			this.location(params) :
			this.location;
		this.app.redirectTo(location);
	}
}
