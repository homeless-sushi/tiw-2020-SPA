import { Page, pageCtor } from "../Page.js";
import { Route } from "./Route.js";

export class Router {
	private _filterRoutes: FilterRoute[] = [];
	private _pageRoutes: PageRoute[] = [];
	private _defaultPage?: pageCtor;
	private _defaultTitle?: string;

	route(pathname: string): HistoryStackElem {
		for(const filterRoute of this._filterRoutes) {
			const match = filterRoute.route.match(pathname);
			if(match == null)
				continue;
			const result: FilterResult = filterRoute.filter(match.groups);
			if(!result.accept) {
				if(result.location == null)
					return this._getDefaultRoute(pathname);
				const reroute = this.route(result.location);
				if(!result.redirect)
					reroute.url = pathname;
				return reroute;
			}
		}

		for(const pageRoute of this._pageRoutes) {
			const match = pageRoute.route.match(pathname);
			if(match != null)
				return {
					page: new pageRoute.page(match.groups),
					title: pageRoute.title || "",
					url: pathname
				};
		}

		return this._getDefaultRoute(pathname);
	}

	setDefaultPage(page: pageCtor, title?: string): void {
		this._defaultPage = page;
		this._defaultTitle = title;
	}

	addPageRoute(path: string, page: pageCtor, title?: string): void {
		this._pageRoutes.push({
			route: new Route(path),
			page: page,
			title: title
		});
	}

	addFilterRoute(path: string, filter: filterFn): void {
		this._filterRoutes.push({
			route: new Route(path),
			filter: filter
		});
	}

	_getDefaultRoute(pathname: string): HistoryStackElem {
		if(this._defaultPage == null)
			throw new Error("No route found");

		return {
			page: new this._defaultPage(),
			title: this._defaultTitle || "",
			url: pathname
		};
	}
}

export type filterFn = (params?: {[k: string]: string}) => FilterResult;

export interface FilterRoute {
	route: Route,
	filter: filterFn
}

export interface FilterResult {
	accept: boolean;
	redirect?: boolean;
	location?: string;
}

export interface PageRoute {
	route: Route,
	page: pageCtor,
	title?: string
}

export interface HistoryStackElem {
	page: Page;
	title: string;
	url?: string | null;
}
