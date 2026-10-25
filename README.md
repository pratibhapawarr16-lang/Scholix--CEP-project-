# Scholix – A Smart School Monitoring System
> **College CEP Demonstration Prototype** | Version 1.0

Scholix is a comprehensive, full-stack school monitoring demo designed to digitize everyday administrative records of a high school (Grades 8–10). It demonstrates a complete, synchronized workflow between students and faculty.

---

## 🚀 Quick Start (Running the Demo)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Backend & Frontend Concurrently
```bash
npm run dev
```
- **Frontend:** [http://localhost:5173](http://localhost:5173) (Vite + React + Tailwind CSS)
- **Backend API:** [http://localhost:5000](http://localhost:5000) (Node.js + Express REST API)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

*(You can also run them in separate terminals if preferred: `npm run server` for the backend, and `npm run client` for the frontend).*

---

## 🔑 Pre-Configured Demo Accounts

| Role | Name | Username / Email | Password | Details |
|---|---|---|---|---|
| **Faculty** | Mrs. Meera Kulkarni | `meera.kulkarni@scholix.demo` | `faculty123` | Class Teacher 10-A, Mathematics |
| **Faculty** | Dr. Rajesh Deshmukh | `rajesh.deshmukh@scholix.demo` | `faculty123` | Head of Science, Class Teacher 9-B |
| **Student** | Aarav Sharma | `aarav.sharma@scholix.demo` | `student123` | Class 10-A, Roll 01 |
| **Student** | Diya Patel | `diya.patel@scholix.demo` | `student123` | Class 10-A, Roll 02 |
| **Student** | Rohan Mehta | `rohan.mehta@scholix.demo` | `student123` | Class 9-B, Roll 05 |

> **Pro Tip for Demo Day:** The Login Page and Portal Sidebar both include **1-Click Quick Demo Sign-In buttons** so you can switch between Faculty and Student instantly without typing!

---

## 📋 8-Minute CEP Live Demonstration Scenario (PRD Section 18)

Follow these exact steps during your college evaluation tomorrow:

1. **Step 1 – Public Landing Page (`/`):**
   - Open [http://localhost:5173](http://localhost:5173).
   - Scroll through Hero, 6 Core Features, How It Works, Benefits, and School Campus info.
   - Explain that public visitors see zero private student data.
2. **Step 2 – Login & Validation (`/login`):**
   - Click **Login to Portal**.
   - Show validation: enter a wrong password to demonstrate error handling.
   - Click the 1-click **Mrs. Meera Kulkarni** button to sign in as Faculty.
3. **Step 3 – Mark Attendance (`/faculty/attendance`):**
   - Open Attendance Management. Select Class 10-A and today's date.
   - Toggle 2 students to **Absent** (watch live Present/Absent counters update).
   - Click **Save Attendance** (confirmation toast appears).
4. **Step 4 – Examination Results Entry & Validation (`/faculty/results`):**
   - Select Class 10-A, Subject: Mathematics, Exam: Midterm.
   - Demonstrate error validation: enter `105` (exceeds max marks of 100, shows red border and warning).
   - Correct it to `88`, and click **Publish Results** (success toast appears).
5. **Step 5 – Notice Broadcast (`/faculty/notices`):**
   - Publish a new notice:
     - Title: `Annual Sports Day on Friday`
     - Category: `Event`
     - Description: `All students must assemble on the main school ground in sports uniforms by 08:30 AM.`
   - Notice immediately appears in the circulars list.
6. **Step 6 – Switch to Student (`/student/dashboard`):**
   - Use the **Quick Demo Switch** in the sidebar to switch to **Student (Aarav Sharma)**.
   - Notice the Student Dashboard immediately reflects:
     - Updated attendance percentage and total present/absent count.
     - New published Mathematics Midterm score (88/100, Grade A+).
     - New Sports Day notice in the circulars widget.
7. **Step 7 – Inspect Student Modules:**
   - Briefly click **My Attendance** (monthly summary table and date logs).
   - Click **My Results** (complete marksheet with pass/fail and grades).
   - Click **Timetable** (weekly period grid with today highlighted).
8. **Step 8 – Digital Portfolio Update (`/student/profile`):**
   - Show official details (locked and read-only).
   - Add a skill (e.g., `Antigravity AI Coding`) and click **Save Portfolio Changes**.
9. **Step 9 – Submit Document Request (`/student/documents`):**
   - Request a **Bonafide Certificate** with purpose `Passport application address verification`.
   - Submit request; it appears at the top as **Pending**.
10. **Step 10 – Faculty Approval (`/faculty/documents`):**
    - Quick switch back to **Faculty (Meera)**.
    - Open Document Request Verification; review Aarav's request.
    - Set status to **Approved** with remark `Verified bona fide student of Grade 10-A for 2025-2026.`, then click Update.
11. **Step 11 – Student Sees Live Approval:**
    - Quick switch back to **Student (Aarav)**.
    - Open Document Requests; see status changed to **Approved** with faculty remark!
12. **Step 12 – Conclude:**
    - Click **Reset Demo Data** (in the bottom-left Demo Guide or header) to return to fresh seed data.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, React Router.
- **Backend:** Node.js, Express.js REST API with CORS, local JSON persistence (`server/data/database.json`).
- **Resilience:** Client `DataService` communicates directly with the Express backend, with automatic fallback and synchronization with `localStorage` so your live presentation will never crash even if servers are restarted.
- **Embedded Assistant:** An interactive floating **CEP Demo Presentation Guide** drawer is embedded directly in the bottom-left of the application with live step checkboxes and quick actions!
