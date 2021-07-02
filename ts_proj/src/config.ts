import { FilterCtor } from "./core/Filter.js";
import { PageCtor } from "./core/Page.js";
import { templateResolver } from "./core/template/Template.js";
import {  } from "./filters.js";
import { DefaultPage } from "./pages.js";

export const defaultPage: [PageCtor, {[k: string]: string}?] = [DefaultPage];

export const pages: [string, PageCtor, {[k: string]: string}?][] = [
];

export const filters: [string, FilterCtor, {[k: string]: string}?][] = [
];

export const templatesPath = "/static/templates/";

export const templates: [string, string, templateResolver][] = [
];
