import React, { useState, useEffect } from 'react';
import {
  Lock,
  Plus,
  Trash2,
  Save,
  Award,
  Sparkles,
  FileCheck,
  Activity,
  User,
  Calendar,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { dataService } from '../../services/dataService';
import { Student, StudentPortfolio } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const StudentProfile: React.FC = () => {
  const { profile } = useAuth();
  const student = profile as Student;
  const { toast } = useToast();

  const [portfolio, setPortfolio] = useState<StudentPortfolio>({
    studentId: student?.id || '',
    bio: '',
    skills: [],
    achievements: [],
    activities: [],
    certificates: [],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newAch, setNewAch] = useState({ title: '', year: '2024', description: '' });
  const [newAct, setNewAct] = useState({ title: '', role: 'Member', year: '2024-2025' });
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: new Date().toISOString().split('T')[0],
    fileName: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (student) {
      const p = dataService.getPortfolio(student.id);
      setPortfolio(p);
    }
  }, [student]);

  const handleSavePortfolio = async () => {
    if (!student) return;
    setIsSaving(true);
    await dataService.savePortfolio(student.id, portfolio);
    setIsSaving(false);
    toast.success('Your student portfolio has been saved and updated successfully!');
  };

  // Skill handlers
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    const item = { id: `sk-${Date.now()}`, name: newSkill.trim() };
    setPortfolio({ ...portfolio, skills: [...portfolio.skills, item] });
    setNewSkill('');
  };

  const handleRemoveSkill = (id: string) => {
    setPortfolio({ ...portfolio, skills: portfolio.skills.filter((s) => s.id !== id) });
  };

  // Achievement handlers
  const handleAddAchievement = () => {
    if (!newAch.title.trim()) {
      toast.error('Achievement title is required.');
      return;
    }
    const item = { id: `ach-${Date.now()}`, ...newAch };
    setPortfolio({ ...portfolio, achievements: [...portfolio.achievements, item] });
    setNewAch({ title: '', year: '2024', description: '' });
  };

  const handleRemoveAchievement = (id: string) => {
    setPortfolio({
      ...portfolio,
      achievements: portfolio.achievements.filter((a) => a.id !== id),
    });
  };

  // Activity handlers
  const handleAddActivity = () => {
    if (!newAct.title.trim()) {
      toast.error('Activity title is required.');
      return;
    }
    const item = { id: `act-${Date.now()}`, ...newAct };
    setPortfolio({ ...portfolio, activities: [...portfolio.activities, item] });
    setNewAct({ title: '', role: 'Member', year: '2024-2025' });
  };

  const handleRemoveActivity = (id: string) => {
    setPortfolio({ ...portfolio, activities: portfolio.activities.filter((a) => a.id !== id) });
  };

  // Certificate handlers
  const handleAddCertificate = () => {
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      toast.error('Certificate title and issuing body are required.');
      return;
    }
    const item = {
      id: `cert-${Date.now()}`,
      ...newCert,
      fileName: newCert.fileName || `${newCert.title.replace(/\s+/g, '_')}.pdf`,
    };
    setPortfolio({ ...portfolio, certificates: [...portfolio.certificates, item] });
    setNewCert({
      title: '',
      issuer: '',
      date: new Date().toISOString().split('T')[0],
      fileName: '',
    });
  };

  const handleRemoveCertificate = (id: string) => {
    setPortfolio({
      ...portfolio,
      certificates: portfolio.certificates.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-900 tracking-tight">
            My Profile & Digital Portfolio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official academic registration details (read-only) and your personal student portfolio (editable).
          </p>
        </div>
        <button
          onClick={handleSavePortfolio}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition active:scale-95"
        >
          <Save className="w-4 h-4 text-teal-400" />
          {isSaving ? 'Saving...' : 'Save Portfolio Changes'}
        </button>
      </div>

      {/* Official Details Card (Read Only) */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Official Academic Records (Protected / Read-Only)</span>
          </div>
        }
        subtitle="Registered in school central administration database"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Full Student Name
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">{student?.name}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Roll Number & Class
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">
              Roll #{student?.rollNo} (Class 10-A)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Admission Registration
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">
              {student?.admissionNo}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Date of Birth
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">{student?.dob}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Guardian / Parent Name
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">
              {student?.guardianName}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Academic Year
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">
              {student?.academicYear}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Registered Email
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block truncate">
              {student?.contactEmail}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Emergency Contact
            </span>
            <span className="text-xs font-bold text-navy-900 mt-0.5 block">
              {student?.contactPhone}
            </span>
          </div>
        </div>
      </Card>

      {/* Editable Portfolio Section */}
      <div className="space-y-6">
        {/* Bio & Avatar */}
        <Card title="About Me & Student Bio" subtitle="Share your academic interests, goals, and passions">
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Personal Statement / Bio
              </label>
              <textarea
                value={portfolio.bio}
                onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                rows={3}
                placeholder="Write a brief introduction about your goals, favorite subjects, and extracurricular aspirations..."
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs text-slate-900 outline-none transition"
              />
            </div>
          </div>
        </Card>

        {/* Skills Tag List */}
        <Card
          title="Skills & Competencies"
          subtitle="Add subject proficiencies, technical tools, sports, or soft skills"
        >
          <div className="space-y-4 pt-2">
            {/* Tag Badges */}
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold group"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s.id)}
                    className="text-teal-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {portfolio.skills.length === 0 && (
                <p className="text-xs text-slate-400 italic">No skills added yet.</p>
              )}
            </div>

            {/* Input to add */}
            <div className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="e.g. Python, Advanced Geometry, Chess"
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 focus:border-teal-500 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-teal-400" />
                Add
              </button>
            </div>
          </div>
        </Card>

        {/* Achievements Section */}
        <Card
          title="Honors & Achievements"
          subtitle="Olympiads, science fairs, sports tournaments, and school awards"
        >
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolio.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-navy-900">{ach.title}</h4>
                        <Badge variant="navy">{ach.year}</Badge>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{ach.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveAchievement(ach.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new achievement form */}
            <div className="p-4 rounded-xl border border-slate-200 bg-surface space-y-3">
              <span className="text-xs font-bold text-navy-900 block">Add New Achievement</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Achievement title (e.g. State Science Olympiad)"
                  value={newAch.title}
                  onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                  className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2024)"
                  value={newAch.year}
                  onChange={(e) => setNewAch({ ...newAch, year: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Short description of your contribution or prize"
                value={newAch.description}
                onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-4 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-teal-400" />
                Add Achievement
              </button>
            </div>
          </div>
        </Card>

        {/* Certificates & Documents */}
        <Card
          title="Certificates & Credentials"
          subtitle="Verified credentials issued by accredited institutions"
        >
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolio.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy-900">{cert.title}</h4>
                      <p className="text-[10px] text-slate-500">
                        {cert.issuer} • Issued: {cert.date}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveCertificate(cert.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add certificate */}
            <div className="p-4 rounded-xl border border-slate-200 bg-surface space-y-3">
              <span className="text-xs font-bold text-navy-900 block">Add Certificate Record</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Certificate title"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddCertificate}
                className="px-4 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-teal-400" />
                Add Certificate
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
