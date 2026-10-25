export type UserRole = 'student' | 'faculty';

export interface User {
  id: string;
  role: UserRole;
  username: string;
  password?: string;
  linkedProfileId: string;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  admissionNo: string;
  classId: string;
  section: string;
  dob: string;
  guardianName: string;
  avatar: string;
  academicYear: string;
  contactEmail: string;
  contactPhone: string;
}

export interface PortfolioSkill {
  id: string;
  name: string;
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  year: string;
  description: string;
}

export interface PortfolioActivity {
  id: string;
  title: string;
  role: string;
  year: string;
}

export interface PortfolioCertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  fileName?: string;
}

export interface StudentPortfolio {
  studentId: string;
  bio: string;
  skills: PortfolioSkill[];
  achievements: PortfolioAchievement[];
  activities: PortfolioActivity[];
  certificates: PortfolioCertificate[];
}

export interface Faculty {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface ClassRoom {
  id: string;
  grade: number;
  section: string;
  classTeacherId: string;
  roomNo: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface FacultyAssignment {
  id: string;
  facultyId: string;
  classId: string;
  subjectId: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface TimetableEntry {
  id: string;
  classId: string;
  day: DayOfWeek;
  period: number;
  startTime: string;
  endTime: string;
  subjectId: string;
  facultyId: string;
  isBreak?: boolean;
}

export type AttendanceStatus = 'Present' | 'Absent';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  markedBy: string;
}

export interface Exam {
  id: string;
  name: string;
  classId: string;
  date: string;
  academicYear: string;
}

export interface ExamSubject {
  examId: string;
  subjectId: string;
  maxMarks: number;
}

export type ResultStatus = 'Draft' | 'Published';

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  subjectId: string;
  marks: number;
  status: ResultStatus;
  enteredBy: string;
  updatedAt: string;
}

export type NoticeCategory = 'Academic' | 'Exam' | 'Event' | 'Holiday' | 'General';

export interface Notice {
  id: string;
  title: string;
  description: string;
  category: NoticeCategory;
  date: string; // YYYY-MM-DD
  authorId: string;
  authorName: string;
}

export type DocumentType =
  | 'Bonafide Certificate'
  | 'Scholarship Document'
  | 'Transfer Certificate'
  | 'Character Certificate'
  | 'Fee Certificate';

export type DocumentRequestStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Ready for Collection';

export interface DocumentRequest {
  id: string;
  studentId: string;
  studentName?: string;
  studentRollNo?: string;
  className?: string;
  type: DocumentType;
  purpose: string;
  copies: number;
  dateRequested: string; // YYYY-MM-DD
  status: DocumentRequestStatus;
  remark?: string;
  updatedBy?: string;
}

export interface AppState {
  users: User[];
  students: Student[];
  portfolios: Record<string, StudentPortfolio>;
  faculty: Faculty[];
  classes: ClassRoom[];
  subjects: Subject[];
  facultyAssignments: FacultyAssignment[];
  timetable: TimetableEntry[];
  attendance: AttendanceRecord[];
  exams: Exam[];
  examSubjects: ExamSubject[];
  results: Result[];
  notices: Notice[];
  documentRequests: DocumentRequest[];
}
