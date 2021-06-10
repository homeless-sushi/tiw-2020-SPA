export const REST_PARAM = "__rest__";

export class Route {
	private _path: string;
	private _matchPath: RegExp;

	constructor(path: string){
		this._path = path;
		this._matchPath = _initPathRegEx(this._path);
	}

	match(path: string): RegExpMatchArray | null {
		return path.match(this._matchPath);
	}

	getPath(params: {[k: string]: string}) : string {
		return this._path
			.replace(/\/:(\w+)/g, (_, pname: string): string => {
				const param = params[pname];
				if(param == null)
					throw new Error("Missing parameter " + pname);
				return "/" + param;
			})
			.replace(/\/\*$/, params[REST_PARAM] || "");
	}
}

function _initPathRegEx(path: string): RegExp {
	return new RegExp(
		"^"
		+ path
			.replace(/\/:(\w+)/g, "/(?<$1>\\w+)")
			.replace(/\/\*$/, "(?<" + REST_PARAM + ">(?:/.*)?)")
		+ "$"
	);
}
