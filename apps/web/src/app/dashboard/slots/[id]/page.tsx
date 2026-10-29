"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  User,
  Users,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Paperclip,
  CheckCircle,
  FileText,
  Clock,
  Briefcase,
  ArrowLeft,
  PlusCircle,
  FileUp,
  Download,
  AlertCircle,
  Smile,
  Shield,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { MaterialAttachment } from "@leaner/types";

interface StudyObjective {
  id: string;
  text: string;
  completed: boolean;
}

interface StudentSubmission {
  id: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  studentComment: string;
  feedback: string;
}

interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submissions: StudentSubmission[];
}

interface ChatMessage {
  id: string;
  sender: "teacher" | "student" | "parent";
  senderName: string;
  text: string;
  time: string;
  channel: "student" | "parent";
}

export default function SlotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const slotId = params.id as string;

  const [slot, setSlot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Booking Simulation Dialog State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [simulatedStudentName, setSimulatedStudentName] = useState("Liam Mpofu");
  const [simulatedParentName, setSimulatedParentName] = useState("Thabo Mpofu");

  // Form States
  const [isAddObjectiveOpen, setIsAddObjectiveOpen] = useState(false);
  const [newObjectiveText, setNewObjectiveText] = useState("");

  const [isAddHomeworkOpen, setIsAddHomeworkOpen] = useState(false);
  const [newHomeworkTitle, setNewHomeworkTitle] = useState("");
  const [newHomeworkDesc, setNewHomeworkDesc] = useState("");
  const [newHomeworkDue, setNewHomeworkDue] = useState("Next Tuesday, 12:00 CAT");

  // Chat Interaction States
  const [chatTab, setChatTab] = useState<"student" | "parent">("student");
  const [chatText, setChatText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Dynamic state stores (specific to this slot instance, backed by state)
  const [objectives, setObjectives] = useState<StudyObjective[]>([
    { id: "obj-1", text: "Evaluate core areas of difficulty in calculus", completed: true },
    { id: "obj-2", text: "Review chain rule & product rule differentiation formulas", completed: true },
    { id: "obj-3", text: "Solve 5 past paper questions on Optimization problems", completed: false },
    { id: "obj-4", text: "Complete home quiz worksheet on Rates of Change", completed: false }
  ]);

  const [homeworks, setHomeworks] = useState<HomeworkAssignment[]>([
    {
      id: "hw-1",
      title: "Differentiation Sheet A - Chain Rule",
      description: "Solve all problems in Exercise 3.2. Show all workings for partial derivatives.",
      dueDate: "2026-05-24 (17:00 CAT)",
      submissions: [
        {
          id: "sub-1",
          fileName: "chain_rule_solutions_draft.pdf",
          fileSize: "1.4 MB",
          submittedAt: "2026-05-21 16:15",
          studentComment: "Tutor, I was stuck on question 8 (implicit differentiation step). Hope the rest is correct.",
          feedback: ""
        }
      ]
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    // Student channel
    {
      id: "msg-1",
      sender: "student",
      senderName: "Student",
      text: "Hello tutor! I uploaded my calculus sheet. Can we review question 8 during the session?",
      time: "16:20",
      channel: "student"
    },
    {
      id: "msg-2",
      sender: "teacher",
      senderName: "You (Tutor)",
      text: "Hi! Yes, I saw your submission. Question 8 requires applying implicit differentiation first. We will break it down step-by-step.",
      time: "16:45",
      channel: "student"
    },
    // Parent channel
    {
      id: "msg-p1",
      sender: "parent",
      senderName: "Parent",
      text: "Greetings teacher, how is Liam progressing with his calculus topics? Is he prepared for the upcoming monthly assessment?",
      time: "11:15",
      channel: "parent"
    },
    {
      id: "msg-p2",
      sender: "teacher",
      senderName: "You (Tutor)",
      text: "Hello. He is doing very well with derivative applications. He just needs a bit more practice on word problems, which we will focus on today.",
      time: "11:30",
      channel: "parent"
    }
  ]);

  // Toast helper
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Scroll chat to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatTab]);

  // Load slot from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSlots = localStorage.getItem("leaner_availSlots");
      if (savedSlots) {
        try {
          const list = JSON.parse(savedSlots);
          const found = list.find((s: any) => s.id === slotId);
          if (found) {
            setSlot(found);
          } else {
            // Fallback slot mockup
            setSlot({
              id: slotId,
              day: "Tuesday",
              time: "09:00 CAT",
              subject: "Mathematics",
              status: "Booked (Liam Mpofu)",
              publishStatus: "published",
              description: "One-on-one private calculus review session. Focus will be on derivative applications and graphing curves.",
              miniDescription: "Private Calculus slot - Liam Mpofu.",
              attachments: [
                { id: "att-s1-1", title: "Calculus Practice Questions", fileName: "calculus_practice_questions.pdf", fileSize: "1.4 MB", order: 1 }
              ]
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    }
  }, [slotId]);

  useEffect(() => {
    if (role === "learner") {
      setChatTab("student");
    }
  }, [role]);

  // Parse student name if booked
  const isBooked = slot && slot.status && slot.status.startsWith("Booked");
  const studentName = isBooked 
    ? slot.status.replace("Booked (", "").replace(")", "") 
    : null;

  // Infer parent name based on mock list or default
  const getParentName = () => {
    if (studentName === "Liam Mpofu") return "Thabo Mpofu";
    if (studentName === "Chipo Ndlovu") return "Nyasha Ndlovu";
    if (studentName === "Tinashe Sibanda") return "George Sibanda";
    return "Parent";
  };

  const parentName = isBooked ? getParentName() : "Parent";

  // Simulate slot booking directly on this detail page
  const handleSimulateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) return;

    const updatedSlot = {
      ...slot,
      status: `Booked (${simulatedStudentName})`,
      miniDescription: `Private ${slot.subject} slot - ${simulatedStudentName}.`,
      description: slot.description || `One-on-one private tutoring slot for ${slot.subject}.`
    };

    // Update state
    setSlot(updatedSlot);
    setIsBookModalOpen(false);

    // Save to localStorage
    if (typeof window !== "undefined") {
      const savedSlots = localStorage.getItem("leaner_availSlots");
      if (savedSlots) {
        try {
          const list = JSON.parse(savedSlots);
          const idx = list.findIndex((s: any) => s.id === slotId);
          if (idx !== -1) {
            list[idx] = updatedSlot;
            localStorage.setItem("leaner_availSlots", JSON.stringify(list));
          } else {
            // Append
            list.push(updatedSlot);
            localStorage.setItem("leaner_availSlots", JSON.stringify(list));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    triggerToast(`Slot successfully booked by student "${simulatedStudentName}"!`);
  };

  // Add study objective
  const handleAddObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjectiveText.trim()) return;

    const newObj: StudyObjective = {
      id: `obj-${Date.now()}`,
      text: newObjectiveText,
      completed: false
    };

    setObjectives(prev => [...prev, newObj]);
    setNewObjectiveText("");
    setIsAddObjectiveOpen(false);
    triggerToast("Tutoring objective added to syllabus plan!");
  };

  const toggleObjective = (id: string) => {
    setObjectives(prev =>
      prev.map(o => (o.id === id ? { ...o, completed: !o.completed } : o))
    );
    triggerToast("Objective updated successfully!");
  };

  // Add homework assignment
  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHomeworkTitle.trim()) return;

    const newHW: HomeworkAssignment = {
      id: `hw-${Date.now()}`,
      title: newHomeworkTitle,
      description: newHomeworkDesc || "No additional instructions.",
      dueDate: newHomeworkDue,
      submissions: []
    };

    setHomeworks(prev => [newHW, ...prev]);
    setNewHomeworkTitle("");
    setNewHomeworkDesc("");
    setIsAddHomeworkOpen(false);
    triggerToast(`Homework "${newHW.title}" assigned to student.`);
  };

  // Simulate Student Homework Upload
  const simulateStudentHomework = (hwId: string) => {
    const files = ["calculus_exercise_answers.pdf", "limit_laws_notes.pdf", "math_homework_submission.docx"];
    const comments = [
      "I completed the whole sheet. Please check my working on section B.",
      "Attached is my homework scan. Sorry for uploading late!",
      "I tried my best but struggled with the final application problem."
    ];

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    setHomeworks(prev =>
      prev.map(hw => {
        if (hw.id === hwId) {
          const newSub: StudentSubmission = {
            id: `sub-${Date.now()}`,
            fileName: randomFile,
            fileSize: "1.9 MB",
            submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
            studentComment: randomComment,
            feedback: ""
          };
          return {
            ...hw,
            submissions: [newSub, ...hw.submissions]
          };
        }
        return hw;
      })
    );

    triggerToast(`Simulated submission uploaded by "${studentName}"!`);
  };

  // Submit Feedback on Homework
  const handleFeedbackSubmit = (hwId: string, subId: string, txt: string) => {
    setHomeworks(prev =>
      prev.map(hw => {
        if (hw.id === hwId) {
          return {
            ...hw,
            submissions: hw.submissions.map(sub =>
              sub.id === subId ? { ...sub, feedback: txt } : sub
            )
          };
        }
        return hw;
      })
    );
  };

  // Send Direct Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    const myMsg: ChatMessage = {
      id: `msg-t-${Date.now()}`,
      sender: role === "learner" ? "student" : "teacher",
      senderName: role === "learner" ? "You (Learner)" : "You (Tutor)",
      text: chatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: role === "learner" ? "student" : chatTab
    };

    setChatMessages(prev => [...prev, myMsg]);
    const originalText = chatText;
    setChatText("");

    // Simulate response after 1.5s
    setTimeout(() => {
      let replyText = "";
      let senderType: "student" | "parent" | "teacher" = "student";
      let nameLabel = studentName || "Student";

      if (role === "learner") {
        const teacherReplies = [
          "Perfect! I will review that before our lesson starts.",
          "Understood. I will check your uploaded worksheet now.",
          "Could you also make sure to check the Calculus Practice Questions attached?",
          "Yes, that makes sense. See you in the BBB room!"
        ];
        replyText = teacherReplies[Math.floor(Math.random() * teacherReplies.length)];
        senderType = "teacher";
        nameLabel = "Dr. Albert Sibanda";
      } else if (chatTab === "student") {
        const studentReplies = [
          "Perfect! I will review that before our lesson starts.",
          "Understood. I will submit the other worksheet tonight.",
          "Could you also send the formulas cheatsheet we talked about?",
          "Yes, that makes sense. See you in the virtual classroom!"
        ];
        replyText = studentReplies[Math.floor(Math.random() * studentReplies.length)];
        senderType = "student";
      } else {
        const parentReplies = [
          "Thank you for the update, teacher. We will make sure he finishes his calculus tasks.",
          "Excellent, we appreciate your support. Is there any specific textbook we should purchase?",
          "Thank you! Please let us know if he misses any live sessions.",
          "We will review his homework together this evening."
        ];
        replyText = parentReplies[Math.floor(Math.random() * parentReplies.length)];
        senderType = "parent";
        nameLabel = parentName;
      }

      const botMsg: ChatMessage = {
        id: `msg-b-${Date.now()}`,
        sender: senderType as any,
        senderName: nameLabel,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: role === "learner" ? "student" : chatTab
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  // Filter messages based on selected channel tab
  const filteredMessages = chatMessages.filter(msg => msg.channel === chatTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-500">Loading 1-on-1 slot details...</span>
        </div>
      </div>
    );
  }

  if (!slot) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3 animate-bounce" />
        <h3 className="text-sm font-black text-slate-800">Private Slot Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">This tutoring slot does not exist or has been removed.</p>
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
            {role === "learner" ? (
              <Link 
                href="/dashboard?role=learner" 
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider mb-2"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back to Learner Dashboard
              </Link>
            ) : (
              <Link 
                href="/dashboard?role=teacher" 
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider mb-2"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back to Teacher Studio
              </Link>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black border border-indigo-150 flex items-center gap-1">
                <Calendar className="h-2.5 w-2.5" />
                {slot.day}
              </span>
              <span className="px-2 py-0.5 bg-slate-50 text-slate-650 rounded-lg text-[9px] font-black border border-slate-200 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {slot.time}
              </span>
              <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-lg text-[9px] font-black border border-cyan-150 uppercase">{slot.subject}</span>
              
              {isBooked ? (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-black border border-emerald-250 uppercase">Booked Slot</span>
              ) : (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-lg text-[9px] font-black border border-amber-250 uppercase animate-pulse">Vacant Available</span>
              )}
            </div>
            
            <h1 className="text-lg font-black text-slate-900 mt-1">
              {isBooked 
                ? (role === "learner" ? "1-on-1 Coaching: Dr. Albert Sibanda" : `1-on-1 Coaching: ${studentName}`)
                : `Private Slot: ${slot.day} @ ${slot.time}`}
            </h1>
            <p className="text-xs text-slate-500 font-semibold">{slot.miniDescription}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isBooked ? (
              <button 
                onClick={() => triggerToast("Launching BigBlueButton 1-on-1 private room simulator...")}
                className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Clock className="h-4 w-4" /> Launch BBB Room
              </button>
            ) : (
              role !== "learner" && (
                <button 
                  onClick={() => setIsBookModalOpen(true)}
                  className="bg-emerald-650 hover:bg-emerald-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="h-4 w-4" /> Simulate Learner Booking
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {isBooked ? (
          <>
            {/* Left Column (Syllabus Objectives & Homeworks) - Takes 2 cols */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Slot Description Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  Coaching Focus & Outline
                </h3>
                <p className="text-xs text-slate-650 leading-relaxed bg-slate-50/50 p-3.5 border border-slate-100 rounded-xl whitespace-pre-wrap">{slot.description}</p>
                
                {/* Material Attachments list (if any uploaded) */}
                {slot.attachments && slot.attachments.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Coaching Lesson Materials</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {slot.attachments.map((att: MaterialAttachment) => (
                        <div key={att.id} className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">📄</span>
                            <div className="min-w-0">
                              <div className="font-extrabold text-slate-800 truncate">{att.title}</div>
                              <div className="text-[9px] text-slate-400 font-semibold">{att.fileName} ({att.fileSize})</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => triggerToast(`Simulating download of ${att.fileName}...`)}
                            className="p-1 text-slate-400 hover:text-slate-650 rounded"
                            title="Download resource"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Personalized Study Objectives Checklist */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Personalized Study Guide</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5 font-bold">
                      {role === "learner" ? "Track objectives and learning milestones for your sessions." : `Track objectives and specific learning tasks assigned to ${studentName}.`}
                    </p>
                  </div>
                  {role !== "learner" && (
                    <button 
                      onClick={() => setIsAddObjectiveOpen(true)}
                      className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Target
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {objectives.map((obj) => (
                    <div 
                      key={obj.id} 
                      onClick={() => toggleObjective(obj.id)}
                      className={`p-3 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        obj.completed 
                          ? "bg-slate-50/50 border-slate-200 text-slate-400 line-through" 
                          : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          obj.completed 
                            ? "bg-indigo-600 border-indigo-600 text-white" 
                            : "border-slate-300 bg-white"
                        }`}>
                          {obj.completed && <span className="text-[9px] font-black">✓</span>}
                        </div>
                        <span className="text-xs font-semibold">{obj.text}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase shrink-0 text-slate-400">
                        {obj.completed ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private Custom Homework Block */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Coaching Tasks & Homework</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5 font-bold">
                      {role === "learner" ? "View assigned tasks and submit your homework uploads." : "Manage unique files, assign study checkpoints, and grade submissions."}
                    </p>
                  </div>
                  {role !== "learner" && (
                    <button 
                      onClick={() => setIsAddHomeworkOpen(true)}
                      className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" /> Assign Task
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {homeworks.map((hw) => (
                    <div key={hw.id} className="p-4 border border-slate-250/70 rounded-2xl bg-slate-50/30 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5 pb-3 border-b border-slate-100">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-black text-slate-855 flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-indigo-500" />
                            {hw.title}
                          </h4>
                          <p className="text-xs text-slate-550 font-semibold">{hw.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] text-slate-400 font-bold block uppercase">Due Target</span>
                          <span className="text-[10px] text-slate-600 font-black">{hw.dueDate}</span>
                        </div>
                      </div>

                      {/* Submissions Section */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            {role === "learner" ? "My Submission" : "Submissions uploaded"}
                          </span>
                          {role !== "learner" && (
                            <button 
                              onClick={() => simulateStudentHomework(hw.id)}
                              className="text-[9px] font-black bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 py-1 rounded border border-indigo-100 flex items-center gap-1 transition-colors"
                            >
                              <PlusCircle className="h-2.5 w-2.5" /> Simulate Homework Submission
                            </button>
                          )}
                        </div>

                        {hw.submissions.length > 0 ? (
                          <div className="space-y-3">
                            {hw.submissions.map((sub) => (
                              <div key={sub.id} className="p-3 bg-white border border-slate-150 rounded-xl space-y-3 shadow-xs">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-650">
                                  <span className="text-slate-900 font-black flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    {role === "learner" ? "You (Learner)" : `Submitted by ${studentName}`}
                                  </span>
                                  <span className="text-slate-450 text-[10px]">{sub.submittedAt}</span>
                                </div>
                                
                                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="p-1.5 bg-red-50 text-red-650 rounded text-xs font-bold shrink-0">📄</span>
                                    <div className="min-w-0">
                                      <div className="font-extrabold text-slate-800 text-[11px] truncate">{sub.fileName}</div>
                                      <div className="text-[9px] text-slate-400 font-semibold">{sub.fileSize}</div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => triggerToast(`Downloading homework file: ${sub.fileName}...`)}
                                    className="p-1.5 text-slate-450 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Download homework submission"
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>

                                {sub.studentComment && (
                                  <p className="text-xs italic text-slate-550 pl-2.5 border-l-2 border-slate-200 bg-slate-50/20 py-1">
                                    "{sub.studentComment}"
                                  </p>
                                )}

                                {/* Grading/Feedback Notes */}
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
                                        placeholder="Leave study notes, corrections, or feedback..."
                                        value={sub.feedback}
                                        onChange={(e) => handleFeedbackSubmit(hw.id, sub.id, e.target.value)}
                                        className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                      />
                                      <button 
                                        onClick={() => triggerToast(`Grading and notes sent to ${studentName}!`)}
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
                                  id={`file-upload-${hw.id}`} 
                                  className="hidden" 
                                  onChange={() => {
                                    const newSub: StudentSubmission = {
                                      id: `sub-${Date.now()}`,
                                      fileName: "homework_solutions.pdf",
                                      fileSize: "1.5 MB",
                                      submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
                                      studentComment: "Attached my solved sheet for tutor review.",
                                      feedback: ""
                                    };
                                    setHomeworks(prev => prev.map(h => h.id === hw.id ? { ...h, submissions: [...h.submissions, newSub] } : h));
                                    triggerToast("Homework successfully submitted!");
                                  }}
                                />
                                <button 
                                  onClick={() => document.getElementById(`file-upload-${hw.id}`)?.click()} 
                                  className="w-full bg-indigo-650 hover:bg-indigo-600 text-white font-black text-xs py-2 rounded-xl transition-colors text-center shadow-xs"
                                >
                                  Choose File & Submit
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-white border border-dashed border-slate-200 rounded-xl text-center">
                              <p className="text-xs text-slate-400 italic">No homework submitted yet.</p>
                            </div>
                          )
                        )}
                      </div>  </div>
                  ))}
                </div>
              </div>

                        {/* Right Column (Student & Parent DMs Hub) - Takes 1 col */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* DM Channels Hub */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-[550px] overflow-hidden">
                
                {/* DM Tab Selection / Learner Chat Header */}
                {role === "learner" ? (
                  <div className="p-4 border-b border-slate-150 bg-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-700 text-xs">
                      AS
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">Dr. Albert Sibanda</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Your Calculus Tutor</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex border-b border-slate-150 bg-slate-50/50">
                    <button 
                      onClick={() => setChatTab("student")}
                      className={`flex-1 py-3 text-center text-xs font-black border-r border-slate-150 transition-all flex items-center justify-center gap-1.5 ${
                        chatTab === "student" 
                          ? "bg-white text-indigo-600 border-b-2 border-b-indigo-650" 
                          : "text-slate-500 hover:text-slate-850"
                      }`}
                    >
                      <User className="h-3.5 w-3.5" />
                      Student ({studentName})
                    </button>
                    <button 
                      onClick={() => setChatTab("parent")}
                      className={`flex-1 py-3 text-center text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        chatTab === "parent" 
                          ? "bg-white text-indigo-600 border-b-2 border-b-indigo-650" 
                          : "text-slate-500 hover:text-slate-850"
                      }`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      Parent ({parentName})
                    </button>
                  </div>
                )}

                {/* DM Info Banner */}
                <div className="bg-indigo-50/30 border-b border-indigo-100 p-2.5 px-4 flex items-center justify-between text-[10px] text-indigo-850 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Direct Messaging is encrypted & verified</span>
                  </div>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>

                {/* DM Message stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((msg) => {
                      const isOutgoing = role === "learner" ? msg.sender === "student" : msg.sender === "teacher";
                      const displaySenderName = msg.sender === "student" 
                        ? (role === "learner" ? "You (Learner)" : studentName || "Student")
                        : (msg.sender === "teacher" ? (role === "learner" ? "Tutor (Dr. Albert Sibanda)" : "You (Tutor)") : msg.senderName);
                      return (
                        <div 
                          key={msg.id} 
                          className={`flex flex-col max-w-[85%] ${
                            isOutgoing ? "ml-auto items-end" : "mr-auto items-start"
                          }`}
                        >
                          <span className="text-[9px] font-bold text-slate-450 mb-0.5 px-1">{displaySenderName}</span>
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
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center text-center p-4">
                      <p className="text-xs text-slate-400 italic">No chat messages yet in this channel.</p>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* DM Message input form */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-150 bg-white flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => triggerToast("Attaching coaching guide reference...")}
                    className="p-1.5 text-slate-450 hover:text-slate-655 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                    title="Attach reference"
                  >
                    <Paperclip className="h-4.5 w-4.5" />
                  </button>
                  <input 
                    type="text" 
                    placeholder={role === "learner" ? "Message Tutor (Dr. Albert Sibanda)..." : `Message ${chatTab === "student" ? studentName : parentName}...`}
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

              {/* Quick parent details / Tutor Profile */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {role === "learner" ? "Tutor Profile" : "Roster Profile"}
                </h4>
                {role === "learner" ? (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-slate-100 font-bold flex items-center justify-center text-slate-700">
                        AS
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-850">Dr. Albert Sibanda</div>
                        <div className="text-[10px] text-slate-400 font-semibold">Tutor (Mathematics & Calculus)</div>
                      </div>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-450 font-bold">Affiliation</span>
                      <span className="font-extrabold text-slate-800">Syllabus CIE / Matric</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-450 font-bold">Session Mode</span>
                      <span className="font-extrabold text-indigo-650 font-black">1-on-1 Private Coaching</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-450 font-bold">Linked Student</span>
                      <span className="font-extrabold text-slate-800">{studentName}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-450 font-bold">Linked Parent</span>
                      <span className="font-extrabold text-slate-800">{parentName}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-450 font-bold">Notification Method</span>
                      <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        WhatsApp active
                      </span>
                    </div>
                  </div>
                )}
              </div>  </div>

            </div>
          </>
        ) : (
          /* Available Slot State - Renders full placeholder alert and booking simulator */
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200/85 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-md space-y-6">
              <div className="mx-auto w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-500 text-2xl font-black">
                📅
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">Waiting for Learner Bookings</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  This 1-on-1 private time block is currently vacant and published on the discovery marketplace. Tutors can review homework, build study plans, and chat once a learner secures the block.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl inline-flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Weekly Time Slot Details</span>
                <span className="text-sm font-black text-slate-850">{slot.day}s at {slot.time}</span>
                <span className="text-xs font-extrabold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-lg border border-indigo-100 mt-1.5">{slot.subject}</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link 
                  href="/dashboard" 
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600"
                >
                  Return to Dashboard
                </Link>
                <button 
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="h-4 w-4" /> Simulate Booking Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODALS */}

      {/* Simulate Student Booking Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              Simulate Student Booking
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-normal">
              Directly simulate a student purchase. This updates the slot status to "Booked" and mounts the active personalized study guide panel.
            </p>
            
            <form onSubmit={handleSimulateBooking} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Select Student to Book</label>
                <select 
                  value={simulatedStudentName}
                  onChange={(e) => {
                    const name = e.target.value;
                    setSimulatedStudentName(name);
                    if (name === "Liam Mpofu") setSimulatedParentName("Thabo Mpofu");
                    else if (name === "Chipo Ndlovu") setSimulatedParentName("Nyasha Ndlovu");
                    else if (name === "Tinashe Sibanda") setSimulatedParentName("George Sibanda");
                  }}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Liam Mpofu">Liam Mpofu ( Cambridge CIE )</option>
                  <option value="Chipo Ndlovu">Chipo Ndlovu ( ZIMSEC O-Level )</option>
                  <option value="Tinashe Sibanda">Tinashe Sibanda ( IEB Matric )</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Linked Parent Guardian</label>
                <input 
                  type="text" 
                  value={simulatedParentName}
                  disabled
                  className="w-full border border-slate-150 rounded-xl p-2.5 bg-slate-50 text-slate-500 font-bold focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-emerald-650 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Study Objective Modal */}
      {isAddObjectiveOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
              <PlusCircle className="h-5 w-5 text-indigo-600" />
              Add Study Objective
            </h3>
            
            <form onSubmit={handleAddObjective} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Study Objective / Goal description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Master implicit differentiation using calculus equations" 
                  value={newObjectiveText}
                  onChange={(e) => setNewObjectiveText(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddObjectiveOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold rounded-xl shadow-sm"
                >
                  Add Objective
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Homework Modal */}
      {isAddHomeworkOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
              <FileUp className="h-5 w-5 text-indigo-600" />
              Assign Coaching Homework
            </h3>
            
            <form onSubmit={handleAddHomework} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Homework Assignment Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Differentiation Section B Past Exam sheet" 
                  value={newHomeworkTitle}
                  onChange={(e) => setNewHomeworkTitle(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Instructions & Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Provide instructions on which textbooks chapters, questions, and workings are needed..." 
                  value={newHomeworkDesc}
                  onChange={(e) => setNewHomeworkDesc(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Due Date Target</label>
                <input 
                  type="text" 
                  placeholder="e.g. Next Tuesday, 12:00 CAT" 
                  value={newHomeworkDue}
                  onChange={(e) => setNewHomeworkDue(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddHomeworkOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold rounded-xl shadow-sm"
                >
                  Assign Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
