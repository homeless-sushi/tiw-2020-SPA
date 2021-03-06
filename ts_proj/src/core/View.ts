export class View {
	private _contentElement: HTMLElement;
	private _identityElement: HTMLElement;
	private _userElement: HTMLElement;
	private _careerElement: HTMLElement;
	private _backElement: HTMLElement;
	private _backLinkElement: HTMLAnchorElement;
	private _userText: Text = document.createTextNode("");
	private _careerText: Text = document.createTextNode("");

	constructor({
		contentID = "content",
		identityID = "identity",
		userID = "user_data",
		careerID = "career_data",
		backID = "back",
		backLinkID = "back_link",
	} = {}) {
		this._contentElement = getElementByIdOrError(document, contentID);
		this._identityElement = getElementByIdOrError(document, identityID);
		this._userElement = getElementByIdOrError(document, userID);
		this._careerElement = getElementByIdOrError(document, careerID);
		this._backElement = getElementByIdOrError(document, backID);
		this._backLinkElement = <HTMLAnchorElement>getElementByIdOrError(document, backLinkID);

		this._userElement.prepend(this._userText);
		this._careerElement.prepend(this._careerText);
		this.clearUser();
		this.clearCareer();
		this.clearBackLink();
	}

	showBackLink(text: string, href: string) {
		this._backLinkElement.innerText = text;
		this._backLinkElement.href = href;
		this._backElement.style.display = "";
	}

	clearBackLink() {
		this._backLinkElement.innerText = "";
		this._backLinkElement.href = "";
		this._backElement.style.display = "none";
	}

	showUser(user: User) {
		this._userText.data = `${user.name} ${user.surname}, ${user.personCode}`;
		this._identityElement.style.display = "";
	}

	clearUser() {
		this._userText.data = "";
		this._identityElement.style.display = "none";
		this.clearCareer();
	}

	showCareer(career: Career) {
		this._careerText.data = `${career.role[0].toUpperCase() + career.role.slice(1)}, `;
		if(career.major != null)
			this._careerText.appendData(`${career.major}, `);
		this._careerText.appendData(`${career.id}`);
		this._careerElement.style.display = "";
	}

	clearCareer() {
		this._careerText.data = "";
		this._careerElement.style.display = "none";
	}

	get content() {
		return this._contentElement;
	}
}

function getElementByIdOrError(document: Document, id: string): HTMLElement {
	const el: HTMLElement | null = document.getElementById(id);
	if(el == null)
		throw new Error("Missing element " + id);
	return el;
}
