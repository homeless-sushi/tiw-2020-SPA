import { App } from "./core/App.js";
import * as config from "./config.js";

declare global {
	interface Window {
		app: App;
	}
}

function main() {
	const app = new App();
	window.app = app;

	app.setDefaultPage(...config.defaultPage);
	for(const page of config.pages)
		app.addPageRoute(...page);
	for(const filter of config.filters)
		app.addFilterRoute(...filter);

	const te = app.templateEngine;
	te.pathPrefix = config.templatesPrefix;
	te.pathSuffix = config.templatesSuffix;
	for(const template of config.templates)
		te.addURLTemplate(template);

	app.run();
}

window.addEventListener("DOMContentLoaded", main);
