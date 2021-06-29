import { Filter } from "./core/Filter.js";
import { REST_PARAM } from "./core/router/Route.js";

export class Filter0 extends Filter {
	doFilter() {
		this.app.route("/test/71");
		return false;
	}
}

export class Filter1 extends Filter {
	doFilter(params: {[k: string]: string} = {}) {
		this.app.redirectTo(params[REST_PARAM] ?? "/");
		return false;
	}
}
