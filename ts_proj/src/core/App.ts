import { Router } from "./router/Router.js";

export class App {
	private _path: string;
	private _model: PoliEsaMi.Model | null;
	private _router: Router = new Router();

	private _linkClickHandlerBinded = this._linkClickHandler.bind(this);
	private _popStateHandlerBinded = this._popStateHandler.bind(this);

	constructor(path: string) {
		this._path = path;
		try {
			this._model = new PoliEsaMi.Model();
		} catch(e) {
			console.error("Remote interface not present");
			this._model = null;
		}
		this.router.pathPrefix = this._path;
	}

	get path() {
		return this._path;
	}

	get model() {
		if(this._model == null)
			throw new Error("Remote interface not present");
		return this._model;
	}

	get router() {
		return this._router;
	}

	run(): void {
		document.body.addEventListener("click", this._linkClickHandlerBinded);
		window.addEventListener("popstate", this._popStateHandlerBinded);
		history.replaceState(...this._route(location.pathname));
	}

	navigateTo(path: string): void {
		history.pushState(...this._route(path));
	}

	_route(path: string): [any, string, string | null | undefined] {
		const {page, title, url} = this.router.route(path);
		document.title = title;
		page.show(this);
		return [null, title, url];
	}

	_linkClickHandler(e: MouseEvent): void {
		const link = <Element>e.target;
		if(!link.matches("a.data-link"))
			return;
		e.preventDefault();
		this.navigateTo((<HTMLAnchorElement>link).pathname);
	}

	_popStateHandler(e: PopStateEvent): void {
		this._route(location.pathname);
	}
}
