import { FilterCtor } from "./core/Filter.js";
import { PageCtor } from "./core/Page.js";
import { CareerFilter, InsideFilter } from "./filters.js";
import { CareersPage, DefaultPage, InsidePage, LoginPage, LogoutPage } from "./pages.js";

export const defaultPage: [PageCtor, any?] = [DefaultPage, {title: "Not Found"}];

export const pages: [string, PageCtor, any?][] = [
	["/login", LoginPage, {title: "Login"}],
	["/logout", LogoutPage],
	["/inside", InsidePage, {title: "Inside"}],
	["/inside/careers", CareersPage, {title: "Careers"}],
];

export const filters: [string, FilterCtor, {[k: string]: string}?][] = [
	["/inside/*", InsideFilter],
	["/inside/student/:id/*", CareerFilter, {role: "student"}],
	["/inside/professor/:id/*", CareerFilter, {role: "professor"}],
];

export const templatesPath = "/static/templates/";

export const templates: [string, string][] = [
	["login", "login.html"],
	["careers", "careers.html"],
];
