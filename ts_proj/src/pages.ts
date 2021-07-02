import { RedirectPage, TitlePage } from "./core/Page.js";

declare global {
	interface ParentNode {
		replaceChildren(...nodes: (Node | string)[]): void;
	}
}

export class DefaultPage extends TitlePage {
	show() {
		super.show();
		this.app.view.content.innerHTML = "<section>PAGE NOT FOUND</section>";
	}
}

export class LoginPage extends TitlePage {
	show() {
		super.show();
		this.app.templateEngine.get("login")
			.then(frag => {
				const form = <HTMLFormElement>frag.getElementById("loginForm");
				form.addEventListener("submit", (e) => {
					e.preventDefault();
					this._login();
				});
				this.app.view.content.replaceChildren(frag);
			});
	}

	_login(): void {
		this.app.login(
			(<HTMLInputElement>document.getElementById("person_code")).value,
			(<HTMLInputElement>document.getElementById("password")).value,
			(<HTMLInputElement>document.getElementById("all_day")).checked)
			.then(({data, error}) => {
				if(error == null)
					this.app.navigateTo("/inside/careers");
				else
					console.error(error);
			})
	}
}

export class LogoutPage extends RedirectPage {
	show() {
		this.app.logout();
		super.show();
	}
}

export class CareersPage extends TitlePage {
	show() {
		super.show();
		this.app.templateEngine.get("careers")
			.then(frag => {
				this._fill(frag);
				this.app.view.content.replaceChildren(frag);
			});
	}

	_fill(frag: DocumentFragment) {
		const table = <HTMLTableElement>frag.getElementById("careers_tbody");
		const careers = this.app.identity!.careers;
		for(const career of careers) {
			const tr = table.insertRow();
			tr.insertCell().innerText = career.id as unknown as string;
			const role = tr.insertCell();
			role.innerText = career.role[0].toUpperCase() + career.role.slice(1);
			if(career.major != null)
				tr.insertCell().innerText = career.major;
			else
				role.colSpan = 2;
			const link_td = tr.insertCell();
			const link_a = document.createElement("a");
			link_a.className = "symbol data-link";
			link_a.href = `${career.role}/${career.id}/`;
			link_a.innerText = "➡";
			link_td.appendChild(link_a);
		}
	}
}
