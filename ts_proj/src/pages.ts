import { App } from "./core/App.js";
import { Page } from "./core/Page.js";

declare global {
	interface ParentNode {
		replaceChildren(...nodes: (Node | string)[]): void;
	}
}

export class Page0 extends Page {
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

export class Page1 extends Page {
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

export class Page2 extends Page {
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
