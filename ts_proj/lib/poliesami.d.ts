declare namespace PoliEsaMi {
	class Model {
		get identity(): Identity | null;

		async login(user: string, password: string, keep: boolean = false): Promise<APIResponse<Identity>>;
		logout(): void;

		async test(): Promise<APIResponse<{"message": string}>>;
		async testInside(): Promise<APIResponse<{"message": string}>>;
	}

	const storage: Storage;
}

interface APIResponse<T> {
	data?: T;
	error?: APIError;
}

interface APIError {
	message: string;
	cause?: APIError;
}

interface Identity {
	jwt: string;
	user: User;
	careers: Career[];
}

interface User {
	personCode: string;
	email: string;
	name: string;
	surname: string;
}

interface Career {
	id: number;
	role: string;
	major?: string;
}

interface Storage {
	setItem(name: string, value: string, permanent: boolean): boolean;
	setItemJSON(name: string, value: any, permanent: boolean): boolean;

	getItem(name: string): string | null;
	getItemJSON(name: string): any;

	removeItem(name: string): void;
}
