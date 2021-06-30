import { Router } from "./router/Router.js";
import { PageCtor } from "./Page.js";
import { FilterCtor } from "./Filter.js";
import { TemplateEngine } from "./template/TemplateEngine.js";
import { View } from "./View.js";

export class App {
	private _model: PoliEsaMi.Model | null;
	private _router: Router = new Router();
	private _templateEngine: TemplateEngine = new TemplateEngine();
	private _view: View = new View();

	private _linkClickHandlerBinded = this._linkClickHandler.bind(this);
	private _popStateHandlerBinded = this._popStateHandler.bind(this);

	constructor() {
		try {
			this._model = new PoliEsaMi.Model();
			const identity = this.identity;
			if(identity != null)
				this.view.showUser(identity.user);
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

	get templateEngine() {
		return this._templateEngine;
	}

	get view() {
		return this._view;
	}

	run(): void {
		document.body.addEventListener("click", this._linkClickHandlerBinded);
		window.addEventListener("popstate", this._popStateHandlerBinded);
		this.route();
	}

	setDefaultPage(pageType: PageCtor, args?: any): void {
		const page = new pageType(this, args);
		this.router.defaultPage = page;
	}

	addPageRoute(pattern: string, pageType: PageCtor, args?: any): void {
		const page = new pageType(this, args);
		this.router.addPageRoute(pattern, page);
	}

	addFilterRoute(pattern: string, filterType: FilterCtor, args?: any): void {
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

	get identity() {
		try {
			return this.model.identity;
		} catch(e) {
			console.error(e);
			return null;
		}
	}

	async login(user: string, password: string, keep: boolean = false): Promise<APIResponse<Identity>> {
		try {
			const res = await this.model.login(user, password, keep);
			if(res.data != null)
				this.view.showUser(res.data.user);
			return res;
		} catch(e) {
			return {error: e};
		}
	}

	logout(): void {
		try {
			this.model.logout();
		} catch(e) {
			console.error(e);
		}
		this.view.clearUser();
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
