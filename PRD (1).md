# PRD: Scholix – A Smart School Monitoring System

**Document type:** Product Requirements Document (main project specification)
**Project type:** College CEP demonstration prototype
**Target build tool:** Google Antigravity (AI-assisted / vibe coding)
**Version:** 1.0

---

## 1. Project Title and Overview

**Title:** Scholix – A Smart School Monitoring System

Scholix is a web-based school management demo that digitizes the manual records and everyday administrative activities of a **single high school** (Grades 8–10). Students and faculty use one website instead of physical registers and paperwork to manage attendance, results, notices, timetables, student portfolios, and document requests.

This is a **demonstration prototype**, not a commercial ERP product. The goal is to show a complete, believable student–faculty workflow with consistent demo data, working forms, and a polished interface.

**Three user experiences only:** Public Visitor, Student, Faculty. There is no administrator portal.

---

## 2. Problem Statement

Many schools still rely on physical registers, printed notice boards, paper timetables, and handwritten applications. This causes:

- Time wasted on manual attendance and mark entry.
- Records that are hard to search, correct, or retrieve later.
- Students missing notices or being unaware of their attendance and results.
- Slow, untracked document requests (e.g., bonafide certificates) where students cannot see the status.
- No single place where a student's academic record and achievements are visible.

---

## 3. Project Objectives

1. Provide one website where students and faculty access school information according to their role.
2. Digitize five core records: attendance, examination results, notices, timetable, and document requests.
3. Give each student a digital profile and portfolio.
4. Show that changes made by faculty appear in the student portal (attendance, results, notices, request status).
5. Deliver a clean, modern, responsive UI suitable for a live college demonstration.
6. Keep the build simple, achievable, and free of unnecessary infrastructure.

---

## 4. Target Users

| User | Description | Main Needs |
|---|---|---|
| **Public Visitor** | Anyone who opens the website (examiner, parent, evaluator). | Understand what Scholix does; reach the login page. No private data shown. |
| **Student** | Student of Grades 8–10. | View attendance, results, notices, timetable; manage portfolio; request documents. |
| **Faculty** | Teacher of the school (some may be class teachers). | Mark attendance, enter marks, publish notices, manage timetable, process document requests. |

---

## 5. Proposed Solution

A responsive web application with:

- A public **landing page** explaining the system.
- A **login page** with Student and Faculty options.
- A **Student Portal** (dashboard + 6 pages).
- A **Faculty Portal** (dashboard + 5 modules).
- A **shared data store** pre-loaded with demo data so faculty actions are immediately visible to students.

### Recommended Tech Stack (keep simple)

- **React + TypeScript + Vite**
- **Tailwind CSS**
- **React Router** for navigation
- **lucide-react** for icons
- **Persistence:** browser `localStorage`, seeded from a single demo-data file on first load. All reads/writes go through one small data-service module so the storage could be swapped for a real backend later.
- A **"Reset Demo Data"** action (small link in the footer or login page) restores the seed data.

> No backend server, cloud services, or external integrations are required.

---

## 6. Scope of the Demo

### In Scope
- Landing page, login page, student portal, faculty portal.
- Role-based login using predefined demo accounts.
- Attendance, results, notices, timetable, portfolio, and document requests.
- Faculty-to-student data flow through shared persisted data.
- Form validation and success/error notifications.
- Responsive layout (laptop, tablet, mobile).

### Out of Scope
- Administrator portal, parent portal.
- Blockchain, AI/ML, IoT hardware, payment gateways, SMS/email, video conferencing.
- Multi-school management, advanced analytics, production-grade authentication, cloud deployment.
- Real file storage/upload servers (profile pictures and certificates use placeholders or in-browser data only).

---

## 7. Functional Requirements

### 7.1 Public Landing Page (`/`)

**User can:** read about Scholix, see features, and go to Login.
**Behavior:** static, scrollable single page; navbar links smooth-scroll to sections; no private student data anywhere.

