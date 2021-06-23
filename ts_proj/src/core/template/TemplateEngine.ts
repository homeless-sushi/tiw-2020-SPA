import { Template, StringTemplate, URLTemplate, templateParams, templateResolver } from "./Template.js";

export class TemplateEngine {
	private _templates: Map<string, Template> = new Map();

	addTemplate(name: string, template: Template): void {
		this._templates.set(name, template);
	}

	addURLTemplate(name: string, url: string, resolver: templateResolver): void {
		this.addTemplate(name, new URLTemplate(url, resolver));
	}

	addStringTemplate(name: string, html: string, resolver: templateResolver): void {
		this.addTemplate(name, new StringTemplate(html, resolver));
	}

	removeTemplate(name: string): void {
		this._templates.delete(name);
	}

	async process(templateName: string, params?: templateParams): Promise<DocumentFragment> {
		const template = this._templates.get(templateName);
		if(template == null)
			throw new Error(`Template name ${templateName} not defined`);
		return template.resolve(params);
	}
}
