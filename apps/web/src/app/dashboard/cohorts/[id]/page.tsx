"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Users,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Paperclip,
  CheckCircle,
  FileText,
  MapPin,
  Clock,
  Briefcase,
  User,
  ArrowLeft,
  PlusCircle,
  FileUp,
  Download,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { MaterialAttachment } from "@leaner/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LessonPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "completed" | "upcoming";
}

interface StudentSubmission {
  id: string;
  studentName: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  studentComment: string;
  feedback: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  submissions: StudentSubmission[];
}

interface ChatMessage {
  id: string;
  sender: "teacher" | "student";
  senderName: string;
  text: string;
  time: string;
  attachment?: { title: string; type: string };
}

export default function CohortDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const cohortId = params.id as string;

  const [cohort, setCohort] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDesc, setNewLessonDesc] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("60 mins");

  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
  const [newAssignmentDesc, setNewAssignmentDesc] = useState("");
  const [newAssignmentDeadline, setNewAssignmentDeadline] = useState("In 3 days");

  // Dynamic States
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([
    {
      id: "lp-1",
      title: "Algebraic Substitutions & Linear Eq",
      description: "Basic introductory review of equations with single and multiple unknowns.",
      duration: "60 mins",
      status: "completed"
    },
    {
      id: "lp-2",
      title: "Quadratic Equation Formulations",
      description: "Focus on factoring, completing the square, and graphical parabola plots.",
      duration: "90 mins",
      status: "upcoming"
    }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "as-1",
      title: "Quadratic Equations Worksheet 1",
      description: "Complete all questions from Section A & Section B of the attached worksheet.",
      deadline: "2026-05-25 (12:00 CAT)",
      submissions: [
        {
          id: "sub-1",
          studentName: "Liam Mpofu",
          fileName: "liam_math_quadratics.pdf",
          fileSize: "2.1 MB",
          submittedAt: "2026-05-21 18:22",
          studentComment: "I found question 4 a bit tricky because the discriminant was negative. Please review.",
          feedback: ""
        }
      ]
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "ch-1",
      sender: "student",
      senderName: "Liam Mpofu",
      text: "Hi tutor, for the next live revision cohort, will we cover Cambridge CIE past paper questions on Geometry?",
      time: "14:32"
    },
    {
      id: "ch-2",
      sender: "teacher",
      senderName: "You (Tutor)",
      text: "Yes Liam! I am preparing a geometry compilation. I will upload it as an attachment soon.",
      time: "14:40"
    }
  ]);

  const [chatText, setChatText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Trigger simulated toasts
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Load cohort data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCohorts = localStorage.getItem("leaner_activeCohorts");
      if (savedCohorts) {
        try {
          const list = JSON.parse(savedCohorts);
          const found = list.find((c: any) => c.id === cohortId);
          if (found) {
            setCohort(found);
          } else {
            // Fallback mock
            setCohort({
              id: cohortId,
              title: "O-Level Mathematics Revision Cohort",
              subject: "Mathematics",
              curriculum: "ZIMSEC",
              schedule: "Saturdays 10:00 CAT (Weekly)",
              price: 8.0,
              seats: 25,
              registeredCount: 18,
              publishStatus: "published",
              deliveryMode: "online",
              location: "",
              description: "A comprehensive revision cohort focusing on Algebra, Quadratic equations, Geometry, and Probability. Ideal for students preparing for their ZIMSEC O-Level examinations.",
              miniDescription: "ZIMSEC O-Level Math prep & exam review."
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    }
  }, [cohortId]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const newLP: LessonPlan = {
      id: `lp-${Date.now()}`,
      title: newLessonTitle,
      description: newLessonDesc || "No description provided.",
      duration: newLessonDuration,
      status: "upcoming"
    };

    setLessonPlans(prev => [...prev, newLP]);
    setNewLessonTitle("");
    setNewLessonDesc("");
    setIsAddLessonOpen(false);
    triggerToast(`Lesson plan "${newLP.title}" successfully added!`);
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignmentTitle.trim()) return;

    const newAS: Assignment = {
      id: `as-${Date.now()}`,
      title: newAssignmentTitle,
      description: newAssignmentDesc || "No instructions provided.",
      deadline: newAssignmentDeadline,
      submissions: []
    };

    setAssignments(prev => [newAS, ...prev]);
    setNewAssignmentTitle("");
    setNewAssignmentDesc("");
    setIsAddAssignmentOpen(false);
    triggerToast(`Assignment "${newAS.title}" published to student roster!`);
  };

  // Simulate a student submission for the first assignment
  const simulateStudentSubmission = (assignmentId: string) => {
    const studentNames = ["Amina Jiri", "Tinashe Shumba", "Rudo Chipo", "Liam Mpofu"];
    const files = ["homework_algebra_v2.docx", "geometry_shapes_scan.pdf", "formula_answers.pdf"];
    const comments = [
      "Finished all questions except the last one.",
      "Uploaded my scan, let me know if it is clear enough.",
      "Please check my solution to question 3. Did I apply the theorem correctly?",
      "Here is my completed work!"
    ];

    const randomName = studentNames[Math.floor(Math.random() * studentNames.length)];
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    setAssignments(prev =>
      prev.map(as => {
        if (as.id === assignmentId) {
          const newSub: StudentSubmission = {
            id: `sub-${Date.now()}`,
            studentName: randomName,
            fileName: randomFile,
            fileSize: "1.8 MB",
            submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
            studentComment: randomComment,
            feedback: ""
          };
          return {
            ...as,
            submissions: [newSub, ...as.submissions]
          };
        }
        return as;
      })
    );

    triggerToast(`Simulated submission uploaded by student "${randomName}"!`);
  };

  // Send a message and trigger delayed auto response
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    const userMsg: ChatMessage = {
      id: `ch-user-${Date.now()}`,
      sender: role === "learner" ? "student" : "teacher",
      senderName: role === "learner" ? "Liam Mpofu" : "You (Tutor)",
      text: chatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatText("");

    if (role !== "learner") {
      // Simulated student response after 1.5 seconds
      setTimeout(() => {
        const responses = [
          "Thanks tutor! I will download that material right away.",
          "That makes complete sense. I will attempt the assignment using this method.",
          "Got it, see you in the live meetup!",
          "Thank you! Will you upload the answersheet as well?",
          "I've uploaded my draft worksheet, let me know your thoughts."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const studentMsg: ChatMessage = {
          id: `ch-student-${Date.now()}`,
          sender: "student",
          senderName: "Liam Mpofu",
          text: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => [...prev, studentMsg]);
      }, 1500);
    } else {
      // Simulated tutor response after 1.5 seconds
      setTimeout(() => {
        const responses = [
          "Excellent question! We will cover this in detail next session.",
          "Please check the resources tab, I have uploaded the formulas sheet.",
          "Make sure to review the quadratics homework by tomorrow.",
          "Yes, I will open the BigBlueButton room 10 minutes early."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const tutorMsg: ChatMessage = {
          id: `ch-tutor-${Date.now()}`,
          sender: "teacher",
          senderName: cohort ? `Tutor (${cohort.tutor})` : "Tutor",
          text: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => [...prev, tutorMsg]);
      }, 1500);
    }
  };

  const handleFeedbackChange = (assignmentId: string, subId: string, txt: string) => {
    setAssignments(prev =>
      prev.map(as => {
        if (as.id === assignmentId) {
          return {
            ...as,
            submissions: as.submissions.map(sub =>
              sub.id === subId ? { ...sub, feedback: txt } : sub
            )
          };
        }
        return as;
      })
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-500">Loading cohort details...</span>
        </div>
      </div>
    );
  }

  if (!cohort) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3 animate-bounce" />
        <h3 className="text-sm font-black text-slate-800">Cohort Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">This group cohort does not exist or has been deleted.</p>
        <Link 
          href="/dashboard" 
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 border border-slate-800 animate-slide-in text-xs font-bold">
          <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Panel */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <Link 
              href={role === "learner" ? "/dashboard?role=learner" : "/dashboard?role=teacher"} 
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider mb-2"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> {role === "learner" ? "Back to Learner Dashboard" : "Back to Teacher Studio"}
            </Link>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black border border-indigo-150">{cohort.curriculum}</span>
              <span className="px-2 py-0.5 bg-slate-50 text-slate-650 rounded-lg text-[9px] font-black border border-slate-200">{cohort.subject}</span>
              {cohort.deliveryMode === "offline" ? (
                <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-lg text-[9px] font-black border border-rose-200 uppercase">Offline Venue</span>
              ) : (
                <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-lg text-[9px] font-black border border-cyan-200 uppercase">Online Meetup</span>
              )}
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-black border border-emerald-200 uppercase">Active</span>
            </div>
            
            <h1 className="text-lg font-black text-slate-900 mt-1">{cohort.title}</h1>
            <p className="text-xs text-slate-500 font-semibold">{cohort.miniDescription}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-450 font-bold block uppercase">Ticket Price</span>
              <span className="text-sm font-black text-slate-900">${cohort.price?.toFixed(2)} USD</span>
            </div>

            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <Users className="h-4 w-4 text-indigo-500" />
              <span>{cohort.registeredCount} / {cohort.seats} Enrolled</span>
            </div>

            {cohort.deliveryMode === "online" && (
              <button 
                onClick={() => triggerToast("Connecting to BigBlueButton classroom simulator...")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Clock className="h-4 w-4" /> Launch BBB Class
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Content & Submissions) - Takes 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Cohort Description Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Cohort Syllabus Description</h3>
            <p className="text-xs text-slate-650 leading-relaxed bg-slate-50/50 p-3.5 border border-slate-100 rounded-xl whitespace-pre-wrap">{cohort.description}</p>
            {cohort.deliveryMode === "offline" && cohort.location && (
              <div className="flex items-center gap-2 bg-rose-50/40 border border-rose-100 p-3 rounded-xl text-xs text-rose-800 font-bold">
                <MapPin className="h-4 w-4 text-rose-600 shrink-0" />
                <span>Physical Venue: {cohort.location}</span>
              </div>
            )}
          </div>

          {/* Lesson Plans Segment */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Lesson Plans & Schedule</h3>
                <p className="text-[10px] text-slate-450 mt-0.5 font-bold">Build chronological syllabus roadmap and milestones.</p>
              </div>
              {role !== "learner" && (
                <button 
                  onClick={() => setIsAddLessonOpen(true)}
                  className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Lesson
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {lessonPlans.map((lp, idx) => (
                <div key={lp.id} className="p-4 border border-slate-200/80 rounded-xl flex items-start justify-between gap-4 bg-white hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">0{idx + 1}</span>
                      <h4 className="text-xs font-black text-slate-850">{lp.title}</h4>
                      {lp.status === "completed" ? (
                        <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[9px] font-bold border border-green-150 uppercase">Done</span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[9px] font-bold border border-amber-150 uppercase">Upcoming</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-semibold">{lp.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450 shrink-0">
                    <Clock className="h-3 w-3" />
                    <span>{lp.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Workspace */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Active Tasks & Homework</h3>
                <p className="text-[10px] text-slate-450 mt-0.5 font-bold">
                  {role === "learner" ? "View assigned tasks and submit your homework uploads." : "Assign tasks. Review student uploads and give review feedback."}
                </p>
              </div>
              {role !== "learner" && (
                <button 
                  onClick={() => setIsAddAssignmentOpen(true)}
                  className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Publish Task
                </button>
              )}
            </div>

            <div className="space-y-6">
              {assignments.map((as) => {
                const learnerSub = as.submissions.find(sub => sub.studentName === "Liam Mpofu");
                const submissionsToShow = role === "learner" 
                  ? (learnerSub ? [learnerSub] : []) 
                  : as.submissions;

                return (
                  <div key={as.id} className="p-4 border border-slate-250/70 rounded-2xl bg-slate-50/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5 pb-3 border-b border-slate-100">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black text-slate-850 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-indigo-500" />
                          {as.title}
                        </h4>
                        <p className="text-xs text-slate-555 font-semibold">{as.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase">Deadline</span>
                        <span className="text-[10px] text-slate-600 font-black">{as.deadline}</span>
                      </div>
                    </div>

                    {/* Submission Header & Simulation */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          {role === "learner" ? "My Submission" : `Student Uploads (${as.submissions.length})`}
                        </span>
                        {role !== "learner" && (
                          <button 
                            onClick={() => simulateStudentSubmission(as.id)}
                            className="text-[9px] font-black bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 py-1 rounded border border-indigo-100 flex items-center gap-1 transition-colors"
                          >
                            <PlusCircle className="h-2.5 w-2.5" /> Simulate Student Submission
                          </button>
                        )}
                      </div>

                      {submissionsToShow.length > 0 ? (
                        <div className="space-y-3">
                          {submissionsToShow.map((sub) => (
                            <div key={sub.id} className="p-3 bg-white border border-slate-150 rounded-xl space-y-3 shadow-xs">
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-650">
                                <span className="text-slate-900 font-black flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                  {role === "learner" ? "You (Learner)" : sub.studentName}
                                </span>
                                <span className="text-slate-400 text-[10px]">{sub.submittedAt}</span>
                              </div>
                              
                              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="p-1.5 bg-rose-50 text-rose-600 rounded text-xs font-bold shrink-0">📄</span>
                                  <div className="min-w-0">
                                    <div className="font-extrabold text-slate-800 text-[11px] truncate">{sub.fileName}</div>
                                    <div className="text-[9px] text-slate-400 font-semibold">{sub.fileSize}</div>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => triggerToast(`Simulating download of ${sub.fileName}...`)}
                                  className="p-1.5 text-slate-450 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                  title="Download submission"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>

                              {sub.studentComment && (
                                <p className="text-xs italic text-slate-505 pl-2.5 border-l-2 border-slate-200">
                                  "{sub.studentComment}"
                                </p>
                              )}

                              {/* Feedback Form / Feedback View */}
                              {role === "learner" ? (
                                <div className="pt-2.5 border-t border-slate-100 space-y-1 bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100/50">
                                  <span className="text-[10px] font-black text-indigo-900 uppercase tracking-wider block">Tutor Feedback</span>
                                  <p className="text-xs text-indigo-950 font-semibold italic">
                                    {sub.feedback ? `"${sub.feedback}"` : "Your tutor has not left any feedback yet."}
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                  <label className="text-[10px] font-bold text-slate-500 block">Feedback & Grading Notes</label>
                                  <div className="flex items-center gap-2">
                                    <input 
                                      type="text" 
                                      placeholder="Type homework grading feedback..."
                                      value={sub.feedback}
                                      onChange={(e) => handleFeedbackChange(as.id, sub.id, e.target.value)}
                                      className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <button 
                                      onClick={() => triggerToast(`Feedback sent to ${sub.studentName}!`)}
                                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-black transition-colors"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        role === "learner" ? (
                          <div className="p-4 bg-white border border-dashed border-slate-200 rounded-xl space-y-3">
                            <div className="flex flex-col items-center justify-center py-2 text-center text-xs text-slate-400">
                              <PlusCircle className="h-8 w-8 text-indigo-400 mb-1" />
                              <span className="font-extrabold text-slate-700">Submit Your Work</span>
                              <span>Upload PDF, Word, or Image files for your tutor to grade.</span>
                            </div>
                            <div className="flex gap-2 justify-center">
                              <input 
                                type="file" 
                                id={`file-upload-${as.id}`} 
                                className="hidden" 
                                onChange={() => {
                                  const newSub: StudentSubmission = {
                                    id: `sub-${Date.now()}`,
                                    studentName: "Liam Mpofu",
                                    fileName: "homework_submission_liam.pdf",
                                    fileSize: "1.5 MB",
                                    submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
                                    studentComment: "Here is my homework submission for review.",
                                    feedback: ""
                                  };
                                  setAssignments(prev => prev.map(a => a.id === as.id ? { ...a, submissions: [...a.submissions, newSub] } : a));
                                  triggerToast("Homework successfully submitted!");
                                }}
                              />
                              <button 
                                onClick={() => document.getElementById(`file-upload-${as.id}`)?.click()} 
                                className="w-full bg-indigo-650 hover:bg-indigo-600 text-white font-black text-xs py-2 rounded-xl transition-colors text-center shadow-xs"
                              >
                                Choose File & Submit
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-white border border-dashed border-slate-200 rounded-xl text-center">
                            <p className="text-xs text-slate-400 italic">No submissions uploaded yet.</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (Interactivity & Chat Board) - Takes 1 col */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Chat Panel Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-[550px] overflow-hidden">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-indigo-500" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-tight">Materials Chat Flow</h4>
                  <p className="text-[9px] text-slate-400 font-bold">Instantly messages online cohort members.</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-ping"></span>
            </div>

             {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30">
              {chatMessages.map((msg) => {
                const isOutgoing = (role === "learner" && msg.sender === "student") || (role !== "learner" && msg.sender === "teacher");
                const displayName = msg.sender === "student"
                  ? (role === "learner" ? "You (Learner)" : msg.senderName)
                  : (role === "learner" ? `Tutor (${cohort?.tutor || "Tutor"})` : "You (Tutor)");

                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${
                      isOutgoing ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <span className="text-[9px] font-bold text-slate-450 mb-0.5 px-1">{displayName}</span>
                    <div 
                      className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-xs ${
                        isOutgoing 
                          ? "bg-slate-900 text-white rounded-tr-none" 
                          : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-150 bg-white flex items-center gap-2">
              <button 
                type="button"
                onClick={() => triggerToast("Simulating document attachment...")}
                className="p-1.5 text-slate-450 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                title="Attach file reference"
              >
                <Paperclip className="h-4.5 w-4.5" />
              </button>
              <input 
                type="text" 
                placeholder={role === "learner" ? "Type a message to your class/tutor..." : "Type a group class message..."}
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                className="p-2 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl shadow-xs transition-colors shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>

          {/* Student Roster status card / Classmates */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {role === "learner" ? "Classmates" : "Student Roster & Parent Links"}
            </h3>
            <div className="space-y-2 text-xs">
              {role === "learner" ? (
                <>
                  <div className="p-3 bg-slate-50/70 border border-slate-150 rounded-xl flex items-center gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-orange-100 text-orange-700 text-[10px] font-black">AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-extrabold text-slate-800">Amina Jiri</div>
                      <div className="text-[9px] text-slate-450 font-semibold">Registered Classmate</div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50/70 border border-slate-150 rounded-xl flex items-center gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-[10px] font-black">TS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-extrabold text-slate-800">Tinashe Shumba</div>
                      <div className="text-[9px] text-slate-450 font-semibold">Registered Classmate</div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50/70 border border-slate-150 rounded-xl flex items-center gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-purple-100 text-purple-700 text-[10px] font-black">RC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-extrabold text-slate-800">Rudo Chipo</div>
                      <div className="text-[9px] text-slate-450 font-semibold">Registered Classmate</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-slate-50/70 border border-slate-150 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-800">Liam Mpofu</div>
                      <div className="text-[9px] text-slate-450 font-semibold">Parent: Thabo Mpofu (Linked)</div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded border border-emerald-250 uppercase">Active</span>
                  </div>
                  <div className="p-3 bg-slate-50/70 border border-slate-150 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-800">Amina Jiri</div>
                      <div className="text-[9px] text-slate-450 font-semibold">Parent: Nyasha Jiri (Linked)</div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded border border-emerald-250 uppercase">Active</span>
                  </div>
                  <div className="p-3 bg-slate-50/70 border border-slate-150 rounded-xl flex items-center justify-between opacity-70">
                    <div>
                      <div className="font-extrabold text-slate-800">Tinashe Shumba</div>
                      <div className="text-[9px] text-slate-450 font-semibold">Parent: Not Linked</div>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-black rounded border border-amber-250 uppercase">Pending</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODALS */}
      
      {/* Add Lesson Modal */}
      {isAddLessonOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
              <PlusCircle className="h-5 w-5 text-indigo-600" />
              Add Scheduled Lesson Plan
            </h3>
            
            <form onSubmit={handleAddLesson} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Lesson Topic Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Solving quadratics by completing square" 
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Lesson Description / Outline</label>
                <textarea 
                  rows={3}
                  placeholder="Provide sub-topics, textbooks chapters, or objectives..." 
                  value={newLessonDesc}
                  onChange={(e) => setNewLessonDesc(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Lesson Duration</label>
                <select 
                  value={newLessonDuration} 
                  onChange={(e) => setNewLessonDuration(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="45 mins">45 minutes</option>
                  <option value="60 mins">60 minutes (1 hour)</option>
                  <option value="90 mins">90 minutes (1.5 hours)</option>
                  <option value="120 mins">120 minutes (2 hours)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddLessonOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold rounded-xl shadow-sm"
                >
                  Add Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {isAddAssignmentOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
              <FileUp className="h-5 w-5 text-indigo-600" />
              Publish homework or assignments
            </h3>
            
            <form onSubmit={handleAddAssignment} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Task Assignment Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Homework Worksheet 3: Algebra Past Papers" 
                  value={newAssignmentTitle}
                  onChange={(e) => setNewAssignmentTitle(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Instructions & Resource link notes</label>
                <textarea 
                  rows={3}
                  placeholder="Tell students which files to complete, what the grading criteria is..." 
                  value={newAssignmentDesc}
                  onChange={(e) => setNewAssignmentDesc(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Deadline / Submission Target</label>
                <input 
                  type="text" 
                  placeholder="e.g. Next Saturday, 12:00 CAT" 
                  value={newAssignmentDeadline}
                  onChange={(e) => setNewAssignmentDeadline(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddAssignmentOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold rounded-xl shadow-sm"
                >
                  Publish Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