| ID | Requirement |
|---|---|
| LP-1 | Navbar with Scholix logo/name, links (Home, Features, How It Works, Benefits, Contact) and a prominent **Login** button. Collapses to a hamburger menu on mobile. |
| LP-2 | Hero section with the title "Scholix – A Smart School Monitoring System", a short description of digitizing school records, a primary **Login** button, and a secondary "Learn More" button (scrolls to Features). |
| LP-3 | Feature cards (icon, title, one-line description) for: Attendance, Student Portfolios, Examination Results, Notices, Timetables, Document Requests. |
| LP-4 | "How It Works" section with two short columns: **For Students** and **For Faculty**, each with 3–4 simple steps. |
| LP-5 | "Benefits" section (e.g., less paperwork, instant access, transparent records, faster requests, organized data). |
| LP-6 | Footer with placeholder school name, address, phone, email, and copyright line. |

**Expected outcome:** a visitor understands the purpose of the system within seconds and can reach login in one click.

---

### 7.2 Login Page (`/login`)

**User can:** choose Student Login or Faculty Login, enter credentials, and sign in.
**Behavior:** a tab/toggle switches between the two forms; the selected role is highlighted. On success, redirect by role.

| ID | Requirement |
|---|---|
| LG-1 | Two options: **Student Login** and **Faculty Login** (tabs or segmented control). |
| LG-2 | Each form has **username/email** and **password** fields with labels and a show/hide password toggle. |
| LG-3 | Validation: both fields required; email-style username must be valid if an email is used; inline error messages. |
| LG-4 | Authentication checks credentials against predefined demo accounts. Wrong credentials show "Invalid username or password." A student account cannot log in through the Faculty tab (and vice versa). |
| LG-5 | On success, redirect: Student → `/student/dashboard`, Faculty → `/faculty/dashboard`. |
| LG-6 | Session stored in `localStorage`/`sessionStorage`. **Logout** button in the portal header clears the session and returns to `/login`. |
| LG-7 | Protected routes: visiting a portal URL without a session redirects to `/login`; a student visiting a faculty route is redirected to their own dashboard. |
| LG-8 | A small "Demo credentials" helper box on the login page lists sample accounts (acceptable for a demo). |
| LG-9 | A "Back to Home" link. |

**Expected outcome:** correct role lands on the correct dashboard; unauthorized access is blocked.

---

### 7.3 Student Portal (`/student/*`)

**Layout:** left sidebar (collapsible to a drawer on mobile), top header with student name, avatar, and Logout.

#### 7.3.1 Student Dashboard (`/student/dashboard`)

**User can:** see a personalized overview at a glance.

| ID | Widget | Content |
|---|---|---|
| SD-1 | Welcome banner | "Welcome, {Name}" + profile summary (photo/avatar, roll number, class, section). |
| SD-2 | Attendance card | Overall attendance % with a circular or bar progress indicator; colored by threshold (≥75% teal/green, <75% amber/red). |
| SD-3 | Recent results | Latest examination with total marks, percentage, and grade; link to My Results. |
| SD-4 | Upcoming lectures | Next 3 lectures for today (subject, teacher, time); if none remain, show the next school day's first lectures. |
| SD-5 | Latest notices | 3 most recent published notices (title, category badge, date). |
| SD-6 | Timetable summary | Today's lecture list in compact form; link to full timetable. |
| SD-7 | Document request status | Count/list of the student's latest requests with status badges. |

**Expected outcome:** data on the dashboard always reflects the latest faculty updates.

#### 7.3.2 My Profile and Portfolio (`/student/profile`)

**User can:** view official details and edit personal portfolio sections.

- **Read-only (official academic info):** name, roll number, class, section, academic year, date of birth, guardian name, admission number.
- **Editable portfolio:** profile picture (choose from preset avatars or upload a small image stored as a data URL), bio/about me, skills (tag list), achievements, extracurricular activities, certificates (title, issuer, date; optional file name only).
- Add / edit / delete items in each portfolio section.
- **Save** button shows a success toast; official fields have a lock icon or "Read-only" label and cannot be edited.

**Expected outcome:** edits persist after refresh; official data never changes.

#### 7.3.3 My Attendance (`/student/attendance`)

**User can:** check how regular they are.

- Overall attendance % with progress indicator and total present/absent/total days.
- **Monthly summary:** month selector (or compact table) showing present, absent, and % per month.
- **Date-wise table:** date, day, status (Present = teal badge, Absent = red badge). Sortable by date (latest first); filter by month.
- Empty state: "No attendance recorded yet."

**Expected outcome:** attendance marked by faculty appears here after saving.

#### 7.3.4 My Results (`/student/results`)

