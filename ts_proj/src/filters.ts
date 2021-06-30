import { App } from "./core/App.js";
import { Filter } from "./core/Filter.js";

export class InsideFilter extends Filter {
	doFilter() {
		if(this.app.identity != null)
			return true;
		this.app.redirectTo("/login");
		return false;
	}
}

export class CareerFilter extends Filter {
	role: string;

	constructor(app: App, {role}: {role: string}) {
		super(app);
		this.role = role;
	}

	doFilter({id}: {id: string}) {
		const careers = this.app.identity!.careers;
		const career = careers.find((c: Career) => c.id as unknown as string == id && c.role == this.role);
		if(career != null) {
			this.app.view.showCareer(career);
			return true;
		}
		this.app.redirectTo("/inside/careers");
		return false;
	}
}
