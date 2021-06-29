import { Filter } from "../Filter.js";
import { Page } from "../Page.js";
import { Route } from "./Route.js";

export class Router {
	private _filterRoutes: FilterRoute[] = [];
	private _pageRoutes: PageRoute[] = [];
	defaultPage?: Page;

	route(pathname: string): void {
		for(const filterRoute of this._filterRoutes) {
			const match = filterRoute.route.match(pathname);
			if(match == null)
				continue;
			const pass: boolean = filterRoute.filter.doFilter(match.groups);
			if(!pass)
				return;
		}

		for(const pageRoute of this._pageRoutes) {
			const match = pageRoute.route.match(pathname);
			if(match == null)
				continue;
			pageRoute.page.show(match.groups);
			return;
		}

		if(this.defaultPage == null)
			throw new Error("No route found for " + pathname);

		this.defaultPage.show();
	}

	addPageRoute(path: string, page: Page): void {
		this._pageRoutes.push({
			route: new Route(path),
			page: page
		});
	}

	addFilterRoute(path: string, filter: Filter): void {
		this._filterRoutes.push({
			route: new Route(path),
			filter: filter
		});
	}
}

export interface FilterRoute {
	route: Route,
	filter: Filter
}

export interface PageRoute {
	route: Route,
	page: Page
}