**User can:** view marks for each published examination.

- Exam selector (e.g., Unit Test 1, Midterm, Unit Test 2, Final).
- Table: subject, marks obtained, maximum marks, and per-subject grade.
- Footer row: total marks, maximum total, percentage, overall grade, and Pass/Fail label.
- Only **published** results are shown.

**Grading scale (assumption):** A+ ≥ 90, A ≥ 80, B+ ≥ 70, B ≥ 60, C ≥ 50, D ≥ 35, F < 35 (percentage-based). Pass mark is 35% per subject.

**Expected outcome:** marks entered and published by faculty appear here with correct totals.

#### 7.3.5 Notices (`/student/notices`)

**User can:** read school notices.

- Card list, newest first. Each card: title, description, date, category badge.
- Categories: **Academic, Exam, Event, Holiday, General**.
- Category filter chips and a simple search by title.
- Expand/collapse long descriptions.

**Expected outcome:** notices published by faculty appear immediately.

#### 7.3.6 Timetable (`/student/timetable`)

**User can:** see the weekly class timetable.

- Grid: rows = periods with timings, columns = Monday–Saturday (Mon–Fri if Saturday is not used in the demo data).
- Each cell: subject and teacher name. Break/lunch shown as a distinct row.
- Today's column is highlighted.
- On mobile: a day selector showing one day's lectures as a vertical list.

**Expected outcome:** changes made by faculty in Timetable Management appear here.

#### 7.3.7 Document Requests (`/student/documents`)

**User can:** submit a request and track it.

- **Request form:** document type (dropdown: Bonafide Certificate, Scholarship Document, Transfer Certificate, Character Certificate, Fee Certificate), purpose (text, required, min 10 chars), optional number of copies (1–3), **Submit Request** button.
- **My Requests table:** request ID, document type, purpose, date requested, status badge, faculty remark.
- **Statuses:** Pending (amber), Approved (blue), Rejected (red), Ready for Collection (teal).
- Success toast on submission; the new request appears at the top with status **Pending**.

**Expected outcome:** the status and remark set by faculty appear in the student's list and dashboard.

---

### 7.4 Faculty Portal (`/faculty/*`)

**Layout:** same shell as the student portal (sidebar + header), with faculty navigation.

#### 7.4.1 Faculty Dashboard (`/faculty/dashboard`)

| ID | Widget | Content |
|---|---|---|
| FD-1 | Faculty profile | Name, employee ID, department, designation, avatar. |
| FD-2 | Assigned classes & subjects | List of class-section and subject assignments. |
| FD-3 | Today's timetable | The faculty member's lectures for today (time, class, subject). |
| FD-4 | Attendance tasks | For today's classes, show "Attendance pending" or "Marked" with a button that opens Attendance Management with the class and date pre-selected. |
| FD-5 | Recent notices | Latest 3 notices (including ones the faculty published). |
| FD-6 | Pending document requests | Count and short list of Pending requests with a "Review" link. |

#### 7.4.2 Attendance Management (`/faculty/attendance`)

**User can:** mark and review attendance.

- **Mark tab:**
  - Select class/section (only assigned classes) and date (defaults to today; future dates not allowed).
  - Student list (roll no., name) with a **Present / Absent** toggle per row; default is Present.
  - Buttons: "Mark All Present", "Save Attendance".
  - Live counter: "Present: X | Absent: Y".
  - On save: success toast ("Attendance saved for 10-A on 12 Aug 2025"). If attendance already exists for that class/date, load it and allow editing ("Update Attendance").
- **View History tab:** select class and date range or month; table shows date, present count, absent count; click a date to see the student-level list (read-only, with an Edit option).

**Expected outcome:** saved attendance updates each student's attendance page and percentage.

#### 7.4.3 Examination Results (`/faculty/results`)

**User can:** enter marks and publish results.

- Select class/section, subject (only assigned subjects), and examination.
- Table of students with a marks input; the maximum marks for that exam/subject is shown.
- **Validation:** marks must be numeric, ≥ 0, and ≤ maximum marks; invalid cells are highlighted with an inline message; Save is blocked until fixed.
- Buttons: **Save Draft** (not visible to students) and **Publish Results** (visible to students). A status badge shows Draft / Published. Published marks can be edited and re-published.
- Success toast on save/publish.

