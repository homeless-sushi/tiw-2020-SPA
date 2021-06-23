import { App } from "./App.js";

export type pageCtor =  new(params?: {[k: string]: string}) => Page;

export interface Page {
	show(app: App): void;
}
