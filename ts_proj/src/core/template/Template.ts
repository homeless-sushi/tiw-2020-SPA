export abstract class Template {
	private _resolver: templateResolver;

	constructor(resolver: templateResolver = () => { /* NOOP */}) {
		this._resolver = resolver;
	}

	async resolve(params?: templateParams): Promise<DocumentFragment> {
		const content = await this._getContent();
		const cloned = document.importNode(content, true);
		this._resolver(cloned, params);
		return cloned;
	}

	abstract _getContent(): Promise<DocumentFragment>;
}

export class URLTemplate extends Template {
	private _url: string;
	private _element: HTMLTemplateElement | null = null;

	constructor(url: string, resolver?: templateResolver) {
		super(resolver);
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

	constructor(html: string, resolver?: templateResolver) {
		super(resolver);
		this._element = document.createElement("template");
		this._element.innerHTML = html;
	}

	async _getContent() {
		return this._element.content;
	}
}

export type templateParams = {[k: string]: any};
export type templateResolver = (fragment: DocumentFragment, params?: templateParams) => void;
