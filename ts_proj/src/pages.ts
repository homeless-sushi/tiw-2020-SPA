import { Page } from "./core/Page.js";

declare global {
	interface ParentNode {
		replaceChildren(...nodes: (Node | string)[]): void;
	}
}

export class DefaultPage extends Page {
	show() {
		this.app.view.content.innerHTML = "<section>PAGE NOT FOUND</section>";
	}
}
