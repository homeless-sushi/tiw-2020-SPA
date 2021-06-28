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
	show(params: any): void {
		console.log(params);
	}
}

class Filter0 extends Filter {
	doFilter() {
		return {accept: false, redirect: false, location: "/test/71"};
	}
}

class Filter1 extends Filter {
	doFilter(params: {[k: string]: string} = {}) {
		return { accept: false, redirect: true, location: params[REST_PARAM] ?? "/"};
	}
}

function main() {
	const app = new App();
	window.app = app;

	app.setDefaultPage(Page0, "Default");
	app.addPageRoute("/test/:id", Page0, "Test");
	app.addPageRoute("/test/:id/rest/*", Page0, "Rest");
	app.addFilterRoute("/redirect/*", Filter1)
	app.addFilterRoute("/forward", Filter0)

	app.run();
}

window.addEventListener("DOMContentLoaded", main);
