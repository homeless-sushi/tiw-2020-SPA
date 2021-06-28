import { Filter, FilterResult } from "../Filter.js";
import { Page } from "../Page.js";
import { Route } from "./Route.js";

export class Router {
	private _filterRoutes: FilterRoute[] = [];
	private _pageRoutes: PageRoute[] = [];
	private _defaultPage?: Page;
	private _defaultTitle?: string;

	route(pathname: string): HistoryStackElem {
		for(const filterRoute of this._filterRoutes) {
			const match = filterRoute.route.match(pathname);
			if(match == null)
				continue;
			const result: FilterResult = filterRoute.filter.doFilter(match.groups);
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
			if(match != null) {
				pageRoute.page.show(match.groups);
				return {
					title: pageRoute.title || "",
					url: pathname
				};
			}
		}

		return this._getDefaultRoute(pathname);
	}

	setDefaultPage(page: Page, title?: string): void {
		this._defaultPage = page;
		this._defaultTitle = title;
	}

	addPageRoute(path: string, page: Page, title?: string): void {
		this._pageRoutes.push({
			route: new Route(path),
			page: page,
			title: title
		});
	}

	addFilterRoute(path: string, filter: Filter): void {
		this._filterRoutes.push({
			route: new Route(path),
			filter: filter
		});
	}

	_getDefaultRoute(pathname: string): HistoryStackElem {
		if(this._defaultPage == null)
			throw new Error("No route found");

		this._defaultPage.show();
		return {
			title: this._defaultTitle || "",
			url: pathname
		};
	}
}

export interface FilterRoute {
	route: Route,
	filter: Filter
}

export interface PageRoute {
	route: Route,
	page: Page,
	title?: string
}

export interface HistoryStackElem {
	title: string;
	url?: string | null;
}
