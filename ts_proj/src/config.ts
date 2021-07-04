import { FilterCtor } from "./core/Filter.js";
import { PageCtor, RedirectPage } from "./core/Page.js";
import { getAcademicYear } from "./core/utils.js";
import { CareerFilter, InsideFilter } from "./filters.js";
import { CareersPage, DefaultPage, StudentExamRegistrationPage, LoginPage, LogoutPage, ProfessorExamsPage, StudentExamsPage, ProfEditExamPage } from "./pages.js";

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
	["/inside/student/:id/exams/exam", RedirectPage, {location: "."}],
	["/inside/student/:id/exams/exam/", RedirectPage, {location: ".."}],
	["/inside/student/:id/exams/:year", StudentExamsPage, {title: "Exams"}],
	["/inside/student/:id/exams/exam/:examId", StudentExamRegistrationPage, {title: "Exam Registration"}],
	["/inside/professor/:id", RedirectPage, {location: ({id}: {id: string}) => `${id}/`}],
	["/inside/professor/:id/", RedirectPage, {location: "exams/"}],
	["/inside/professor/:id/exams", RedirectPage, {location: "exams/"}],
	["/inside/professor/:id/exams/", RedirectPage, {location: () => `${getAcademicYear(new Date())}`}],
	["/inside/professor/:id/exams/:year", ProfessorExamsPage, {title: "Exams"}],
	["/inside/professor/:id/exams/exam/:examId/reg/:studentId", ProfEditExamPage, {title: "Edit Exam Registration"}],
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
	["exam_tab", "exam_tab.html"],
	["single_edit", "single_edit.html"],
];
