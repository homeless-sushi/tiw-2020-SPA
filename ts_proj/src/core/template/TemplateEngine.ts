import { Template, StringTemplate, URLTemplate } from "./Template.js";

export class TemplateEngine {
	private _templates: Map<string, Template> = new Map();
	pathPrefix: string = "";
	pathSuffix: string = "";

	addTemplate(name: string, template: Template): void {
		this._templates.set(name, template);
	}

	addURLTemplate(name: string): void {
		this.addTemplate(name, new URLTemplate(this.pathPrefix + name + this.pathSuffix));
	}

	addStringTemplate(name: string, html: string): void {
		this.addTemplate(name, new StringTemplate(html));
	}

	removeTemplate(name: string): void {
		this._templates.delete(name);
	}

	async get(templateName: string): Promise<DocumentFragment> {
		const template = this._templates.get(templateName);
		if(template == null)
			throw new Error(`Template name ${templateName} not defined`);
		return template.clone();
	}
}
