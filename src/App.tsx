import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PortalLayout } from './components/layout/PortalLayout';
import { DemoGuideDrawer } from './components/common/DemoGuideDrawer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentResults } from './pages/student/StudentResults';
import { StudentNotices } from './pages/student/StudentNotices';
import { StudentTimetable } from './pages/student/StudentTimetable';
import { StudentDocuments } from './pages/student/StudentDocuments';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyAttendance } from './pages/faculty/FacultyAttendance';
import { FacultyResults } from './pages/faculty/FacultyResults';
import { FacultyNotices } from './pages/faculty/FacultyNotices';
import { FacultyTimetable } from './pages/faculty/FacultyTimetable';
import { FacultyDocuments } from './pages/faculty/FacultyDocuments';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRole: 'student' | 'faculty';
}> = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} replace />;
  }

  return <PortalLayout role={allowedRole}>{children}</PortalLayout>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student Protected Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/results"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/notices"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/timetable"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentTimetable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/documents"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDocuments />
                </ProtectedRoute>
              }
            />

            {/* Faculty Protected Routes */}
            <Route
              path="/faculty/dashboard"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/attendance"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/results"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/notices"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/timetable"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyTimetable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/documents"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyDocuments />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Floating Live Presentation Assistant */}
          <DemoGuideDrawer />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
