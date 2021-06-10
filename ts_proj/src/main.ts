import "http://localhost:8080/polimi-tiw-2020-project/api/poliesami.js";
import { App } from "./App.js";
import { Page } from "./Page.js";
import { REST_PARAM } from "./router/Route.js";

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
	const app = new App("/tiw-2020-SPA");
	window.app = app;

	app.router.setDefaultPage(Page0, "Default");
	app.router.addPageRoute("/test/:id", Page0, "Test");
	app.router.addPageRoute("/test/:id/rest/*", Page0, "Rest");
	app.router.addFilterRoute("/redirect/*", (params = {}) => ({ accept: false, redirect: true, location: params[REST_PARAM] ?? "/"}))
	app.router.addFilterRoute("/forward", () => ({ accept: false, redirect: false, location: "/test/71"}))

	app.run();

	app.model.test()
		.then(r => display("base", r));
	app.model.testInside()
		.then(r => display("not logged in", r));
	app.model.login("00000001", "SciamanoGiurassico39")
		.then(id => { display("id", id); return app.model.testInside(); })
		.then(r => display("logged in", r));
}

function display(m: string, r: APIResponse<any>) {
	if(r.error != null)
		console.log(m, r.error);
	else
		console.log(m, r.data);
}

window.addEventListener("DOMContentLoaded", main);
