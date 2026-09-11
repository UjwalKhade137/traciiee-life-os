import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const StudentAcademicModal = ({ isOpen, onClose }) => {
  const { data } = useLifeOS();
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'notes' | 'attendance' | 'quiz'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#fafaf3] w-full max-w-2xl rounded-3xl border border-surface-variant shadow-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-xl font-bold text-primary">Student Academic Portal</h2>
            <p className="text-xs text-on-surface-variant">Coursework, study notes, attendance & quiz tracking</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex bg-surface-container rounded-xl p-1 gap-1 mb-4 overflow-x-auto">
          {[
            { id: 'courses', label: 'Subjects & Hours', icon: 'menu_book' },
            { id: 'notes', label: 'Notes & Material', icon: 'description' },
            { id: 'attendance', label: 'Attendance', icon: 'fact_check' },
            { id: 'quiz', label: 'Quiz Center', icon: 'quiz' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Courses & Hours */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-surface-variant shadow-sm bg-white">
              <img
                src={data.academicAssets.dashboardPreview}
                alt="Student Dashboard"
                className="w-full h-44 object-cover object-top"
                loading="lazy"
              />
              <div className="p-3 bg-surface-container-low flex justify-between items-center text-xs">
                <span className="font-bold text-on-surface">Integrated Academic LMS</span>
                <span className="text-secondary font-mono-data font-bold">Overall Attendance: 86.4%</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Enrolled Subjects</h4>
              {data.study.subjects.map(sub => (
                <div key={sub.id} className="bg-surface-container-lowest p-3 rounded-xl border border-surface-variant flex justify-between items-center">
                  <div>
                    <h5 className="text-xs md:text-sm font-bold text-on-background">{sub.name}</h5>
                    <p className="text-[11px] text-on-surface-variant">
                      Exam: <span className="font-medium text-primary">{sub.examDate}</span> • Topics: {sub.topicsDone}/{sub.totalTopics}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-data text-xs md:text-sm font-bold text-secondary">{sub.hours} hrs</span>
                    <p className="text-[10px] text-emerald-700 font-bold">On Schedule</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active Assignments</h4>
              {data.study.assignments.map(as => (
                <div key={as.id} className="bg-surface-container-lowest p-3 rounded-xl border border-surface-variant flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-on-surface">{as.title}</span>
                    <p className="text-[11px] text-on-surface-variant">{as.subject} • Due {as.dueDate}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {as.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Notes & Study Material */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-surface-variant shadow-sm bg-white">
              <img
                src={data.academicAssets.notesPreview}
                alt="Study Material & Notes"
                className="w-full h-52 object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-variant">
              <h4 className="text-xs font-bold text-primary mb-1">Uploaded Study Guides & Slides</h4>
              <p className="text-xs text-on-surface-variant">
                Direct access to professor lecture slides, lab manuals, and previous year question sets.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Attendance */}
        {activeTab === 'attendance' && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-surface-variant shadow-sm bg-white">
              <img
                src={data.academicAssets.attendancePreview}
                alt="Attendance Marking"
                className="w-full h-52 object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-variant">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface">Min Attendance Threshold</span>
                <span className="font-mono-data text-xs font-bold text-primary">75.0% Required</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Your current average is <strong>86.4%</strong> across all theoretical and practical laboratory sessions.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Quiz Center */}
        {activeTab === 'quiz' && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-surface-variant shadow-sm bg-white">
              <img
                src={data.academicAssets.quizPreview}
                alt="Quiz Center"
                className="w-full h-52 object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-variant">
              <h4 className="text-xs font-bold text-primary mb-1">Upcoming Module Quizzes</h4>
              <p className="text-xs text-on-surface-variant">
                Computer Networks Quiz 2 scheduled for next Tuesday. 20 MCQ questions on TCP Congestion Control.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
