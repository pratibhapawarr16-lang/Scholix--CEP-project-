import { AppState, DayOfWeek } from '../types';

export const INITIAL_STATE: AppState = {
  users: [
    {
      id: 'usr-student-1',
      role: 'student',
      username: 'aarav.sharma@scholix.demo',
      password: 'student123',
      linkedProfileId: 'stu-10a-01',
    },
    {
      id: 'usr-student-2',
      role: 'student',
      username: 'diya.patel@scholix.demo',
      password: 'student123',
      linkedProfileId: 'stu-10a-02',
    },
    {
      id: 'usr-student-3',
      role: 'student',
      username: 'rohan.mehta@scholix.demo',
      password: 'student123',
      linkedProfileId: 'stu-9b-05',
    },
    {
      id: 'usr-faculty-1',
      role: 'faculty',
      username: 'meera.kulkarni@scholix.demo',
      password: 'faculty123',
      linkedProfileId: 'fac-01',
    },
    {
      id: 'usr-faculty-2',
      role: 'faculty',
      username: 'rajesh.deshmukh@scholix.demo',
      password: 'faculty123',
      linkedProfileId: 'fac-02',
    },
    {
      id: 'usr-faculty-3',
      role: 'faculty',
      username: 'ananya.sen@scholix.demo',
      password: 'faculty123',
      linkedProfileId: 'fac-03',
    },
    {
      id: 'usr-faculty-4',
      role: 'faculty',
      username: 'vikram.singh@scholix.demo',
      password: 'faculty123',
      linkedProfileId: 'fac-04',
    },
    {
      id: 'usr-faculty-5',
      role: 'faculty',
      username: 'priya.nair@scholix.demo',
      password: 'faculty123',
      linkedProfileId: 'fac-05',
    },
  ],

  classes: [
    {
      id: 'class-10a',
      grade: 10,
      section: 'A',
      classTeacherId: 'fac-01',
      roomNo: 'Room 302',
    },
    {
      id: 'class-9b',
      grade: 9,
      section: 'B',
      classTeacherId: 'fac-02',
      roomNo: 'Room 204',
    },
  ],

  subjects: [
    { id: 'sub-math', name: 'Mathematics', code: 'MATH-10' },
    { id: 'sub-sci', name: 'Science', code: 'SCI-10' },
    { id: 'sub-eng', name: 'English', code: 'ENG-10' },
    { id: 'sub-sst', name: 'Social Studies', code: 'SST-10' },
    { id: 'sub-hin', name: 'Hindi', code: 'HIN-10' },
    { id: 'sub-cs', name: 'Computer Science', code: 'CS-10' },
  ],

  faculty: [
    {
      id: 'fac-01',
      name: 'Mrs. Meera Kulkarni',
      employeeId: 'EMP-0104',
      department: 'Mathematics',
      designation: 'Senior Faculty & Class Teacher 10-A',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'meera.kulkarni@scholix.demo',
      phone: '+91 98230 45671',
    },
    {
      id: 'fac-02',
      name: 'Dr. Rajesh Deshmukh',
      employeeId: 'EMP-0102',
      department: 'Science',
      designation: 'Head of Science & Class Teacher 9-B',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      email: 'rajesh.deshmukh@scholix.demo',
      phone: '+91 98221 67890',
    },
    {
      id: 'fac-03',
      name: 'Ms. Ananya Sen',
      employeeId: 'EMP-0101',
      department: 'Languages',
      designation: 'English Faculty',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'ananya.sen@scholix.demo',
      phone: '+91 98233 11223',
    },
    {
      id: 'fac-04',
      name: 'Mr. Vikram Singh',
      employeeId: 'EMP-0103',
      department: 'Humanities',
      designation: 'Social Studies Faculty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'vikram.singh@scholix.demo',
      phone: '+91 98214 33445',
    },
    {
      id: 'fac-05',
      name: 'Mrs. Priya Nair',
      employeeId: 'EMP-0105',
      department: 'Information Technology',
      designation: 'Computer Science Faculty & Lab In-charge',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'priya.nair@scholix.demo',
      phone: '+91 98245 55667',
    },
    {
      id: 'fac-06',
      name: 'Mr. Sanjay Joshi',
      employeeId: 'EMP-0106',
      department: 'Languages',
      designation: 'Hindi Faculty',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      email: 'sanjay.joshi@scholix.demo',
      phone: '+91 98256 77889',
    },
  ],

  facultyAssignments: [
    { id: 'fa-1', facultyId: 'fac-01', classId: 'class-10a', subjectId: 'sub-math' },
    { id: 'fa-2', facultyId: 'fac-01', classId: 'class-9b', subjectId: 'sub-math' },
    { id: 'fa-3', facultyId: 'fac-02', classId: 'class-10a', subjectId: 'sub-sci' },
    { id: 'fa-4', facultyId: 'fac-02', classId: 'class-9b', subjectId: 'sub-sci' },
    { id: 'fa-5', facultyId: 'fac-03', classId: 'class-10a', subjectId: 'sub-eng' },
    { id: 'fa-6', facultyId: 'fac-03', classId: 'class-9b', subjectId: 'sub-eng' },
    { id: 'fa-7', facultyId: 'fac-04', classId: 'class-10a', subjectId: 'sub-sst' },
    { id: 'fa-8', facultyId: 'fac-04', classId: 'class-9b', subjectId: 'sub-sst' },
    { id: 'fa-9', facultyId: 'fac-05', classId: 'class-10a', subjectId: 'sub-cs' },
    { id: 'fa-10', facultyId: 'fac-05', classId: 'class-9b', subjectId: 'sub-cs' },
    { id: 'fa-11', facultyId: 'fac-06', classId: 'class-10a', subjectId: 'sub-hin' },
    { id: 'fa-12', facultyId: 'fac-06', classId: 'class-9b', subjectId: 'sub-hin' },
  ],

  students: [
    {
      id: 'stu-10a-01',
      name: 'Aarav Sharma',
      rollNo: '01',
      admissionNo: 'SCH-2023-1001',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-08-14',
      guardianName: 'Rajesh Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'aarav.sharma@scholix.demo',
      contactPhone: '+91 98765 43210',
    },
    {
      id: 'stu-10a-02',
      name: 'Diya Patel',
      rollNo: '02',
      admissionNo: 'SCH-2023-1002',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-11-22',
      guardianName: 'Suresh Patel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'diya.patel@scholix.demo',
      contactPhone: '+91 98765 43211',
    },
    {
      id: 'stu-10a-03',
      name: 'Ishaan Verma',
      rollNo: '03',
      admissionNo: 'SCH-2023-1003',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-04-10',
      guardianName: 'Sunil Verma',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'ishaan.verma@scholix.demo',
      contactPhone: '+91 98765 43212',
    },
    {
      id: 'stu-10a-04',
      name: 'Ananya Gupta',
      rollNo: '04',
      admissionNo: 'SCH-2023-1004',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-07-19',
      guardianName: 'Manoj Gupta',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'ananya.gupta@scholix.demo',
      contactPhone: '+91 98765 43213',
    },
    {
      id: 'stu-10a-05',
      name: 'Kabir Joshi',
      rollNo: '05',
      admissionNo: 'SCH-2023-1005',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-03-05',
      guardianName: 'Vinay Joshi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'kabir.joshi@scholix.demo',
      contactPhone: '+91 98765 43214',
    },
    {
      id: 'stu-10a-06',
      name: 'Rhea Kapoor',
      rollNo: '06',
      admissionNo: 'SCH-2023-1006',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-09-30',
      guardianName: 'Anil Kapoor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'rhea.kapoor@scholix.demo',
      contactPhone: '+91 98765 43215',
    },
    {
      id: 'stu-10a-07',
      name: 'Siddharth Rao',
      rollNo: '07',
      admissionNo: 'SCH-2023-1007',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-01-15',
      guardianName: 'Krishna Rao',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'siddharth.rao@scholix.demo',
      contactPhone: '+91 98765 43216',
    },
    {
      id: 'stu-10a-08',
      name: 'Tanvi Shah',
      rollNo: '08',
      admissionNo: 'SCH-2023-1008',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-12-08',
      guardianName: 'Paresh Shah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'tanvi.shah@scholix.demo',
      contactPhone: '+91 98765 43217',
    },
    {
      id: 'stu-10a-09',
      name: 'Aditya Nair',
      rollNo: '09',
      admissionNo: 'SCH-2023-1009',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-05-24',
      guardianName: 'Harish Nair',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'aditya.nair@scholix.demo',
      contactPhone: '+91 98765 43218',
    },
    {
      id: 'stu-10a-10',
      name: 'Pooja Deshmukh',
      rollNo: '10',
      admissionNo: 'SCH-2023-1010',
      classId: 'class-10a',
      section: 'A',
      dob: '2009-10-18',
      guardianName: 'Anand Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'pooja.deshmukh@scholix.demo',
      contactPhone: '+91 98765 43219',
    },

    // Class 9-B students
    {
      id: 'stu-9b-01',
      name: 'Ayush Kulkarni',
      rollNo: '01',
      admissionNo: 'SCH-2024-0901',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-06-11',
      guardianName: 'Dilip Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'ayush.k@scholix.demo',
      contactPhone: '+91 98765 43220',
    },
    {
      id: 'stu-9b-02',
      name: 'Bhavya Reddy',
      rollNo: '02',
      admissionNo: 'SCH-2024-0902',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-08-20',
      guardianName: 'Satish Reddy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'bhavya.r@scholix.demo',
      contactPhone: '+91 98765 43221',
    },
    {
      id: 'stu-9b-03',
      name: 'Chaitanya Sen',
      rollNo: '03',
      admissionNo: 'SCH-2024-0903',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-02-14',
      guardianName: 'Prabir Sen',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'chaitanya.s@scholix.demo',
      contactPhone: '+91 98765 43222',
    },
    {
      id: 'stu-9b-04',
      name: 'Devika Iyer',
      rollNo: '04',
      admissionNo: 'SCH-2024-0904',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-05-19',
      guardianName: 'Gopal Iyer',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'devika.i@scholix.demo',
      contactPhone: '+91 98765 43223',
    },
    {
      id: 'stu-9b-05',
      name: 'Rohan Mehta',
      rollNo: '05',
      admissionNo: 'SCH-2024-0905',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-09-12',
      guardianName: 'Kishore Mehta',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'rohan.mehta@scholix.demo',
      contactPhone: '+91 98765 43224',
    },
    {
      id: 'stu-9b-06',
      name: 'Sania Mirza',
      rollNo: '06',
      admissionNo: 'SCH-2024-0906',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-11-04',
      guardianName: 'Farhan Mirza',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'sania.m@scholix.demo',
      contactPhone: '+91 98765 43225',
    },
    {
      id: 'stu-9b-07',
      name: 'Tushar Bhat',
      rollNo: '07',
      admissionNo: 'SCH-2024-0907',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-01-29',
      guardianName: 'Ramesh Bhat',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'tushar.b@scholix.demo',
      contactPhone: '+91 98765 43226',
    },
    {
      id: 'stu-9b-08',
      name: 'Zoya Khan',
      rollNo: '08',
      admissionNo: 'SCH-2024-0908',
      classId: 'class-9b',
      section: 'B',
      dob: '2010-07-03',
      guardianName: 'Tariq Khan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      academicYear: '2025-2026',
      contactEmail: 'zoya.k@scholix.demo',
      contactPhone: '+91 98765 43227',
    },
  ],

  portfolios: {
    'stu-10a-01': {
      studentId: 'stu-10a-01',
      bio: 'Enthusiastic Grade 10 student passionate about STEM, competitive programming, and mathematics. Aspiring computer science researcher with a strong interest in robotics and physics simulation.',
      skills: [
        { id: 'sk-1', name: 'Mathematics & Calculus' },
        { id: 'sk-2', name: 'Python Programming' },
        { id: 'sk-3', name: 'Web Development' },
        { id: 'sk-4', name: 'Chess Strategy' },
        { id: 'sk-5', name: 'Public Speaking' },
      ],
      achievements: [
        {
          id: 'ach-1',
          title: '1st Prize - Regional Inter-School Science Fair 2024',
          year: '2024',
          description: 'Designed an automated smart irrigation sensor system powered by microcontrollers.',
        },
        {
          id: 'ach-2',
          title: 'Gold Medal - State Level Math Olympiad',
          year: '2024',
          description: 'Achieved 98th percentile rank in Grade 9 category across 450 schools.',
        },
      ],
      activities: [
        {
          id: 'act-1',
          title: 'Scholix Coding Club',
          role: 'President',
          year: '2024-2025',
        },
        {
          id: 'act-2',
          title: 'Junior Robotics League',
          role: 'Team Lead',
          year: '2023-2024',
        },
      ],
      certificates: [
        {
          id: 'cert-1',
          title: 'National Cyber Olympiad Excellence',
          issuer: 'Science Olympiad Foundation (SOF)',
          date: '2024-11-15',
          fileName: 'NCO_Gold_Certificate.pdf',
        },
        {
          id: 'cert-2',
          title: 'Introduction to Algorithms & Data Structures',
          issuer: 'State Tech Education Board',
          date: '2024-05-10',
          fileName: 'Algo_Cert_Aarav.pdf',
        },
      ],
    },
    'stu-10a-02': {
      studentId: 'stu-10a-02',
      bio: 'Aspiring medical professional and environmental science enthusiast. Member of the School Green Corps and literary society.',
      skills: [
        { id: 'sk-d1', name: 'Biology & Environmental Science' },
        { id: 'sk-d2', name: 'Creative Writing' },
        { id: 'sk-d3', name: 'Classical Dance' },
      ],
      achievements: [
        {
          id: 'ach-d1',
          title: 'First Prize in State Essay Writing',
          year: '2024',
          description: 'Wrote on Sustainable Urban Biodiversity and received the Governor’s Citation.',
        },
      ],
      activities: [
        {
          id: 'act-d1',
          title: 'Eco-Warriors Club',
          role: 'Vice President',
          year: '2024-2025',
        },
      ],
      certificates: [
        {
          id: 'cert-d1',
          title: 'Environmental Youth Ambassador',
          issuer: 'Nature Conservation Forum',
          date: '2024-09-01',
          fileName: 'Youth_Ambassador.pdf',
        },
      ],
    },
    'stu-9b-05': {
      studentId: 'stu-9b-05',
      bio: 'Energetic 9th-grader interested in astrophysics, football, and student council activities.',
      skills: [
        { id: 'sk-r1', name: 'Football (Striker)' },
        { id: 'sk-r2', name: 'Astronomy & Physics' },
        { id: 'sk-r3', name: 'Debating' },
      ],
      achievements: [
        {
          id: 'ach-r1',
          title: 'Captain - Under-14 District Football Champions',
          year: '2024',
          description: 'Led the high school team to a 3-1 victory in the district finals.',
        },
      ],
      activities: [
        {
          id: 'act-r1',
          title: 'Sports Council',
          role: 'Junior Representative',
          year: '2024-2025',
        },
      ],
      certificates: [
        {
          id: 'cert-r1',
          title: 'Best Sportsmanship Award',
          issuer: 'District Athletic Association',
          date: '2024-10-20',
          fileName: 'District_Sports_Award.pdf',
        },
      ],
    },
  },

  timetable: [
    // Class 10-A Weekly Timetable (Monday to Friday, 6 periods)
    // Monday
    { id: 'tt-10a-m1', classId: 'class-10a', day: 'Monday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-10a-m2', classId: 'class-10a', day: 'Monday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-10a-m3', classId: 'class-10a', day: 'Monday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-10a-m4', classId: 'class-10a', day: 'Monday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-sst', facultyId: 'fac-04' },
    { id: 'tt-10a-m5', classId: 'class-10a', day: 'Monday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-cs', facultyId: 'fac-05' },
    { id: 'tt-10a-m6', classId: 'class-10a', day: 'Monday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-hin', facultyId: 'fac-06' },

    // Tuesday
    { id: 'tt-10a-t1', classId: 'class-10a', day: 'Tuesday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-10a-t2', classId: 'class-10a', day: 'Tuesday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-10a-t3', classId: 'class-10a', day: 'Tuesday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-cs', facultyId: 'fac-05' },
    { id: 'tt-10a-t4', classId: 'class-10a', day: 'Tuesday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-10a-t5', classId: 'class-10a', day: 'Tuesday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-sst', facultyId: 'fac-04' },
    { id: 'tt-10a-t6', classId: 'class-10a', day: 'Tuesday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-math', facultyId: 'fac-01' },

    // Wednesday
    { id: 'tt-10a-w1', classId: 'class-10a', day: 'Wednesday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-10a-w2', classId: 'class-10a', day: 'Wednesday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-10a-w3', classId: 'class-10a', day: 'Wednesday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-10a-w4', classId: 'class-10a', day: 'Wednesday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-hin', facultyId: 'fac-06' },
    { id: 'tt-10a-w5', classId: 'class-10a', day: 'Wednesday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-cs', facultyId: 'fac-05' },
    { id: 'tt-10a-w6', classId: 'class-10a', day: 'Wednesday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-sst', facultyId: 'fac-04' },

    // Thursday
    { id: 'tt-10a-th1', classId: 'class-10a', day: 'Thursday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-10a-th2', classId: 'class-10a', day: 'Thursday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-sst', facultyId: 'fac-04' },
    { id: 'tt-10a-th3', classId: 'class-10a', day: 'Thursday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-10a-th4', classId: 'class-10a', day: 'Thursday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-10a-th5', classId: 'class-10a', day: 'Thursday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-hin', facultyId: 'fac-06' },
    { id: 'tt-10a-th6', classId: 'class-10a', day: 'Thursday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-cs', facultyId: 'fac-05' },

    // Friday
    { id: 'tt-10a-f1', classId: 'class-10a', day: 'Friday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-10a-f2', classId: 'class-10a', day: 'Friday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-10a-f3', classId: 'class-10a', day: 'Friday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-cs', facultyId: 'fac-05' },
    { id: 'tt-10a-f4', classId: 'class-10a', day: 'Friday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-10a-f5', classId: 'class-10a', day: 'Friday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-sst', facultyId: 'fac-04' },
    { id: 'tt-10a-f6', classId: 'class-10a', day: 'Friday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-hin', facultyId: 'fac-06' },

    // Class 9-B Weekly Timetable (Mon-Fri)
    { id: 'tt-9b-m1', classId: 'class-9b', day: 'Monday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-9b-m2', classId: 'class-9b', day: 'Monday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-9b-m3', classId: 'class-9b', day: 'Monday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-9b-m4', classId: 'class-9b', day: 'Monday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-cs', facultyId: 'fac-05' },
    { id: 'tt-9b-m5', classId: 'class-9b', day: 'Monday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-sst', facultyId: 'fac-04' },
    { id: 'tt-9b-m6', classId: 'class-9b', day: 'Monday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-hin', facultyId: 'fac-06' },

    { id: 'tt-9b-t1', classId: 'class-9b', day: 'Tuesday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subjectId: 'sub-math', facultyId: 'fac-01' },
    { id: 'tt-9b-t2', classId: 'class-9b', day: 'Tuesday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subjectId: 'sub-sci', facultyId: 'fac-02' },
    { id: 'tt-9b-t3', classId: 'class-9b', day: 'Tuesday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subjectId: 'sub-eng', facultyId: 'fac-03' },
    { id: 'tt-9b-t4', classId: 'class-9b', day: 'Tuesday', period: 4, startTime: '11:00 AM', endTime: '11:45 AM', subjectId: 'sub-hin', facultyId: 'fac-06' },
    { id: 'tt-9b-t5', classId: 'class-9b', day: 'Tuesday', period: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: 'sub-cs', facultyId: 'fac-05' },
    { id: 'tt-9b-t6', classId: 'class-9b', day: 'Tuesday', period: 6, startTime: '01:15 PM', endTime: '02:00 PM', subjectId: 'sub-sst', facultyId: 'fac-04' },
  ],

  // Past 30 school days attendance
  attendance: (() => {
    const records = [];
    const student10aIds = [
      'stu-10a-01', 'stu-10a-02', 'stu-10a-03', 'stu-10a-04', 'stu-10a-05',
      'stu-10a-06', 'stu-10a-07', 'stu-10a-08', 'stu-10a-09', 'stu-10a-10',
    ];
    const student9bIds = [
      'stu-9b-01', 'stu-9b-02', 'stu-9b-03', 'stu-9b-04', 'stu-9b-05',
      'stu-9b-06', 'stu-9b-07', 'stu-9b-08',
    ];

    // Generate past school dates (skipping Saturdays & Sundays)
    const dates: string[] = [];
    const now = new Date();
    let current = new Date(now);
    current.setDate(current.getDate() - 1); // Start from yesterday

    while (dates.length < 32) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Not Sunday (0) or Saturday (6)
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        dates.push(`${yyyy}-${mm}-${dd}`);
      }
      current.setDate(current.getDate() - 1);
    }

    dates.reverse(); // Chronological order

    let recId = 1;
    // Generate for 10-A
    for (const d of dates) {
      for (const sId of student10aIds) {
        let isPresent = true;
        // Aarav (stu-10a-01): Absent on 4 days -> 28/32 = 87.5% (Teal / above 75%)
        if (sId === 'stu-10a-01') {
          if (d === dates[4] || d === dates[12] || d === dates[21] || d === dates[27]) {
            isPresent = false;
          }
        }
        // Siddharth (stu-10a-07): Absent on 10 days -> 22/32 = 68.7% (Amber / below 75% demo)
        else if (sId === 'stu-10a-07') {
          const idx = dates.indexOf(d);
          if (idx % 3 === 0) isPresent = false;
        }
        // Diya (stu-10a-02): Almost perfect (1 absent)
        else if (sId === 'stu-10a-02') {
          if (d === dates[8]) isPresent = false;
        }
        // Others: Random realistic attendance ~85-95%
        else {
          const charCode = sId.charCodeAt(sId.length - 1) + d.charCodeAt(d.length - 1);
          if (charCode % 11 === 0) isPresent = false;
        }

        records.push({
          id: `att-${recId++}`,
          studentId: sId,
          classId: 'class-10a',
          date: d,
          status: isPresent ? ('Present' as const) : ('Absent' as const),
          markedBy: 'fac-01',
        });
      }
    }

    // Generate for 9-B
    for (const d of dates) {
      for (const sId of student9bIds) {
        let isPresent = true;
        if (sId === 'stu-9b-05') { // Rohan Mehta
          if (d === dates[3] || d === dates[15] || d === dates[25]) isPresent = false;
        } else {
          const charCode = sId.charCodeAt(sId.length - 1) + d.charCodeAt(d.length - 1);
          if (charCode % 9 === 0) isPresent = false;
        }

        records.push({
          id: `att-${recId++}`,
          studentId: sId,
          classId: 'class-9b',
          date: d,
          status: isPresent ? ('Present' as const) : ('Absent' as const),
          markedBy: 'fac-02',
        });
      }
    }

    return records;
  })(),

  exams: [
    {
      id: 'exam-ut1',
      name: 'Unit Test 1',
      classId: 'class-10a',
      date: '2025-08-18',
      academicYear: '2025-2026',
    },
    {
      id: 'exam-mid',
      name: 'Midterm Examination',
      classId: 'class-10a',
      date: '2025-10-10',
      academicYear: '2025-2026',
    },
  ],

  examSubjects: [
    // Unit Test 1 (Max marks: 25)
    { examId: 'exam-ut1', subjectId: 'sub-math', maxMarks: 25 },
    { examId: 'exam-ut1', subjectId: 'sub-sci', maxMarks: 25 },
    { examId: 'exam-ut1', subjectId: 'sub-eng', maxMarks: 25 },
    { examId: 'exam-ut1', subjectId: 'sub-sst', maxMarks: 25 },
    { examId: 'exam-ut1', subjectId: 'sub-hin', maxMarks: 25 },
    { examId: 'exam-ut1', subjectId: 'sub-cs', maxMarks: 25 },

    // Midterm Examination (Max marks: 100)
    { examId: 'exam-mid', subjectId: 'sub-math', maxMarks: 100 },
    { examId: 'exam-mid', subjectId: 'sub-sci', maxMarks: 100 },
    { examId: 'exam-mid', subjectId: 'sub-eng', maxMarks: 100 },
    { examId: 'exam-mid', subjectId: 'sub-sst', maxMarks: 100 },
    { examId: 'exam-mid', subjectId: 'sub-hin', maxMarks: 100 },
    { examId: 'exam-mid', subjectId: 'sub-cs', maxMarks: 100 },
  ],

  results: [
    // Unit Test 1: Published for all subjects of Aarav Sharma (stu-10a-01)
    { id: 'res-ut1-01', studentId: 'stu-10a-01', examId: 'exam-ut1', subjectId: 'sub-math', marks: 24, status: 'Published', enteredBy: 'fac-01', updatedAt: '2025-08-25' },
    { id: 'res-ut1-02', studentId: 'stu-10a-01', examId: 'exam-ut1', subjectId: 'sub-sci', marks: 23, status: 'Published', enteredBy: 'fac-02', updatedAt: '2025-08-25' },
    { id: 'res-ut1-03', studentId: 'stu-10a-01', examId: 'exam-ut1', subjectId: 'sub-eng', marks: 22, status: 'Published', enteredBy: 'fac-03', updatedAt: '2025-08-25' },
    { id: 'res-ut1-04', studentId: 'stu-10a-01', examId: 'exam-ut1', subjectId: 'sub-sst', marks: 21, status: 'Published', enteredBy: 'fac-04', updatedAt: '2025-08-25' },
    { id: 'res-ut1-05', studentId: 'stu-10a-01', examId: 'exam-ut1', subjectId: 'sub-hin', marks: 20, status: 'Published', enteredBy: 'fac-06', updatedAt: '2025-08-25' },
    { id: 'res-ut1-06', studentId: 'stu-10a-01', examId: 'exam-ut1', subjectId: 'sub-cs', marks: 25, status: 'Published', enteredBy: 'fac-05', updatedAt: '2025-08-25' },

    // Unit Test 1 for Diya Patel (stu-10a-02)
    { id: 'res-ut1-07', studentId: 'stu-10a-02', examId: 'exam-ut1', subjectId: 'sub-math', marks: 25, status: 'Published', enteredBy: 'fac-01', updatedAt: '2025-08-25' },
    { id: 'res-ut1-08', studentId: 'stu-10a-02', examId: 'exam-ut1', subjectId: 'sub-sci', marks: 24, status: 'Published', enteredBy: 'fac-02', updatedAt: '2025-08-25' },
    { id: 'res-ut1-09', studentId: 'stu-10a-02', examId: 'exam-ut1', subjectId: 'sub-eng', marks: 24, status: 'Published', enteredBy: 'fac-03', updatedAt: '2025-08-25' },
    { id: 'res-ut1-10', studentId: 'stu-10a-02', examId: 'exam-ut1', subjectId: 'sub-sst', marks: 23, status: 'Published', enteredBy: 'fac-04', updatedAt: '2025-08-25' },
    { id: 'res-ut1-11', studentId: 'stu-10a-02', examId: 'exam-ut1', subjectId: 'sub-hin', marks: 22, status: 'Published', enteredBy: 'fac-06', updatedAt: '2025-08-25' },
    { id: 'res-ut1-12', studentId: 'stu-10a-02', examId: 'exam-ut1', subjectId: 'sub-cs', marks: 23, status: 'Published', enteredBy: 'fac-05', updatedAt: '2025-08-25' },

    // Midterm Exam: Published for Science, English, SST, CS
    // Notice: Mathematics is deliberately NOT YET published for Midterm so Meera Kulkarni can demonstrate entering marks & publishing!
    { id: 'res-mid-01', studentId: 'stu-10a-01', examId: 'exam-mid', subjectId: 'sub-sci', marks: 92, status: 'Published', enteredBy: 'fac-02', updatedAt: '2025-10-18' },
    { id: 'res-mid-02', studentId: 'stu-10a-01', examId: 'exam-mid', subjectId: 'sub-eng', marks: 88, status: 'Published', enteredBy: 'fac-03', updatedAt: '2025-10-18' },
    { id: 'res-mid-03', studentId: 'stu-10a-01', examId: 'exam-mid', subjectId: 'sub-sst', marks: 84, status: 'Published', enteredBy: 'fac-04', updatedAt: '2025-10-18' },
    { id: 'res-mid-04', studentId: 'stu-10a-01', examId: 'exam-mid', subjectId: 'sub-cs', marks: 96, status: 'Published', enteredBy: 'fac-05', updatedAt: '2025-10-18' },
    { id: 'res-mid-05', studentId: 'stu-10a-01', examId: 'exam-mid', subjectId: 'sub-hin', marks: 79, status: 'Published', enteredBy: 'fac-06', updatedAt: '2025-10-18' },

    // Diya Midterm
    { id: 'res-mid-06', studentId: 'stu-10a-02', examId: 'exam-mid', subjectId: 'sub-sci', marks: 95, status: 'Published', enteredBy: 'fac-02', updatedAt: '2025-10-18' },
    { id: 'res-mid-07', studentId: 'stu-10a-02', examId: 'exam-mid', subjectId: 'sub-eng', marks: 94, status: 'Published', enteredBy: 'fac-03', updatedAt: '2025-10-18' },
    { id: 'res-mid-08', studentId: 'stu-10a-02', examId: 'exam-mid', subjectId: 'sub-sst', marks: 91, status: 'Published', enteredBy: 'fac-04', updatedAt: '2025-10-18' },
    { id: 'res-mid-09', studentId: 'stu-10a-02', examId: 'exam-mid', subjectId: 'sub-cs', marks: 90, status: 'Published', enteredBy: 'fac-05', updatedAt: '2025-10-18' },
    { id: 'res-mid-10', studentId: 'stu-10a-02', examId: 'exam-mid', subjectId: 'sub-hin', marks: 88, status: 'Published', enteredBy: 'fac-06', updatedAt: '2025-10-18' },
  ],

  notices: [
    {
      id: 'not-1',
      title: 'Midterm Examination Schedule Announcement',
      description: 'The timetable and room arrangements for the upcoming Midterm Examination have been finalized. Students are requested to bring their student ID cards and standard stationery items. Electronic devices are strictly prohibited in the exam hall.',
      category: 'Exam',
      date: '2025-10-05',
      authorId: 'fac-01',
      authorName: 'Mrs. Meera Kulkarni',
    },
    {
      id: 'not-2',
      title: 'Science Exhibition 2025 – Registrations Open',
      description: 'Scholix Annual Science Fair will be hosted on November 15th. Students from Grades 8 to 10 are invited to submit team project abstracts in Robotics, Clean Energy, and Environmental Tech by the end of this month.',
      category: 'Event',
      date: '2025-10-02',
      authorId: 'fac-02',
      authorName: 'Dr. Rajesh Deshmukh',
    },
    {
      id: 'not-3',
      title: 'Diwali & Midterm Break Holidays',
      description: 'The school will remain closed from October 28th to November 4th on account of the festival of Diwali and midterm break. Classes will resume punctually on Wednesday, November 5th.',
      category: 'Holiday',
      date: '2025-09-28',
      authorId: 'fac-01',
      authorName: 'Mrs. Meera Kulkarni',
    },
    {
      id: 'not-4',
      title: 'Special Mathematics Problem-Solving Workshop',
      description: 'An advanced problem-solving workshop for Grade 10 students preparing for state and national mathematics contests will be conducted every Saturday from 10:00 AM to 12:00 PM in Room 302.',
      category: 'Academic',
      date: '2025-09-20',
      authorId: 'fac-01',
      authorName: 'Mrs. Meera Kulkarni',
    },
    {
      id: 'not-5',
      title: 'CodeCraft Hackathon Winners Felicitations',
      description: 'Congratulations to our Grade 10 student team led by Aarav Sharma for securing 2nd prize at the Inter-School CodeCraft Web Development Hackathon! The trophies will be presented during Monday morning assembly.',
      category: 'General',
      date: '2025-09-12',
      authorId: 'fac-05',
      authorName: 'Mrs. Priya Nair',
    },
  ],

  documentRequests: [
    {
      id: 'REQ-1001',
      studentId: 'stu-10a-01',
      studentName: 'Aarav Sharma',
      studentRollNo: '01',
      className: 'Class 10-A',
      type: 'Fee Certificate',
      purpose: 'Required for bank education loan interest subsidy verification',
      copies: 1,
      dateRequested: '2025-10-12',
      status: 'Ready for Collection',
      remark: 'Signed and stamped by Accounts Department. Available at the Administrative Office counter.',
      updatedBy: 'Mrs. Meera Kulkarni',
    },
    {
      id: 'REQ-1002',
      studentId: 'stu-10a-02',
      studentName: 'Diya Patel',
      studentRollNo: '02',
      className: 'Class 10-A',
      type: 'Scholarship Document',
      purpose: 'State merit scholarship program application submission',
      copies: 2,
      dateRequested: '2025-10-15',
      status: 'Approved',
      remark: 'Verified academic credentials and attendance record. Ready for printing.',
      updatedBy: 'Dr. Rajesh Deshmukh',
    },
    {
      id: 'REQ-1003',
      studentId: 'stu-9b-05',
      studentName: 'Rohan Mehta',
      studentRollNo: '05',
      className: 'Class 9-B',
      type: 'Character Certificate',
      purpose: 'External district sports championship player verification',
      copies: 1,
      dateRequested: '2025-10-20',
      status: 'Pending',
      remark: '',
      updatedBy: '',
    },
  ],
};
