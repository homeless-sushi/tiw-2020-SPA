import { FilterCtor } from "./core/Filter.js";
import { PageCtor } from "./core/Page.js";
import { templateResolver } from "./core/template/Template.js";
import { Filter0, Filter1 } from "./filters.js";
import { Page0, Page1, Page2 } from "./pages.js";

export const defaultPage: [PageCtor, {[k: string]: string}?] = [Page0];

export const pages: [string, PageCtor, {[k: string]: string}?][] = [
	["/test/:id", Page0, {title: "Test"}],
	["/test/:id/rest/*", Page0, {title: "Rest"}],
	["/template/:text", Page1, {title: "Template"}],
	["/user/:name/:surname/:id", Page2, {title: "Template"}]
];

export const filters: [string, FilterCtor, {[k: string]: string}?][] = [
	["/redirect/*", Filter1],
	["/forward", Filter0]
];

export const templatesPath = "/static/templates/";

export const templates: [string, string, templateResolver][] = [
	["test", "test.html", (fragment, {text = "default"} = {}) => {
		fragment.getElementById("e")!.textContent = text;
	}]
];
