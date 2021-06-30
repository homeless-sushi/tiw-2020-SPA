import { Filter } from "./core/Filter.js";

export class InsideFilter extends Filter {
	doFilter() {
		if(this.app.identity != null)
			return true;
		this.app.redirectTo("/login");
		return false;
	}
}
