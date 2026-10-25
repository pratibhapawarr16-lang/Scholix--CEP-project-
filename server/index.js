import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DATA } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logger for demo/debugging visibility
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[Scholix Backend] ${req.method} ${req.url} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Helper: Read database
function readDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, re-seeding:', err);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }
}

// Helper: Write database
function writeDb(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Scholix Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 2. Full State
app.get('/api/state', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db });
});

// 3. Reset Demo Data
app.post('/api/reset', (req, res) => {
  const fresh = JSON.parse(JSON.stringify(INITIAL_DATA));
  writeDb(fresh);
  console.log('🔄 Scholix DB reset to initial demo dataset');
  res.json({ success: true, message: 'Demo data reset successfully', data: fresh });
});

// 4. Authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const db = readDb();
  const user = db.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase().trim() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }

  if (user.role !== role) {
    return res.status(403).json({
      success: false,
      message: `Account role mismatch. This user is registered as a ${user.role}, not ${role}.`,
    });
  }

  // Find linked profile
  let profile = null;
  if (user.role === 'student') {
    profile = db.students.find((s) => s.id === user.linkedProfileId);
  } else if (user.role === 'faculty') {
    profile = db.faculty.find((f) => f.id === user.linkedProfileId);
  }

  const token = `scholix-token-${user.id}-${Date.now()}`;
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      role: user.role,
      username: user.username,
      linkedProfileId: user.linkedProfileId,
    },
    profile,
  });
});

// 5. Portfolio Update
app.put('/api/students/:id/portfolio', (req, res) => {
  const { id } = req.params;
  const portfolioData = req.body;
  const db = readDb();

  if (!db.portfolios) db.portfolios = {};
  db.portfolios[id] = {
    studentId: id,
    ...portfolioData,
  };

  writeDb(db);
  res.json({ success: true, message: 'Portfolio updated successfully', portfolio: db.portfolios[id] });
});

// 6. Attendance Marking (batch for a class & date)
app.post('/api/attendance', (req, res) => {
  const { classId, date, records, markedBy } = req.body;
  if (!classId || !date || !Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid attendance payload.' });
  }

  const db = readDb();
  // Filter out any existing attendance for this class and date
  db.attendance = db.attendance.filter(
    (a) => !(a.classId === classId && a.date === date)
  );

  // Append new records
  const newRecords = records.map((r, index) => ({
    id: `att-${Date.now()}-${index}`,
    studentId: r.studentId,
    classId,
    date,
    status: r.status,
    markedBy: markedBy || 'Faculty',
  }));

  db.attendance.push(...newRecords);
  writeDb(db);

  res.json({
    success: true,
    message: `Attendance saved successfully for ${records.length} students on ${date}.`,
    count: newRecords.length,
  });
});

// 7. Results Save Draft or Publish
app.post('/api/results', (req, res) => {
  const { examId, subjectId, results, enteredBy, status } = req.body;
  if (!examId || !subjectId || !Array.isArray(results)) {
    return res.status(400).json({ success: false, message: 'Invalid results payload.' });
  }

  const db = readDb();
  const dateStr = new Date().toISOString().split('T')[0];

  for (const item of results) {
    const existingIndex = db.results.findIndex(
      (r) => r.examId === examId && r.subjectId === subjectId && r.studentId === item.studentId
    );

    if (existingIndex >= 0) {
      db.results[existingIndex].marks = Number(item.marks);
      db.results[existingIndex].status = status || item.status || 'Draft';
      db.results[existingIndex].updatedAt = dateStr;
      db.results[existingIndex].enteredBy = enteredBy || db.results[existingIndex].enteredBy;
    } else {
      db.results.push({
        id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        studentId: item.studentId,
        examId,
        subjectId,
        marks: Number(item.marks),
        status: status || item.status || 'Draft',
        enteredBy: enteredBy || 'fac-01',
        updatedAt: dateStr,
      });
    }
  }

  writeDb(db);
  res.json({
    success: true,
    message: status === 'Published' ? 'Results published successfully!' : 'Results draft saved.',
  });
});

// 8. Notices
app.get('/api/notices', (req, res) => {
  const db = readDb();
  res.json({ success: true, notices: db.notices });
});

app.post('/api/notices', (req, res) => {
  const { title, description, category, authorId, authorName } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ success: false, message: 'All notice fields are required.' });
  }

  const db = readDb();
  const newNotice = {
    id: `not-${Date.now()}`,
    title: title.trim(),
    description: description.trim(),
    category,
    date: new Date().toISOString().split('T')[0],
    authorId: authorId || 'fac-01',
    authorName: authorName || 'Faculty',
  };

  db.notices.unshift(newNotice);
  writeDb(db);
  res.json({ success: true, message: 'Notice published successfully!', notice: newNotice });
});

app.delete('/api/notices/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const initialLen = db.notices.length;
  db.notices = db.notices.filter((n) => n.id !== id);

  if (db.notices.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Notice not found.' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Notice deleted successfully.' });
});

// 9. Timetable
app.put('/api/timetable/:id', (req, res) => {
  const { id } = req.params;
  const { subjectId, facultyId } = req.body;
  const db = readDb();

  const entry = db.timetable.find((t) => t.id === id);
  if (!entry) {
    return res.status(404).json({ success: false, message: 'Timetable entry not found.' });
  }

  entry.subjectId = subjectId;
  entry.facultyId = facultyId;
  writeDb(db);

  res.json({ success: true, message: 'Timetable updated successfully.', entry });
});

// 10. Document Requests
app.get('/api/documents', (req, res) => {
  const { studentId } = req.query;
  const db = readDb();
  let list = db.documentRequests || [];
  if (studentId) {
    list = list.filter((d) => d.studentId === studentId);
  }
  res.json({ success: true, requests: list });
});

app.post('/api/documents', (req, res) => {
  const { studentId, type, purpose, copies } = req.body;
  if (!studentId || !type || !purpose || purpose.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Document type and purpose (min 10 characters) are required.',
    });
  }

  const db = readDb();
  const student = db.students.find((s) => s.id === studentId);
  const studentClass = student ? db.classes.find((c) => c.id === student.classId) : null;

  const newDoc = {
    id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    studentId,
    studentName: student ? student.name : 'Unknown Student',
    studentRollNo: student ? student.rollNo : '00',
    className: studentClass ? `Class ${studentClass.grade}-${studentClass.section}` : 'Class 10-A',
    type,
    purpose: purpose.trim(),
    copies: Number(copies) || 1,
    dateRequested: new Date().toISOString().split('T')[0],
    status: 'Pending',
    remark: '',
    updatedBy: '',
  };

  if (!db.documentRequests) db.documentRequests = [];
  db.documentRequests.unshift(newDoc);
  writeDb(db);

  res.json({
    success: true,
    message: 'Document request submitted successfully!',
    request: newDoc,
  });
});

app.patch('/api/documents/:id', (req, res) => {
  const { id } = req.params;
  const { status, remark, updatedBy } = req.body;
  const db = readDb();

  const doc = (db.documentRequests || []).find((d) => d.id === id);
  if (!doc) {
    return res.status(404).json({ success: false, message: 'Document request not found.' });
  }

  if (status === 'Rejected' && (!remark || remark.trim().length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'A remark is strictly required when rejecting a document request.',
    });
  }

  if (status) doc.status = status;
  if (remark !== undefined) doc.remark = remark.trim();
  if (updatedBy) doc.updatedBy = updatedBy;

  writeDb(db);
  res.json({
    success: true,
    message: `Request ${id} updated to ${status}.`,
    request: doc,
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Scholix Backend Server listening on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
