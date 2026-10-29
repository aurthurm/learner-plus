"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Download,
  Star,
  DollarSign,
  MessageSquare,
  Send,
  Sparkles,
  Paperclip,
  CheckCircle,
  FileText,
  User,
  Users,
  ArrowLeft,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { MaterialAttachment } from "@leaner/types";

interface Review {
  id: string;
  reviewerName: string;
  reviewerRole: "Student" | "Teacher" | "Parent";
  rating: number;
  comment: string;
  date: string;
  reply: string;
}

interface Buyer {
  id: string;
  name: string;
  role: string;
  purchaseDate: string;
  avatar: string;
  unread: boolean;
}

interface ChatMessage {
  id: string;
  buyerId: string;
  sender: "teacher" | "buyer";
  senderName: string;
  text: string;
  time: string;
}

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const resourceId = params.id as string;

  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Active DM States
  const [activeBuyerId, setActiveBuyerId] = useState<string>("buyer-1");
  const [chatText, setChatText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Review Reply Form States
  const [replyInputs, setReplyInputs] = useState<{ [reviewId: string]: string }>({});

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    if (role === "learner") {
      setActiveBuyerId("buyer-1");
    }
  }, [role]);

  // Dynamic reviews (state-driven)
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev-1",
      reviewerName: "Rudo Chipo",
      reviewerRole: "Student",
      rating: 5,
      comment: "This past paper chemistry pack is absolutely brilliant. The marking scheme breakdowns make it so easy to see where I lost marks.",
      date: "2026-05-18",
      reply: "Thank you Rudo! I am glad it is helping you pinpoint those small exam mistakes."
    },
    {
      id: "rev-2",
      reviewerName: "Nyasha Jiri",
      reviewerRole: "Parent",
      rating: 4,
      comment: "Very comprehensive resources. My child is using them daily. Is there a similar package for chemistry practicals?",
      date: "2026-05-20",
      reply: ""
    },
    {
      id: "rev-3",
      reviewerName: "Tinashe Shumba",
      reviewerRole: "Teacher",
      rating: 5,
      comment: "Excellent formatting! Saved me hours of lesson prep. Using these slides for my revision streams tomorrow.",
      date: "2026-05-21",
      reply: ""
    }
  ]);

  // Buyer accounts list
  const [buyers] = useState<Buyer[]>([
    { id: "buyer-1", name: "Liam Mpofu", role: "Student", purchaseDate: "2026-05-19", avatar: "👨‍🎓", unread: true },
    { id: "buyer-2", name: "Amina Jiri", role: "Student", purchaseDate: "2026-05-18", avatar: "👩‍🎓", unread: false },
    { id: "buyer-3", name: "Thabo Mpofu", role: "Parent", purchaseDate: "2026-05-20", avatar: "🧔", unread: false },
    { id: "buyer-4", name: "Rudo Chipo", role: "Student", purchaseDate: "2026-05-17", avatar: "👩‍🎓", unread: false }
  ]);

  // Chat message flows per buyer
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    // Liam
    { id: "c-1", buyerId: "buyer-1", sender: "buyer", senderName: "Liam Mpofu", text: "Hi tutor, for the Cambridge chemistry worksheets, is question 4 of page 2 correct? I get a different atomic mass product.", time: "19:15" },
    { id: "c-2", buyerId: "buyer-1", sender: "teacher", senderName: "You (Tutor)", text: "Hi Liam, let me double check. Yes, that is a common question. Remember to multiply by the coefficient in front of the reactant in the balanced chemical equation first.", time: "19:25" },
    { id: "c-3", buyerId: "buyer-1", sender: "buyer", senderName: "Liam Mpofu", text: "Oh! I completely forgot to balance the equations first. Got it now, thank you so much!", time: "19:30" },
    // Amina
    { id: "c-4", buyerId: "buyer-2", sender: "buyer", senderName: "Amina Jiri", text: "Hi tutor! Can I print these notes for my school study group? Or is it digital download only?", time: "10:00" },
    { id: "c-5", buyerId: "buyer-2", sender: "teacher", senderName: "You (Tutor)", text: "Hi Amina. Yes, absolutely. You are free to print physical copies for your personal study and study groups.", time: "10:15" },
    // Thabo
    { id: "c-6", buyerId: "buyer-3", sender: "buyer", senderName: "Thabo Mpofu", text: "Hello teacher. I purchased the mechanics bundle for my child Liam. Do you also offer weekly live review cohorts for Form 5 calculus?", time: "14:10" },
    { id: "c-7", buyerId: "buyer-3", sender: "teacher", senderName: "You (Tutor)", text: "Hello Thabo. Yes! I run an active O-Level math revision cohort every Saturday morning. You can book him on the main discovery page.", time: "14:30" }
  ]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, activeBuyerId]);

  // Trigger toast
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedResources = localStorage.getItem("leaner_uploadedResources");
      if (savedResources) {
        try {
          const list = JSON.parse(savedResources);
          const found = list.find((r: any) => r.id === resourceId);
          if (found) {
            setResource(found);
          } else {
            // Fallback mock
            setResource({
              id: resourceId,
              title: "Mechanics Form 5 Notes - Full Syllabus",
              curriculum: "ZIMSEC",
              audience: "Students",
              type: "PDF Notes",
              price: 4.99,
              downloads: 84,
              revenue: 419.16,
              publishStatus: "published",
              description: "Comprehensive notes for Form 5 Mechanics covering Kinematics, Dynamics, and Newton's Laws. Includes solved examples matching ZIMSEC standard questions.",
              miniDescription: "Form 5 Mechanics notes & solved exercises.",
              attachments: [
                { id: "att-r1-1", title: "Kinematics Study Notes", fileName: "kinematics_notes.pdf", fileSize: "1.8 MB", order: 1 },
                { id: "att-r1-2", title: "Dynamics Practice sheet", fileName: "dynamics_sheet.docx", fileSize: "2.1 MB", order: 2 }
              ]
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    }
  }, [resourceId]);

  const activeBuyer = buyers.find(b => b.id === activeBuyerId);
  const filteredChat = chatMessages.filter(m => m.buyerId === activeBuyerId);

  // Send message to buyer DM
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    const myMsg: ChatMessage = {
      id: `c-msg-${Date.now()}`,
      buyerId: role === "learner" ? "buyer-1" : activeBuyerId,
      sender: role === "learner" ? "buyer" : "teacher",
      senderName: role === "learner" ? "You (Learner)" : "You (Tutor)",
      text: chatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, myMsg]);
    setChatText("");

    // Simulate buyer/teacher auto reply after 1.5s
    setTimeout(() => {
      let replyText = "";
      let senderType: "teacher" | "buyer" = "buyer";
      let nameLabel = activeBuyer?.name || "Buyer";

      if (role === "learner") {
        const teacherReplies = [
          "Hi Liam, thank you! I hope this past paper pack helps. Let me know if you run into any other stoichiometry questions.",
          "Understood! Balancing equations is always the trickiest first step.",
          "Feel free to print them out for your personal notes as well.",
          "Yes, I do have chemistry practical sheets coming next week!"
        ];
        replyText = teacherReplies[Math.floor(Math.random() * teacherReplies.length)];
        senderType = "teacher";
        nameLabel = "Dr. Albert Sibanda";
      } else {
        const buyerReplies = [
          "Thanks for getting back to me, that makes complete sense!",
          "Great, I will review the file pack and let you know if I have any further questions.",
          "Understood. Thanks for clarify this question.",
          "Got it, appreciate the speedy response!",
          "Thanks teacher! Excellent support service."
        ];
        replyText = buyerReplies[Math.floor(Math.random() * buyerReplies.length)];
        senderType = "buyer";
      }

      const botMsg: ChatMessage = {
        id: `c-reply-${Date.now()}`,
        buyerId: role === "learner" ? "buyer-1" : activeBuyerId,
        sender: senderType,
        senderName: nameLabel,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      reviewerName: "Liam Mpofu",
      reviewerRole: "Student",
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
      reply: ""
    };

    setReviews(prev => [newRev, ...prev]);
    setNewComment("");
    setNewRating(5);
    triggerToast("Thank you for your review! It is now posted to the resource wall.");
  };

  // Submit Review Reply
  const handleAddReviewReply = (reviewId: string) => {
    const replyText = replyInputs[reviewId];
    if (!replyText || !replyText.trim()) return;

    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, reply: replyText.trim() } : r))
    );

    // Clear input
    setReplyInputs(prev => ({
      ...prev,
      [reviewId]: ""
    }));

    triggerToast("Reply posted successfully to review wall!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-500">Loading resource details...</span>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3 animate-bounce" />
        <h3 className="text-sm font-black text-slate-800">Resource Package Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">This digital resource package does not exist or has been deleted.</p>
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
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black border border-indigo-150">{resource.curriculum}</span>
              <span className="px-2 py-0.5 bg-slate-50 text-slate-650 rounded-lg text-[9px] font-black border border-slate-200">{resource.type}</span>
              <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-lg text-[9px] font-black border border-cyan-200">Audience: {resource.audience}</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-black border border-emerald-250 uppercase">Published</span>
            </div>
            
            <h1 className="text-lg font-black text-slate-900 mt-1">{resource.title}</h1>
            <p className="text-xs text-slate-500 font-semibold">{resource.miniDescription}</p>
          </div>

          {role === "learner" ? (
            <div className="flex flex-wrap items-center gap-6 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-center sm:text-left">
                <span className="text-[9px] text-slate-400 font-black block uppercase">Access Status</span>
                <span className="text-xs font-black text-emerald-600 uppercase flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Unlocked & Purchased
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="text-center sm:text-left">
                <span className="text-[9px] text-slate-400 font-black block uppercase">Resource Format</span>
                <span className="text-xs font-black text-slate-800">{resource.type}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-6 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-center sm:text-right">
                <span className="text-[9px] text-slate-400 font-black block uppercase">Download Price</span>
                <span className="text-sm font-black text-slate-900">${resource.price?.toFixed(2)} USD</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="text-center sm:text-right">
                <span className="text-[9px] text-slate-400 font-black block uppercase">Total Downloads</span>
                <span className="text-sm font-black text-slate-800 flex items-center gap-1">
                  <Download className="h-3.5 w-3.5 text-indigo-500" />
                  {resource.downloads}
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="text-center sm:text-right">
                <span className="text-[9px] text-slate-400 font-black block uppercase">Gross Earnings</span>
                <span className="text-sm font-black text-emerald-600 flex items-center">
                  <DollarSign className="h-3.5 w-3.5" />
                  {resource.revenue?.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Contents & Reviews) - Takes 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Detailed Outline Description */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              Resource Description
            </h3>
            <p className="text-xs text-slate-650 leading-relaxed bg-slate-50/50 p-3.5 border border-slate-100 rounded-xl whitespace-pre-wrap">{resource.description}</p>
          </div>

          {/* Bundle Attachment files list */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Bundle Package Files</h3>
              <p className="text-[10px] text-slate-450 mt-0.5 font-bold">These files are compiled and instantly unlocked for students upon checkout.</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {resource.attachments && resource.attachments.length > 0 ? (
                resource.attachments.map((att: MaterialAttachment, idx: number) => (
                  <div key={att.id || idx} className="p-3 border border-slate-200/80 rounded-xl flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition-colors text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold shrink-0">📄</span>
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-850 truncate">{att.title}</div>
                        <div className="text-[10px] text-slate-450 font-bold">{att.fileName} ({att.fileSize})</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => triggerToast(`Simulating download of ${att.fileName}...`)}
                      className="px-3 py-1.5 bg-slate-150 hover:bg-slate-200 text-slate-700 hover:text-slate-855 text-[10px] font-black rounded-lg transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Download className="h-3 w-3" /> Download
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center">
                  <p className="text-xs text-slate-400 italic">No files attached to this resource.</p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Review Wall */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Reviews & Feedback Wall</h3>
              <p className="text-[10px] text-slate-450 mt-0.5 font-bold">
                {role === "learner" ? "Read reviews and feedback left by other students." : "Monitor comments and replies from learners who downloaded the package."}
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/30 space-y-3.5">
                  
                  {/* Rating Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-black text-xs text-slate-900">{rev.reviewerName}</span>
                        <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 font-bold">{rev.reviewerRole}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-655 leading-relaxed font-semibold">
                    "{rev.comment}"
                  </p>

                  {/* Reply Block */}
                  {rev.reply ? (
                    <div className="p-3 bg-indigo-50/40 border border-indigo-100/60 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-1 text-[10px] font-black text-indigo-700">
                        <span>💬 Tutor replied:</span>
                      </div>
                      <p className="text-xs text-slate-700 font-semibold leading-normal">
                        {rev.reply}
                      </p>
                    </div>
                  ) : (
                    /* Inline Reply Form */
                    role !== "learner" && (
                      <div className="flex items-center gap-2 pt-1.5 border-t border-slate-100">
                        <input 
                          type="text" 
                          placeholder="Reply to this review..."
                          value={replyInputs[rev.id] || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setReplyInputs(prev => ({ ...prev, [rev.id]: val }));
                          }}
                          className="flex-1 border border-slate-250/70 rounded-xl px-3 py-1.5 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <button 
                          onClick={() => handleAddReviewReply(rev.id)}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    )
                  )}

                </div>
              ))}
            </div>

            {role === "learner" && (
              <form onSubmit={handleAddReview} className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase">Write a Review</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-450">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewRating(i + 1)}
                        className="text-slate-300 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            i < newRating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this study resource..."
                    required
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>          </div>
         {/* Right Column (Buyer DMs Hub) - Takes 1 col */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* DM Hub Wrapper */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-[550px] overflow-hidden">
            
            {/* DM Header */}
            <div className="p-4 border-b border-slate-150 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-indigo-500" />
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    {role === "learner" ? "Chat with Tutor/Seller" : "Buyer DMs Hub"}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-bold">
                    {role === "learner" ? "Ask questions about this resource package" : "One-on-one DMs with package buyers"}
                  </p>
                </div>
              </div>
              <span className="text-[9px] bg-indigo-50 text-indigo-700 font-black rounded-lg px-2 py-0.5 border border-indigo-150 uppercase">Live Chat</span>
            </div>

            {/* Split layout: Buyers list vs conversation thread */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Buyers Sidebar list (narrow) */}
              {role !== "learner" && (
                <div className="w-1/3 border-r border-slate-150 flex flex-col overflow-y-auto bg-slate-50/20">
                  {buyers.map((b) => (
                    <button 
                      key={b.id} 
                      onClick={() => setActiveBuyerId(b.id)}
                      className={`p-3 text-left border-b border-slate-150 flex flex-col items-center sm:items-start gap-1 transition-all ${
                        activeBuyerId === b.id 
                          ? "bg-white border-l-4 border-l-indigo-650" 
                          : "hover:bg-slate-100/50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{b.avatar}</span>
                        <span className={`text-[10px] font-black truncate hidden sm:block ${
                          b.unread ? "text-indigo-650 font-black" : "text-slate-800"
                        }`}>{b.name.split(" ")[0]}</span>
                      </div>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wide hidden sm:block">{b.role}</span>
                      {b.unread && <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full sm:absolute sm:top-3 sm:right-3"></span>}
                    </button>
                  ))}
                </div>
              )}

              {/* DM Active Conversation Area */}
              <div className={`${role === "learner" ? "w-full" : "w-2/3"} flex flex-col overflow-hidden bg-white`}>
                
                {activeBuyer ? (
                  <>
                    {/* Buyer Thread Info */}
                    <div className="p-3 bg-slate-50/50 border-b border-slate-150 flex items-center justify-between text-xs">
                      {role === "learner" ? (
                        <div>
                          <span className="font-black text-slate-850 block">Dr. Albert Sibanda</span>
                          <span className="text-[9px] text-slate-400 font-bold block">Tutor & Publisher</span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-black text-slate-855 block">{activeBuyer.name}</span>
                          <span className="text-[9px] text-slate-400 font-bold block">Purchased: {activeBuyer.purchaseDate}</span>
                        </div>
                      )}
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-extrabold rounded-md uppercase tracking-wider">
                        {role === "learner" ? "Seller" : activeBuyer.role}
                      </span>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/30">
                      {filteredChat.map((msg) => {
                        const isOutgoing = role === "learner" ? msg.sender === "buyer" : msg.sender === "teacher";
                        const displaySenderName = msg.sender === "buyer" 
                          ? (role === "learner" ? "You (Learner)" : msg.senderName)
                          : (role === "learner" ? "Dr. Albert Sibanda (Tutor)" : "You (Tutor)");
                        return (
                          <div 
                            key={msg.id} 
                            className={`flex flex-col max-w-[90%] ${
                              isOutgoing ? "ml-auto items-end" : "mr-auto items-start"
                            }`}
                          >
                            <span className="text-[9px] font-bold text-slate-450 mb-0.5 px-1">{displaySenderName}</span>
                            <div 
                              className={`p-2.5 rounded-2xl text-[11px] font-semibold leading-relaxed shadow-xs ${
                                isOutgoing 
                                  ? "bg-slate-900 text-white rounded-tr-none" 
                                  : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                              }`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[8px] text-slate-400 font-semibold mt-0.5 px-0.5">{msg.time}</span>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Send Input */}
                    <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-150 bg-white flex items-center gap-1.5">
                      <input 
                        type="text" 
                        placeholder={role === "learner" ? "Type your message to tutor/seller..." : `Message ${activeBuyer.name.split(" ")[0]}...`}
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button 
                        type="submit"
                        className="p-2 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl shadow-xs transition-colors shrink-0"
                      >
                        <Send className="h-3 w-3" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center p-4 text-center">
                    <p className="text-xs text-slate-450 italic">Select a Support Chat thread.</p>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* DM Support Alert Box */}
          {role === "learner" ? (
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-2 text-indigo-950">
              <h4 className="text-xs font-black uppercase flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-indigo-500" />
                Resource Q&A Support
              </h4>
              <p className="text-[10px] leading-relaxed text-indigo-800 font-bold">
                You have active chat support with the tutor for this resource. Ask questions, clarify topics, or request additional practice problems directly in this channel.
              </p>
            </div>
          ) : (
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 space-y-2 text-rose-950">
              <h4 className="text-xs font-black uppercase flex items-center gap-1">
                <ShieldAlert className="h-4 w-4 text-rose-500" />
                Buyer Support Guidelines
              </h4>
              <p className="text-[10px] leading-relaxed text-rose-800 font-bold">
                Direct chat support is open to buyers for 14 days after their purchase under the Escrow Safety Policy. Ensure you reply to questions promptly to guarantee positive feedback ratings and fast payout clearances.
              </p>
            </div>
          )}
          </div>

        </div>

      </div>
  );
}
