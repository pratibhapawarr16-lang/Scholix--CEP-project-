import { AppState, User, Student, Faculty, StudentPortfolio, Notice, DocumentRequest, AttendanceRecord, Result, TimetableEntry } from '../types';
import { INITIAL_STATE } from '../data/seedData';

const STORAGE_KEY = 'scholix_demo_app_state_v1';

class DataService {
  private state: AppState;
  private backendAvailable: boolean | null = null;

  constructor() {
    this.state = this.loadFromStorage();
    this.checkBackend();
  }

  private loadFromStorage(): AppState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.students && parsed.classes) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage, falling back to seed data:', e);
    }
    this.saveToStorage(INITIAL_STATE);
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  private saveToStorage(state: AppState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  private async checkBackend(): Promise<boolean> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        this.backendAvailable = true;
        // Also fetch live state from backend to sync
        const stateRes = await fetch('/api/state');
        if (stateRes.ok) {
          const body = await stateRes.json();
          if (body.data) {
            this.state = body.data;
            this.saveToStorage(this.state);
          }
        }
        return true;
      }
    } catch (e) {
      this.backendAvailable = false;
    }
    return false;
  }

  public isBackendOnline(): boolean {
    return !!this.backendAvailable;
  }

  public getState(): AppState {
    return this.state;
  }

  public async resetData(): Promise<AppState> {
    try {
      if (this.backendAvailable) {
        await fetch('/api/reset', { method: 'POST' });
      }
    } catch (e) {
      console.warn('Backend reset call failed, falling back to local reset:', e);
    }

    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.saveToStorage(this.state);
    return this.state;
  }

  public async authenticate(username: string, password: string, role: 'student' | 'faculty') {
    // Try backend first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        const err = await res.json();
        throw new Error(err.message || 'Authentication failed');
      }
    } catch (e: any) {
      // If server error or offline, fallback to local state
      if (e.message && !e.message.includes('fetch')) {
        throw e;
      }
    }

    // Local fallback check
    const user = this.state.users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase().trim() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid username or password.');
    }

    if (user.role !== role) {
      throw new Error(`Account role mismatch. This account is registered as ${user.role}.`);
    }

    let profile: Student | Faculty | undefined;
    if (user.role === 'student') {
      profile = this.state.students.find((s) => s.id === user.linkedProfileId);
    } else {
      profile = this.state.faculty.find((f) => f.id === user.linkedProfileId);
    }

    return {
      success: true,
      token: `demo-token-${user.id}`,
      user,
      profile,
    };
  }

  // Student Portfolio
  public getPortfolio(studentId: string): StudentPortfolio {
    if (this.state.portfolios && this.state.portfolios[studentId]) {
      return this.state.portfolios[studentId];
    }
    // Return empty template if not found
    return {
      studentId,
      bio: '',
      skills: [],
      achievements: [],
      activities: [],
      certificates: [],
    };
  }

  public async savePortfolio(studentId: string, portfolio: StudentPortfolio): Promise<boolean> {
    if (!this.state.portfolios) {
      this.state.portfolios = {};
    }
    this.state.portfolios[studentId] = { ...portfolio, studentId };
    this.saveToStorage(this.state);

    try {
      fetch(`/api/students/${studentId}/portfolio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio),
      }).catch(() => {});
    } catch (e) {}

    return true;
  }

  // Attendance
  public getAttendanceForClass(classId: string, date?: string): AttendanceRecord[] {
    return this.state.attendance.filter(
      (a) => a.classId === classId && (!date || a.date === date)
    );
  }

  public getAttendanceForStudent(studentId: string): AttendanceRecord[] {
    return this.state.attendance
      .filter((a) => a.studentId === studentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  public async saveAttendance(classId: string, date: string, records: { studentId: string; status: 'Present' | 'Absent' }[], markedBy: string): Promise<boolean> {
    // Remove existing for that class and date
    this.state.attendance = this.state.attendance.filter(
      (a) => !(a.classId === classId && a.date === date)
    );

    const newRecs: AttendanceRecord[] = records.map((r, idx) => ({
      id: `att-${Date.now()}-${idx}`,
      studentId: r.studentId,
      classId,
      date,
      status: r.status,
      markedBy,
    }));

    this.state.attendance.push(...newRecs);
    this.saveToStorage(this.state);

    try {
      fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId, date, records, markedBy }),
      }).catch(() => {});
    } catch (e) {}

    return true;
  }

  // Results
  public getResultsForExam(examId: string, subjectId: string): Result[] {
    return this.state.results.filter(
      (r) => r.examId === examId && r.subjectId === subjectId
    );
  }

  public getResultsForStudent(studentId: string): Result[] {
    return this.state.results.filter((r) => r.studentId === studentId && r.status === 'Published');
  }

  public async saveResults(
    examId: string,
    subjectId: string,
    results: { studentId: string; marks: number; status?: 'Draft' | 'Published' }[],
    enteredBy: string,
    status: 'Draft' | 'Published'
  ): Promise<boolean> {
    const dateStr = new Date().toISOString().split('T')[0];

    for (const item of results) {
      const idx = this.state.results.findIndex(
        (r) => r.examId === examId && r.subjectId === subjectId && r.studentId === item.studentId
      );

      if (idx >= 0) {
        this.state.results[idx].marks = item.marks;
        this.state.results[idx].status = status;
        this.state.results[idx].updatedAt = dateStr;
        this.state.results[idx].enteredBy = enteredBy;
      } else {
        this.state.results.push({
          id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          studentId: item.studentId,
          examId,
          subjectId,
          marks: item.marks,
          status,
          enteredBy,
          updatedAt: dateStr,
        });
      }
    }

    this.saveToStorage(this.state);

    try {
      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, subjectId, results, enteredBy, status }),
      }).catch(() => {});
    } catch (e) {}

    return true;
  }

  // Notices
  public getNotices(): Notice[] {
    return [...this.state.notices].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  public async createNotice(title: string, description: string, category: any, authorId: string, authorName: string): Promise<Notice> {
    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      authorId,
      authorName,
    };

    this.state.notices.unshift(newNotice);
    this.saveToStorage(this.state);

    try {
      fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      }).catch(() => {});
    } catch (e) {}

    return newNotice;
  }

  public async deleteNotice(id: string): Promise<boolean> {
    this.state.notices = this.state.notices.filter((n) => n.id !== id);
    this.saveToStorage(this.state);

    try {
      fetch(`/api/notices/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch (e) {}

    return true;
  }

  // Timetable
  public getTimetableForClass(classId: string): TimetableEntry[] {
    return this.state.timetable.filter((t) => t.classId === classId);
  }

  public getTimetableForFaculty(facultyId: string): TimetableEntry[] {
    return this.state.timetable.filter((t) => t.facultyId === facultyId);
  }

  public async updateTimetableEntry(id: string, subjectId: string, facultyId: string): Promise<boolean> {
    const entry = this.state.timetable.find((t) => t.id === id);
    if (entry) {
      entry.subjectId = subjectId;
      entry.facultyId = facultyId;
      this.saveToStorage(this.state);

      try {
        fetch(`/api/timetable/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectId, facultyId }),
        }).catch(() => {});
      } catch (e) {}
      return true;
    }
    return false;
  }

  // Document Requests
  public getDocumentRequests(studentId?: string): DocumentRequest[] {
    let list = this.state.documentRequests || [];
    if (studentId) {
      list = list.filter((d) => d.studentId === studentId);
    }
    return [...list].sort(
      (a, b) => new Date(b.dateRequested).getTime() - new Date(a.dateRequested).getTime()
    );
  }

  public async submitDocumentRequest(
    studentId: string,
    type: any,
    purpose: string,
    copies: number = 1
  ): Promise<DocumentRequest> {
    const student = this.state.students.find((s) => s.id === studentId);
    const cls = student ? this.state.classes.find((c) => c.id === student.classId) : null;

    const newDoc: DocumentRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId,
      studentName: student ? student.name : 'Unknown Student',
      studentRollNo: student ? student.rollNo : '01',
      className: cls ? `Class ${cls.grade}-${cls.section}` : 'Class 10-A',
      type,
      purpose: purpose.trim(),
      copies: Number(copies) || 1,
      dateRequested: new Date().toISOString().split('T')[0],
      status: 'Pending',
      remark: '',
      updatedBy: '',
    };

    if (!this.state.documentRequests) {
      this.state.documentRequests = [];
    }
    this.state.documentRequests.unshift(newDoc);
    this.saveToStorage(this.state);

    try {
      fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, type, purpose, copies }),
      }).catch(() => {});
    } catch (e) {}

    return newDoc;
  }

  public async updateDocumentRequest(
    id: string,
    status: any,
    remark?: string,
    updatedBy?: string
  ): Promise<boolean> {
    const doc = (this.state.documentRequests || []).find((d) => d.id === id);
    if (doc) {
      doc.status = status;
      if (remark !== undefined) doc.remark = remark.trim();
      if (updatedBy) doc.updatedBy = updatedBy;

      this.saveToStorage(this.state);

      try {
        fetch(`/api/documents/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, remark, updatedBy }),
        }).catch(() => {});
      } catch (e) {}
      return true;
    }
    return false;
  }
}

export const dataService = new DataService();