**Expected outcome:** published marks appear in each student's My Results with auto-computed totals, percentage, and grade.

#### 7.4.4 Notice Management (`/faculty/notices`)

**User can:** create and review notices.

- **Create form:** title (required), description (required), category (dropdown), date (defaults to today), **Publish Notice** button.
- **Existing notices list:** all notices with title, category, date, and author; faculty can delete or edit their own notices (delete requires a confirmation dialog).
- Success toast after publishing.

**Expected outcome:** the notice appears on every student's Notices page and dashboard.

#### 7.4.5 Timetable Management (`/faculty/timetable`)

**User can:** view and adjust the timetable.

- Select class/section; view its weekly timetable grid (same layout as the student view).
- **Edit mode:** click a cell to add or edit a lecture: day, period/time, subject, teacher (dropdown of faculty). Save/Clear actions.
- Conflict check (basic): warn if the same teacher is already assigned to another class in the same period.
- Success toast on save.

**Expected outcome:** timetable updates are visible in the student portal.

#### 7.4.6 Document Request Management (`/faculty/documents`)

**User can:** review and process student requests.

- Table of all requests: request ID, student name, class, document type, purpose, date, current status.
- Filter by status; search by student name.
- Row action opens a detail panel/modal: full request details, **status dropdown** (Pending, Approved, Rejected, Ready for Collection), and a **remark** field (required when rejecting).
- **Update** button saves changes with a success toast.

**Expected outcome:** the student sees the new status and remark on their Document Requests page and dashboard.

---

## 8. Main User Workflows

**Workflow A – End-to-end demo (primary):**
1. Faculty logs in → Faculty Dashboard.
2. Faculty opens Attendance Management, selects Class 10-A and today's date, marks students, saves.
3. Faculty opens Examination Results, selects class/subject/exam, enters marks, publishes.
4. Faculty creates and publishes a notice.
5. Student logs in → Student Dashboard shows updated attendance, new result, and the new notice.
6. Student submits a Bonafide Certificate request (status: Pending).
7. Faculty opens Document Request Management, approves it with a remark, then later sets "Ready for Collection".
8. Student sees the updated status and remark.

**Workflow B – Portfolio update:** Student logs in → My Profile → adds a skill, an achievement, and a certificate → saves → refreshes and sees the data persist.

**Workflow C – Timetable change:** Faculty edits a lecture in Timetable Management → student opens Timetable and sees the change.

**Workflow D – Authentication:** Visitor opens landing page → clicks Login → logs in with wrong credentials (sees error) → logs in correctly → logs out → is redirected to Login.

---

## 9. Page and Navigation Structure

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Login (Student / Faculty tabs) | Public |
| `/student/dashboard` | Student Dashboard | Student |
| `/student/profile` | My Profile and Portfolio | Student |
| `/student/attendance` | My Attendance | Student |
| `/student/results` | My Results | Student |
| `/student/notices` | Notices | Student |
| `/student/timetable` | Timetable | Student |
| `/student/documents` | Document Requests | Student |
| `/faculty/dashboard` | Faculty Dashboard | Faculty |
| `/faculty/attendance` | Attendance Management | Faculty |
| `/faculty/results` | Examination Results | Faculty |
| `/faculty/notices` | Notice Management | Faculty |
| `/faculty/timetable` | Timetable Management | Faculty |
| `/faculty/documents` | Document Request Management | Faculty |
| `*` | 404 page with a link back to home | Public |

**Student sidebar:** Dashboard, My Profile, My Attendance, My Results, Notices, Timetable, Document Requests, Logout.
**Faculty sidebar:** Dashboard, Attendance, Results, Notices, Timetable, Document Requests, Logout.

---

## 10. UI/UX Requirements

### Visual Style
- Light theme, clean, professional, minimal.
- **Palette:** Navy blue primary (e.g., `#0B2545`), teal accent (e.g., `#0E9F9A`), neutral backgrounds (`#F5F7FA` page, `#FFFFFF` cards), neutral grays for text/borders. Status colors: green/teal (success), amber (pending), red (error/absent), blue (info).
- One font family (e.g., Inter or system sans-serif), consistent heading sizes and spacing scale.
- Rounded cards (`rounded-xl`/`rounded-2xl`) with subtle shadows.
- Simple line icons (lucide-react).
- No excessive animation, heavy gradients, or decorative effects. Subtle hover/transition effects only.

