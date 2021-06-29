import { App } from "./core/App.js";
import { Page } from "./core/Page.js";
import { REST_PARAM } from "./core/router/Route.js";

declare global {
	interface Window {
		app: App;
	}
}

class Page0 implements Page {
	params: any;

	constructor(params: any) {
		this.params = params;
	}

	show(app: App): void {
		console.log(this.params);
	}
}

function main() {
	const app = new App();
	window.app = app;

	app.router.setDefaultPage(Page0, "Default");
	app.router.addPageRoute("/test/:id", Page0, "Test");
	app.router.addPageRoute("/test/:id/rest/*", Page0, "Rest");
	app.router.addFilterRoute("/redirect/*", (params = {}) => ({ accept: false, redirect: true, location: params[REST_PARAM] ?? "/"}))
	app.router.addFilterRoute("/forward", () => ({ accept: false, redirect: false, location: "/test/71"}))

	app.run();
}

window.addEventListener("DOMContentLoaded", main);
