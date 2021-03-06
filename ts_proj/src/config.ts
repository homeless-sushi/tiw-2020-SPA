import { FilterCtor } from "./core/Filter.js";
import { PageCtor, RedirectPage } from "./core/Page.js";
import { getAcademicYear } from "./core/utils.js";
import { CareerFilter, InsideFilter } from "./filters.js";
import { CareersPage, DefaultPage, StudentExamRegistrationPage, LoginPage, LogoutPage, ProfessorExamsPage, StudentExamsPage, ProfExamRegistrationsPage, ProfEditExamPage, RecordsPage } from "./pages.js";

export const defaultPage: [PageCtor, any?] = [DefaultPage, {title: "Not Found"}];

export const pages: [string, PageCtor, any?][] = [
	["/", RedirectPage, {location: "inside/"}],
	["/login", LoginPage],
	["/logout", LogoutPage, {location: "login"}],
	["/inside", RedirectPage, {location: "inside/"}],
	["/inside/", RedirectPage, {location: "careers"}],
	["/inside/careers", CareersPage],
	["/inside/student/:id", RedirectPage, {location: ({id}: {id: string}) => `${id}/`}],
	["/inside/student/:id/", RedirectPage, {location: "exams/"}],
	["/inside/student/:id/exams", RedirectPage, {location: "exams/"}],
	["/inside/student/:id/exams/", RedirectPage, {location: () => `${getAcademicYear(new Date())}`}],
	["/inside/student/:id/exams/exam", RedirectPage, {location: "."}],
	["/inside/student/:id/exams/exam/", RedirectPage, {location: ".."}],
	["/inside/student/:id/exams/:year", StudentExamsPage],
	["/inside/student/:id/exams/exam/:examId", RedirectPage, {location: ({examId}: {examId: string}) => `${examId}/`}],
	["/inside/student/:id/exams/exam/:examId/", StudentExamRegistrationPage],
	["/inside/professor/:id", RedirectPage, {location: ({id}: {id: string}) => `${id}/`}],
	["/inside/professor/:id/", RedirectPage, {location: "exams/"}],
	["/inside/professor/:id/exams", RedirectPage, {location: "exams/"}],
	["/inside/professor/:id/exams/", RedirectPage, {location: () => `${getAcademicYear(new Date())}`}],
	["/inside/professor/:id/exams/exam", RedirectPage, {location: "."}],
	["/inside/professor/:id/exams/exam/", RedirectPage, {location: ".."}],
	["/inside/professor/:id/exams/:year", ProfessorExamsPage],
	["/inside/professor/:id/exams/exam/:examId", RedirectPage, {location: ({examId}: {examId: string}) => `${examId}/`}],
	["/inside/professor/:id/exams/exam/:examId/", ProfExamRegistrationsPage],
	["/inside/professor/:id/exams/exam/:examId/reg/:studentId", ProfEditExamPage],
	["/inside/professor/:id/exams/exam/:examId/records", RecordsPage],
];

export const filters: [string, FilterCtor, {[k: string]: string}?][] = [
	["/inside/*", InsideFilter],
	["/inside/student/:id/*", CareerFilter, {role: "student"}],
	["/inside/professor/:id/*", CareerFilter, {role: "professor"}],
];

export const templatesPrefix = "/static/templates/";
export const templatesSuffix = ".html";

export const templates: string[] = [
	"login",
	"careers",
	"exams",
	"exam_tab",
	"registrations",
	"single_edit",
	"exam_unregistered",
	"exam_unpublished",
	"exam_evaluation",
	"records",
];
