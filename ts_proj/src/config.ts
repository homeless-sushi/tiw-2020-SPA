import { FilterCtor } from "./core/Filter.js";
import { PageCtor, RedirectPage } from "./core/Page.js";
import { getAcademicYear } from "./core/utils.js";
import { CareerFilter, InsideFilter } from "./filters.js";
import { CareersPage, DefaultPage, LoginPage, LogoutPage, StudentExamsPage } from "./pages.js";

export const defaultPage: [PageCtor, any?] = [DefaultPage, {title: "Not Found"}];

export const pages: [string, PageCtor, any?][] = [
	["/", RedirectPage, {location: "inside/"}],
	["/login", LoginPage, {title: "Login"}],
	["/logout", LogoutPage, {location: "login"}],
	["/inside", RedirectPage, {location: "inside/"}],
	["/inside/", RedirectPage, {location: "careers"}],
	["/inside/careers", CareersPage, {title: "Careers"}],
	["/inside/student/:id", RedirectPage, {location: ({id}: {id: string}) => `${id}/`}],
	["/inside/student/:id/", RedirectPage, {location: "exams/"}],
	["/inside/student/:id/exams", RedirectPage, {location: "exams/"}],
	["/inside/student/:id/exams/", RedirectPage, {location: () => `${getAcademicYear(new Date())}`}],
	["/inside/student/:id/exams/:year", StudentExamsPage, {title: "Exams"}],
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
	["exams", "exams.html"],
];