### Layout and Components
- Dashboards: fixed sidebar (desktop), slide-in drawer (mobile), sticky top header.
- Reusable components: Card, Badge, Button, Input, Select, Table, Modal, Toast, ProgressBar/Ring, EmptyState, ConfirmDialog.
- Tables for attendance and marks; horizontally scrollable on small screens.
- Attendance shown with progress indicators; notices as cards with category badges; timetable as a grid.
- Every form has visible labels, helper/error text, disabled-state buttons, and success toasts.
- Empty states and loading states (brief skeleton or spinner) for lists.

### Responsiveness
- Desktop/laptop (≥1024px), tablet (768–1023px), mobile (<768px) must all be usable without horizontal page scrolling.

### Accessibility (basic)
- Sufficient color contrast, labeled inputs, keyboard-focusable controls, status not conveyed by color alone (include text in badges).

### Tone
- The landing page is more visual and presentation-oriented; dashboards prioritize clarity and usability.

---

## 11. Data Requirements and Relationships (High Level)

### Entities

| Entity | Key Fields |
|---|---|
| **User** | id, role (student/faculty), username/email, password (plain demo value), linkedProfileId |
| **Student** | id, name, rollNo, admissionNo, classId, section, dob, guardianName, avatar |
| **Portfolio** | studentId, bio, skills[], achievements[], activities[], certificates[] |
| **Faculty** | id, name, employeeId, department, designation, avatar |
| **Class** | id, grade, section, classTeacherId |
| **Subject** | id, name |
| **FacultyAssignment** | facultyId, classId, subjectId |
| **TimetableEntry** | id, classId, day, period, startTime, endTime, subjectId, facultyId |
| **AttendanceRecord** | id, studentId, classId, date, status (Present/Absent), markedBy |
| **Exam** | id, name, classId, date |
| **ExamSubject** | examId, subjectId, maxMarks |
| **Result** | id, studentId, examId, subjectId, marks, status (Draft/Published), enteredBy |
| **Notice** | id, title, description, category, date, createdBy |
| **DocumentRequest** | id, studentId, type, purpose, copies, dateRequested, status, remark, updatedBy |

### Relationships
- A **Class** has many **Students**; a **Student** belongs to one Class.
- A **Faculty** has many **FacultyAssignments** (class + subject).
- A **TimetableEntry** links a Class, Subject, and Faculty to a day and period.
- A **Student** has many **AttendanceRecords**, **Results**, and **DocumentRequests**, and one **Portfolio**.
- An **Exam** has many **ExamSubjects** and many **Results**.
- **Notices** are school-wide (visible to all students).

### Derived Values (computed, not stored)
- Attendance % = Present days ÷ Total recorded days × 100.
- Exam total, percentage, and grade from published results.

---

## 12. Basic Role Permissions

| Capability | Visitor | Student | Faculty |
|---|---|---|---|
| View landing page | ✅ | ✅ | ✅ |
| Log in | ✅ | – | – |
| View own dashboard | ❌ | ✅ | ✅ (faculty dashboard) |
| View own attendance / results | ❌ | ✅ (own only) | – |
| Edit own portfolio fields | ❌ | ✅ | ❌ |
| Edit official student info | ❌ | ❌ | ❌ (read-only in demo) |
| Mark / edit attendance | ❌ | ❌ | ✅ (assigned classes) |
| Enter / publish marks | ❌ | ❌ | ✅ (assigned subjects) |
| Create / edit / delete notices | ❌ | ❌ | ✅ |
| View notices | ❌ | ✅ | ✅ |
| View timetable | ❌ | ✅ | ✅ |
| Edit timetable | ❌ | ❌ | ✅ |
| Submit document request | ❌ | ✅ | ❌ |
| Approve / reject requests | ❌ | ❌ | ✅ |

A student can only see their own records. A faculty member can only act on their assigned classes/subjects (document requests and notices are school-wide).

---

## 13. Validation and Error-Handling Requirements

