import { FilterCtor } from "./core/Filter.js";
import { PageCtor } from "./core/Page.js";
import { InsideFilter } from "./filters.js";
import { DefaultPage, InsidePage, LoginPage, LogoutPage } from "./pages.js";

export const defaultPage: [PageCtor, any?] = [DefaultPage, {title: "Not Found"}];

export const pages: [string, PageCtor, any?][] = [
	["/login", LoginPage, {title: "Login"}],
	["/logout", LogoutPage],
	["/inside", InsidePage, {title: "Inside"}],
];

export const filters: [string, FilterCtor, {[k: string]: string}?][] = [
	["/inside/*", InsideFilter],
];

export const templatesPath = "/static/templates/";

export const templates: [string, string][] = [
	["login", "login.html"],
];
