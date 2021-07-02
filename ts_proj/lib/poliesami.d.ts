declare namespace PoliEsaMi {
	class Model {
		get identity(): Identity | null;

		login(user: string, password: string, keep?: boolean): Promise<APIResponse<Identity>>;
		logout(): void;

		test(): Promise<APIResponse<{"message": string}>>;
		testInside(): Promise<APIResponse<{"message": string}>>;

		getStudCoursesExams(studentId: number, year?: number): Promise<APIResponse<CourseExams[]>>;
		getStudExam(studentId: number, examId: number): Promise<APIResponse<ExamCourse>>;
		getStudExamReg(studentId: number, examId: number): Promise<APIResponse<ExamRegistration | null>>;
		registerStudToExamReg(studentId: number, examId: number): Promise<APIResponse<boolean>>;
		deregisterStudFromExamReg(studentId: number, examId: number): Promise<APIResponse<boolean>>;
		rejectStudExamReg(studentId: number, examId: number): Promise<APIResponse<boolean>>;

		getProfCoursesExams(professorId: number, year?: number): Promise<APIResponse<CourseExams[]>>;
		getProfExam(professorId: number, examId: number): Promise<APIResponse<ExamCourse>>;
		getProfExamRegistrations(professorId: number, examId: number): Promise<APIResponse<ExamRegistrationCareer[]>>;
		getProfExamRegistration(professorId: number, examId: number, studentId: number): Promise<APIResponse<ExamRegistrationCareer>>;
		getProfExamRecords(professorId: number, examId: number): Promise<APIResponse<ExamRecord[]>>;
		publishProfExamRegistrations(professorId: number, examId: number): Promise<APIResponse<boolean>>;
		verbalizeProfExamRegistrations(professorId: number, examId: number): Promise<APIResponse<boolean>>;
		editProfExamRegistrations(professorId: number, examId: number, examEvaluations: ExamEvaluation[]): Promise<APIResponse<boolean>>;
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

interface Course {
	id: number;
	name: string;
	semester: string;
	cfu: number;
	year: number;
	professorId: number;
}

interface CourseExams extends Course {
	exams: Exam[];
}

interface Exam {
	id: number;
	year: number;
	date: string;
}

interface ExamCourse extends Exam {
	course: Course;
}

type ExamStatus = 'NINS' | 'INS' | 'PUB' | 'RIF' | 'VERB';
type ExamResult = 'VUOTO' | 'ASS' | 'RM' | 'RP' | 'PASS';

interface ExamRegistration {
	studentId: number;
	examId: number;
	status: ExamStatus;
	result: ExamResult;
	grade: number;
	laude: boolean;
	resultRepresentation: string;
	recordId: number;
}

interface CareerUser extends Career {
	user: User;
}

interface ExamRegistrationCareer extends ExamRegistration {
	career: CareerUser;
}

type ExamEvaluation = [number, ExamResult, number, boolean];

interface ExamRecord {
	id: number;
	examId: number;
	time: string;
	examRegistrations: ExamRegistrationCareer[];
}

interface Storage {
	setItem(name: string, value: string, permanent: boolean): boolean;
	setItemJSON(name: string, value: any, permanent: boolean): boolean;

	getItem(name: string): string | null;
	getItemJSON(name: string): any;

	removeItem(name: string): void;
}