| Area | Rule |
|---|---|
| **Login** | Required fields; valid email format when applicable; clear message for wrong credentials; role mismatch rejected. |
| **Attendance** | Class and date required; no future dates; cannot save an empty student list; confirmation toast on success. |
| **Marks** | Numeric only; 0 ≤ marks ≤ max marks; blank allowed only in Draft (blocks Publish); invalid cells highlighted with message. |
| **Notices** | Title (3–100 chars) and description (min 10 chars) required; category required; date required. |
| **Timetable** | Required day/period/subject/teacher; warn on teacher double-booking. |
| **Document request** | Document type required; purpose required (min 10 chars). Duplicate pending request of the same type shows a warning. |
| **Request update** | Remark required when status is Rejected. |
| **Portfolio** | Skill/achievement/certificate titles required; certificate date cannot be in the future. |

**General error handling:**
- Inline field errors + toast notifications for success and failure.
- Confirmation dialog before delete actions.
- Empty states for lists with no data.
- If stored data is missing or corrupted, automatically re-seed the demo data and show a notice.
- Friendly 404 page for unknown routes.
- Show an "Unauthorized" redirect for role violations.

---

## 14. Demo Data and Sample Account Requirements

### School (placeholder)
"Scholix Demo High School" – placeholder address/contact in the footer.

### Sample Accounts

| Role | Username / Email | Password | Notes |
|---|---|---|---|
| Student | `aarav.sharma@scholix.demo` | `student123` | Class 10-A, Roll 01 |
| Student | `diya.patel@scholix.demo` | `student123` | Class 10-A, Roll 02 |
| Student | `rohan.mehta@scholix.demo` | `student123` | Class 9-B, Roll 05 |
| Faculty | `meera.kulkarni@scholix.demo` | `faculty123` | Class teacher of 10-A; Mathematics |
| Faculty | `rajesh.deshmukh@scholix.demo` | `faculty123` | Science; teaches 10-A and 9-B |

