export abstract class Template {
	async clone(): Promise<DocumentFragment> {
		const content = await this._getContent();
		return document.importNode(content, true);
	}

	abstract _getContent(): Promise<DocumentFragment>;
}

export class URLTemplate extends Template {
	private _url: string;
	private _element: HTMLTemplateElement | null = null;

	constructor(url: string) {
		super();
		this._url = url;
	}

	async _getContent() {
		if(this._element == null)
			this._element = await this._getTemplateElement();
		return this._element.content;
	}

	async _getTemplateElement(): Promise<HTMLTemplateElement> {
		const element = document.createElement("template");
		const response = await fetch(this._url);
		element.innerHTML = await response.text();
		return element;
	}
}

export class StringTemplate extends Template {
	private _element: HTMLTemplateElement;

	constructor(html: string) {
		super();
		this._element = document.createElement("template");
		this._element.innerHTML = html;
	}

	async _getContent() {
		return this._element.content;
	}
}
