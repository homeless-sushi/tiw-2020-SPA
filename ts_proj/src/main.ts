import { App } from "./core/App.js";
import { Filter } from "./core/Filter.js";
import { Page } from "./core/Page.js";
import { REST_PARAM } from "./core/router/Route.js";

declare global {
	interface Window {
		app: App;
	}
}

class Page0 extends Page {
	title: string;

	constructor(app: App, {title = "Default"} = {}) {
		super(app);
		this.title = title;
	}

	show(params: any): void {
		document.title = this.title;
		console.log(params);
	}
}

class Filter0 extends Filter {
	doFilter() {
		this.app.route("/test/71");
		return false;
	}
}

class Filter1 extends Filter {
	doFilter(params: {[k: string]: string} = {}) {
		this.app.redirectTo(params[REST_PARAM] ?? "/");
		return false;
	}
}

function main() {
	const app = new App();
	window.app = app;

	app.setDefaultPage(Page0);
	app.addPageRoute("/test/:id", Page0, {title: "Test"});
	app.addPageRoute("/test/:id/rest/*", Page0, {title: "Rest"});
	app.addFilterRoute("/redirect/*", Filter1)
	app.addFilterRoute("/forward", Filter0)

	app.run();
}

window.addEventListener("DOMContentLoaded", main);