*(Names and credentials are placeholders and may be changed; all are shown on the login page's demo helper box.)*

### Seed Data Requirements
- **Classes:** at least 10-A and 9-B, each with **8–10 students** (names, roll numbers, guardian names, placeholder avatars).
- **Subjects (6):** English, Mathematics, Science, Social Studies, Hindi, Computer Science.
- **Faculty:** 5–6 members with class/subject assignments.
- **Timetable:** full weekly timetable (6–7 periods/day incl. a lunch break) for each class.
- **Attendance:** about 30–40 school days of history for each student with varied realistic attendance (some above and below 75%).
- **Exams:** Unit Test 1 (published for all students) and Midterm (published for some subjects, leaving others open so faculty can demonstrate entering marks).
- **Notices:** 6–8 notices across all categories with different dates.
- **Document requests:** 3–4 existing requests in different statuses (Pending, Approved, Rejected, Ready for Collection).
- **Portfolios:** pre-filled for demo students (skills, one achievement, one activity, one certificate).
- Data must be internally consistent (e.g., timetable teachers match faculty assignments).

---

## 15. MVP Features and Optional Future Enhancements

### MVP (must have)
- Landing page, login with role-based redirect, logout, and protected routes.
- Student: dashboard, profile/portfolio (editable portfolio), attendance, results, notices, timetable, document requests.
- Faculty: dashboard, attendance management, result entry with validation and publishing, notice creation, timetable view/edit, document request review.
- Persistent seeded demo data with reset option.
- Responsive, consistent UI with toasts and validation.

### Optional Future Enhancements (not part of the demo)
- Real backend and database with secure authentication.
- Parent portal and administrator portal.
- Printable PDF documents/report cards.
- Email/SMS notifications.
- Fee management, leave applications, homework/assignments.
- Attendance and performance analytics charts.
- Dark mode and multi-language support.

---

## 16. Acceptance Criteria

**Landing and Login**
- [ ] Landing page shows all six sections (hero, features, how it works, benefits, footer, navbar) and displays no student data.
- [ ] Login button leads to `/login`; Student and Faculty options are available.
- [ ] Valid demo credentials redirect to the correct dashboard; invalid ones show an error.
- [ ] Logout works; protected routes redirect unauthenticated users to login.

**Student Portal**
- [ ] Dashboard shows welcome, attendance %, recent result, upcoming lectures, notices, timetable summary, and request status.
- [ ] Portfolio fields can be added/edited and persist after refresh; official fields stay read-only.
- [ ] Attendance page shows overall %, monthly summary, and date-wise Present/Absent records.
- [ ] Results page shows subject marks, max marks, total, percentage, and grade for published exams only.
- [ ] Notices show title, description, date, and category with filtering.
- [ ] Timetable shows a weekly grid with subject, teacher, and timings.
- [ ] A document request can be submitted and appears as Pending; later status changes are visible.

**Faculty Portal**
- [ ] Dashboard shows profile, assignments, today's timetable, attendance tasks, notices, and pending requests.
- [ ] Attendance can be marked, saved (with confirmation), and viewed historically.
- [ ] Marks reject values above max or negative; valid marks save and publish.
- [ ] A published notice appears for students without any manual refresh beyond reloading the page.
- [ ] Timetable edits are saved and reflected in the student view.
- [ ] Document requests can be approved/rejected/updated with a remark.

**Cross-Cutting**
- [ ] The full workflow in Section 18 completes without errors.
- [ ] Faculty changes are visible in the student portal.
- [ ] UI follows the navy/teal light theme and is usable on laptop, tablet, and mobile.
- [ ] Forms show validation messages and success notifications.
- [ ] "Reset Demo Data" restores the initial state.

---

## 17. Project Limitations and Assumptions

### Limitations
- This is a demonstration prototype with **no production-grade security**; demo passwords are stored in plain text in seed data.
- Data is stored in the **browser's localStorage**, so it is **per browser/device**. Student and faculty actions must be demonstrated in the **same browser** (e.g., faculty logs out, student logs in, or use two tabs). Data does not sync between different devices.
- Profile pictures and certificates are stored only as small in-browser data or file names; no real file server exists.
- The timetable conflict check is basic.
- No email/SMS notifications; document "collection" is only a status label.
- No administrator functions (accounts and classes are set by seed data).

### Assumptions
- The school is a single high school with Grades 8–10 and a small number of classes.
- Faculty are authorized to approve document requests (no separate admin/principal role).
- Faculty may publish notices that go to all students.
- Attendance is marked once per day per class (not per lecture).
- Grading scale and pass marks follow the percentage rules in Section 7.3.4.
- Academic year and dates are set relative to the demo period; the seed data uses recent dates.
- The project will be built and run locally (`npm install`, `npm run dev`) and demonstrated from a laptop.

---

## 18. CEP Demonstration Scenario

**Duration:** ~8–10 minutes. **Setup:** open the app in one browser with fresh seed data (click "Reset Demo Data" before starting).

| Step | Presenter Action | What the Audience Sees |
|---|---|---|
| 1 | Open the landing page and scroll through the sections. | The purpose of Scholix, features, benefits; no private data. |
| 2 | Click **Login** → try wrong credentials, then log in as **Faculty** (Meera Kulkarni). | Validation error, then the Faculty Dashboard (assigned classes, today's timetable, pending requests). |
| 3 | Open **Attendance Management**: select 10-A and today, mark two students Absent, save. | Live present/absent counter and a success confirmation. |
| 4 | Open **Examination Results**: select 10-A, Mathematics, Midterm; enter marks; show an over-limit mark being rejected; fix and **Publish**. | Validation message, then a "Results published" toast. |
| 5 | Open **Notice Management**: publish "Annual Sports Day on Friday" (category: Event). | Notice appears in the existing notices list. |
| 6 | Log out and log in as **Student** (Aarav Sharma). | Student Dashboard with the updated attendance %, new Mathematics result, and the new notice. |
| 7 | Visit **My Attendance**, **My Results**, **Notices**, and **Timetable** briefly. | Date-wise attendance, subject-wise marks with grade, notice cards, weekly timetable. |
| 8 | Open **My Profile**: add a skill and an achievement; save. | Portfolio updated; official fields visibly read-only. |
| 9 | Open **Document Requests**: request a **Bonafide Certificate** with a purpose; submit. | Request appears with status **Pending**. |
| 10 | Log out and log in as Faculty → **Document Request Management** → open the request → set **Approved** with a remark → update. | Status updated and confirmation shown. |
| 11 | Log in as the Student again → **Document Requests** (and dashboard). | Status shows **Approved** with the faculty remark; faculty later sets *Ready for Collection*, which also appears. |
| 12 | Conclude: summarize benefits and limitations (localStorage, demo accounts). | Evaluators see the complete student–faculty workflow end to end. |

---

*End of PRD.md*
