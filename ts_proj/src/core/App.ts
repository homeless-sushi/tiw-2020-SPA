import { Router } from "./router/Router.js";
import { PageCtor } from "./Page.js";
import { FilterCtor } from "./Filter.js";

export class App {
	private _model: PoliEsaMi.Model | null;
	private _router: Router = new Router();

	private _linkClickHandlerBinded = this._linkClickHandler.bind(this);
	private _popStateHandlerBinded = this._popStateHandler.bind(this);

	constructor() {
		try {
			this._model = new PoliEsaMi.Model();
		} catch(e) {
			console.error("Remote interface not present");
			this._model = null;
		}
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
		this.route();
	}

	setDefaultPage(pageType: PageCtor, args?: {[k: string]: any}): void {
		const page = new pageType(this, args);
		this.router.defaultPage = page;
	}

	addPageRoute(pattern: string, pageType: PageCtor, args?: {[k: string]: any}): void {
		const page = new pageType(this, args);
		this.router.addPageRoute(pattern, page);
	}

	addFilterRoute(pattern: string, filterType: FilterCtor, args?: {[k: string]: any}): void {
		const filter = new filterType(this, args);
		this.router.addFilterRoute(pattern, filter);
	}

	navigateTo(url: string): void {
		history.pushState(null, "", url);
		this.route();
	}

	redirectTo(url: string): void {
		history.replaceState(null, "", url);
		this.route();
	}

	route(url: string = location.pathname): void {
		this.router.route(url);
	}

	_linkClickHandler(e: MouseEvent): void {
		const link = <Element>e.target;
		if(!link.matches("a.data-link"))
			return;
		e.preventDefault();
		this.navigateTo((<HTMLAnchorElement>link).pathname);
	}

	_popStateHandler(e: PopStateEvent): void {
		this.route();
	}
}
