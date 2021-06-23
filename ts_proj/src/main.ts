import { App } from "./core/App.js";
import { Filter } from "./core/Filter.js";
import { Page } from "./core/Page.js";
import { REST_PARAM } from "./core/router/Route.js";

declare global {
	interface Window {
		app: App;
	}

	interface ParentNode {
		replaceChildren(...nodes: (Node | string)[]): void;
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

class Page1 extends Page {
	title: string;

	constructor(app: App, {title = "Default"} = {}) {
		super(app);
		this.title = title;
	}

	show({text = "default"} = {}): void {
		this.app.templateEngine.process("test", {text: text})
			.then(frag => {
				this.app.view.content.appendChild(frag);
			});
	}
}

class Page2 extends Page {
	title: string;

	constructor(app: App, {title = "Default"} = {}) {
		super(app);
		this.title = title;
	}

	show({name = "Franco", surname = "Franchi", id = 0} = {}): void {
		this.app.view.showUser(<User>{name: name, surname: surname, personCode: "00000000"});
		this.app.view.showCareer(<Career>{role: "test", id: id});
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
	app.addPageRoute("/template/:text", Page1, {title: "Template"});
	app.addPageRoute("/user/:name/:surname/:id", Page2, {title: "Template"});
	app.addFilterRoute("/redirect/*", Filter1)
	app.addFilterRoute("/forward", Filter0)

	app.templateEngine.addStringTemplate("test", "<section id=\"e\"></section>", (fragment, {text = "default"} = {}) => {
		fragment.getElementById("e")!.textContent = text;
	});

	app.run();
}

window.addEventListener("DOMContentLoaded", main);
