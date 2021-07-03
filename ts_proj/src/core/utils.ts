const AC_YR_BEGIN = { month: 8, day: 1 };

export function getAcademicYear(date: Date) {
	const academicYear = date.getFullYear();
	const month = date.getMonth();
	if(month < AC_YR_BEGIN.month)
		return academicYear - 1;
	const day = date.getMonth();
	if(month == AC_YR_BEGIN.month && day < AC_YR_BEGIN.day)
		return academicYear - 1;
	return academicYear;
}
