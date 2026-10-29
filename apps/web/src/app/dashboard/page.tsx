"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Award, 
  ArrowRight, 
  Bot, 
  Compass, 
  ShoppingBag, 
  Search, 
  Star, 
  Calendar, 
  Download, 
  MessageSquare, 
  CheckCircle, 
  DollarSign, 
  Sparkles, 
  FileText, 
  User, 
  GraduationCap, 
  Smartphone,
  Plus,
  Users,
  Settings,
  Bell,
  LogOut,
  TrendingUp,
  FileCheck,
  CreditCard,
  Building,
  UploadCloud,
  Check,
  Share2,
  FileDown,
  Clock,
  ArrowUpRight,
  Lock,
  PlusCircle,
  FileSpreadsheet,
  X,
  MapPin,
  Info,
  Scale,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { MaterialAttachment } from "@leaner/types";
import { MaterialAttachmentManager } from "@/components/MaterialAttachmentManager";

type UserRole = "learner" | "parent" | "teacher" | "school";

function DashboardContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("teacher"); // Default to teacher as requested

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Expandable details state for listings
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Active item details being edited in a dialog/modal
  const [editingItem, setEditingItem] = useState<{ type: "cohort" | "slot" | "resource"; id: string; fields: any } | null>(null);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Teacher Creator Studio States
  const [studioTab, setStudioTab] = useState<"cohorts" | "resources" | "roster" | "payouts" | "private">("cohorts");
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isCreateCohortOpen, setIsCreateCohortOpen] = useState(false);
  const [isCreateSlotOpen, setIsCreateSlotOpen] = useState(false);
  const [isCreateResourceOpen, setIsCreateResourceOpen] = useState(false);

  // New Cohort Form States
  const [newCohortTitle, setNewCohortTitle] = useState("");
  const [newCohortSubject, setNewCohortSubject] = useState("Mathematics");
  const [newCohortCurriculum, setNewCohortCurriculum] = useState("ZIMSEC");
  const [newCohortSchedule, setNewCohortSchedule] = useState("Weekly");
  const [newCohortMeets, setNewCohortMeets] = useState("");
  const [newCohortPrice, setNewCohortPrice] = useState("10.00");
  const [newCohortSeats, setNewCohortSeats] = useState("20");
  const [newCohortDescription, setNewCohortDescription] = useState("");
  const [newCohortMiniDescription, setNewCohortMiniDescription] = useState("");
  const [newCohortAttachments, setNewCohortAttachments] = useState<MaterialAttachment[]>([]);
  const [newCohortDeliveryMode, setNewCohortDeliveryMode] = useState<"online" | "offline">("online");
  const [newCohortLocation, setNewCohortLocation] = useState("");
  const [cohortSubmitStatus, setCohortSubmitStatus] = useState<"draft" | "published">("published");

  const [activeCohorts, setActiveCohorts] = useState<any[]>([
    {
      id: "ac-1",
      title: "O-Level Mathematics Revision Cohort",
      subject: "Mathematics",
      curriculum: "ZIMSEC",
      schedule: "Saturdays 10:00 CAT (Weekly)",
      price: 8.00,
      seats: 25,
      registeredCount: 18,
      publishStatus: "published",
      deliveryMode: "online",
      location: "",
      description: "A comprehensive revision cohort focusing on Algebra, Quadratic equations, Geometry, and Probability. Ideal for students preparing for their ZIMSEC O-Level examinations.",
      miniDescription: "ZIMSEC O-Level Math prep & exam review.",
      attachments: [
        { id: "att-m1", title: "Algebra Revision Cheat Sheet", fileName: "algebra_revision_cheat_sheet.pdf", fileSize: "1.2 MB", order: 1 },
        { id: "att-m2", title: "Quadratic Equations Practice Set", fileName: "quadratic_equations_practice_set.pdf", fileSize: "2.4 MB", order: 2 }
      ]
    },
    {
      id: "ac-2",
      title: "A-Level Calculus Advanced Prep",
      subject: "Mathematics",
      curriculum: "Cambridge",
      schedule: "Wednesdays 15:30 CAT (Weekly)",
      price: 15.00,
      seats: 15,
      registeredCount: 11,
      publishStatus: "published",
      deliveryMode: "online",
      location: "",
      description: "Advanced study group covering differential and integral calculus, Taylor series, and complex integration techniques for Cambridge A-Level math stream.",
      miniDescription: "A-Level Calculus theorems & application review.",
      attachments: [
        { id: "att-c1", title: "Integration Formulas Reference Guide", fileName: "integration_formulas_reference_guide.pdf", fileSize: "3.1 MB", order: 1 }
      ]
    }
  ]);

  // Enhanced uploaded resources state
  const [uploadedResources, setUploadedResources] = useState<any[]>([
    { 
      id: "ur-1", 
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
    },
    { 
      id: "ur-2", 
      title: "Cambridge IGCSE chemistry Past papers pack", 
      curriculum: "Cambridge", 
      audience: "Both", 
      type: "Exam Prep Slides", 
      price: 7.99, 
      downloads: 142, 
      revenue: 1134.58,
      publishStatus: "published",
      description: "An organized compilation of Cambridge IGCSE Chemistry past paper exams from 2019 to 2025, complete with structured marking schemes and review slides.",
      miniDescription: "IGCSE Chemistry papers & mark schemes.",
      attachments: [
        { id: "att-r2-1", title: "Past Papers Bundle PDF", fileName: "igcse_chem_papers.pdf", fileSize: "4.5 MB", order: 1 },
        { id: "att-r2-2", title: "Marking Schemes & Answers", fileName: "igcse_chem_answers.pdf", fileSize: "3.2 MB", order: 2 }
      ]
    },
    { 
      id: "ur-3", 
      title: "Form 3 Lesson Plan Schemes of Work (Mathematics)", 
      curriculum: "ZIMSEC", 
      audience: "Teachers", 
      type: "Lesson Plan Template", 
      price: 12.50, 
      downloads: 15, 
      revenue: 187.50,
      publishStatus: "published",
      description: "A complete 3-term lesson layout scheme for O-Level Mathematics Form 3 syllabus teachers, matching the national curriculum standards.",
      miniDescription: "Form 3 Term 1-3 Math lesson plan templates.",
      attachments: [
        { id: "att-r3-1", title: "Form 3 Math Lesson Plan Outline", fileName: "form3_math_scheme.xlsx", fileSize: "1.1 MB", order: 1 }
      ]
    }
  ]);

  // Resource Upload States
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceCurriculum, setResourceCurriculum] = useState("ZIMSEC");
  const [resourcePrice, setResourcePrice] = useState("4.99");
  const [resourceAudience, setResourceAudience] = useState("Students");
  const [resourceType, setResourceType] = useState("PDF Notes");
  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceMiniDescription, setResourceMiniDescription] = useState("");
  const [resourceAttachments, setResourceAttachments] = useState<MaterialAttachment[]>([]);
  const [resourceSubmitStatus, setResourceSubmitStatus] = useState<"draft" | "published">("published");

  const [teacherBalance, setTeacherBalance] = useState(250.00);

  // Payout Console States
  const [payoutMethod, setPayoutMethod] = useState<"ecocash" | "innbucks" | "zipit">("ecocash");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutPhone, setPayoutPhone] = useState("+263 77 481 9054");

  // Ledger / Transaction States
  const [transactions, setTransactions] = useState([
    { id: "tx-1", date: "2026-05-19", type: "Sale: Resource", desc: "Form 3 Lesson Plan Schemes sold to Churchill Teacher", amount: 12.50, status: "Completed" },
    { id: "tx-2", date: "2026-05-18", type: "Sale: Cohort", desc: "Tinashe Sibanda booked O-Level Math cohort", amount: 8.00, status: "Escrow Released" },
    { id: "tx-3", date: "2026-05-17", type: "Payout", desc: "Withdrawal to EcoCash wallet +263 774819054", amount: -50.00, status: "Transferred" }
  ]);

  // Private 1-on-1 Availability States
  const [availDay, setAvailDay] = useState("Monday");
  const [availTime, setAvailTime] = useState("09:00 CAT");
  const [availSubject, setAvailSubject] = useState("Mathematics");
  const [availDescription, setAvailDescription] = useState("");
  const [availMiniDescription, setAvailMiniDescription] = useState("");
  const [availAttachments, setAvailAttachments] = useState<MaterialAttachment[]>([]);
  const [slotSubmitStatus, setSlotSubmitStatus] = useState<"draft" | "published">("published");
  
  const [availSlots, setAvailSlots] = useState<any[]>([
    { 
      id: "av-1", 
      day: "Tuesday", 
      time: "09:00 CAT", 
      subject: "Mathematics", 
      status: "Booked (Tinashe Sibanda)",
      publishStatus: "published",
      description: "One-on-one private calculus review session with Tinashe. Focus will be on derivative applications and graphing curves.",
      miniDescription: "Private Calculus slot - Tinashe.",
      attachments: [
        { id: "att-s1-1", title: "Calculus Worksheet Questions", fileName: "calculus_worksheet.pdf", fileSize: "1.4 MB", order: 1 }
      ]
    },
    { 
      id: "av-2", 
      day: "Wednesday", 
      time: "11:30 CAT", 
      subject: "Chemistry", 
      status: "Available",
      publishStatus: "published",
      description: "Weekly office hour slot for O-Level Chemistry topics. Students can book this slot to clarify mole concept or electrolysis problems.",
      miniDescription: "O-Level Chemistry tutoring slot.",
      attachments: []
    },
    { 
      id: "av-3", 
      day: "Friday", 
      time: "14:30 CAT", 
      subject: "Physics", 
      status: "Booked (Chipo Ndlovu)",
      publishStatus: "published",
      description: "Private coaching for Chipo covering electromagnetism and wave motion concepts for Cambridge physics syllabus.",
      miniDescription: "Physics exam review slot - Chipo.",
      attachments: [
        { id: "att-s3-1", title: "Electromagnetism Formulas Sheet", fileName: "magnetism_formulas.pdf", fileSize: "0.8 MB", order: 1 }
      ]
    },
    { 
      id: "av-4", 
      day: "Saturday", 
      time: "16:00 CAT", 
      subject: "Mathematics", 
      status: "Available",
      publishStatus: "published",
      description: "Weekend math tutoring slot. Open for algebra or basic trigonometry revision questions.",
      miniDescription: "Weekend Math tutoring slot.",
      attachments: []
    }
  ]);

  // Learner Dashboard states
  const [joinedClasses, setJoinedClasses] = useState<string[]>([]);
  const [bookedCohorts, setBookedCohorts] = useState<any[]>([]);
  const [purchasedResources, setPurchasedResources] = useState<any[]>([]);

  // Parent Console state
  const [parentActiveTab, setParentActiveTab] = useState<"chat" | "disputes">("chat");
  const [activeChatTutorId, setActiveChatTutorId] = useState<string>("albert");
  const [chatSearchQuery, setChatSearchQuery] = useState<string>("");
  const [parentNewMessage, setParentNewMessage] = useState<string>("Hello, ");
  const [parentChatThreads, setParentChatThreads] = useState<any>({});
  
  // Disputes Form & List States
  const [disputesList, setDisputesList] = useState<any[]>([]);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string>("");
  
  const [disputeTarget, setDisputeTarget] = useState<string>("Mr. Simba Moyo");
  const [disputeTransaction, setDisputeTransaction] = useState<string>("");
  const [disputeReason, setDisputeReason] = useState<string>("Missed Slot / Absent Tutor");
  const [disputeOutcome, setDisputeOutcome] = useState<string>("Full Refund to Wallet");
  const [disputeAmount, setDisputeAmount] = useState<string>("35.00");
  const [disputeDescription, setDisputeDescription] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Booked Cohorts
      const stored = localStorage.getItem("bookedCohorts");
      if (stored) {
        try {
          setBookedCohorts(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Purchased Resources
      const storedResources = localStorage.getItem("purchasedResources");
      if (storedResources) {
        try {
          const parsed = JSON.parse(storedResources);
          if (parsed && parsed.length > 0) {
            setPurchasedResources(parsed);
          } else {
            const defaults = [
              {
                id: "dr-1",
                title: "ZIMSEC O-Level Mathematics Past papers solutions",
                curriculum: "ZIMSEC",
                type: "PDF Notes",
                attachments: [
                  { id: "att-dr1-1", title: "2024 Math Paper 1 Solutions", fileName: "math_2024_p1_sol.pdf", fileSize: "1.4 MB" },
                  { id: "att-dr1-2", title: "2024 Math Paper 2 Solutions", fileName: "math_2024_p2_sol.pdf", fileSize: "2.1 MB" }
                ]
              },
              {
                id: "dr-2",
                title: "Cambridge A-Level Physics Mechanics formula sheet",
                curriculum: "Cambridge",
                type: "Formula Sheet",
                attachments: [
                  { id: "att-dr2-1", title: "Mechanics Core Formulas", fileName: "physics_mechanics_formulas.pdf", fileSize: "850 KB" }
                ]
              }
            ];
            setPurchasedResources(defaults);
            localStorage.setItem("purchasedResources", JSON.stringify(defaults));
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaults = [
          {
            id: "dr-1",
            title: "ZIMSEC O-Level Mathematics Past papers solutions",
            curriculum: "ZIMSEC",
            type: "PDF Notes",
            attachments: [
              { id: "att-dr1-1", title: "2024 Math Paper 1 Solutions", fileName: "math_2024_p1_sol.pdf", fileSize: "1.4 MB" },
              { id: "att-dr1-2", title: "2024 Math Paper 2 Solutions", fileName: "math_2024_p2_sol.pdf", fileSize: "2.1 MB" }
            ]
          },
          {
            id: "dr-2",
            title: "Cambridge A-Level Physics Mechanics formula sheet",
            curriculum: "Cambridge",
            type: "Formula Sheet",
            attachments: [
              { id: "att-dr2-1", title: "Mechanics Core Formulas", fileName: "physics_mechanics_formulas.pdf", fileSize: "850 KB" }
            ]
          }
        ];
        setPurchasedResources(defaults);
        localStorage.setItem("purchasedResources", JSON.stringify(defaults));
      }

      // 3. Parent Chats
      const storedChats = localStorage.getItem("leaner_parent_chats");
      if (storedChats) {
        try {
          setParentChatThreads(JSON.parse(storedChats));
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaultChats = {
          "albert": [
            { sender: "tutor", text: "Hello Mrs. Chidziva, Tinashe did a wonderful job in math today! He is progressing nicely.", timestamp: "Yesterday, 4:15 PM" },
            { sender: "parent", text: "Thank you Dr. Sibanda. Do you recommend any additional resource material for homework?", timestamp: "Yesterday, 4:30 PM" },
            { sender: "tutor", text: "Yes, I uploaded a mechanics formula sheet that he should go over. It is available in the resource portal.", timestamp: "Yesterday, 4:32 PM" }
          ],
          "simba": [
            { sender: "parent", text: "Hello Mr. Moyo, we are waiting in the Zoom class but you have not joined. Is everything okay?", timestamp: "May 20, 10:15 CAT" },
            { sender: "parent", text: "We waited for 30 minutes. Since you missed the slot, I will have to request a reschedule or refund.", timestamp: "May 20, 10:45 CAT" }
          ],
          "tariro": [
            { sender: "tutor", text: "Hello Mrs. Chidziva, Chipo is doing great in chemistry! Please ensure she submits the assignment by Friday.", timestamp: "May 19, 11:00 AM" },
            { sender: "parent", text: "I will make sure she does, thank you Mrs. Ndlovu!", timestamp: "May 19, 11:30 AM" }
          ]
        };
        setParentChatThreads(defaultChats);
        localStorage.setItem("leaner_parent_chats", JSON.stringify(defaultChats));
      }

      // 4. Parent Disputes
      const storedDisputes = localStorage.getItem("leaner_disputes");
      if (storedDisputes) {
        try {
          const parsed = JSON.parse(storedDisputes);
          setDisputesList(parsed);
          if (parsed.length > 0) {
            setSelectedDisputeId(parsed[0].id);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaultDisputes = [
          {
            id: "disp-1",
            target: "Mr. Simba Moyo",
            transaction: "1-on-1 Calculus Private Tutoring ($35.00)",
            reason: "Missed Slot / Absent Tutor",
            outcome: "Full Refund to Wallet",
            amount: "35.00",
            description: "Tutor missed the scheduled 1-on-1 session on Tuesday. I waited on Zoom for 30 minutes, but the tutor was a no-show and has not responded to my follow-up messages.",
            status: "Escrow Hold Applied",
            date: "2026-05-20",
            timeline: [
              { status: "Dispute Opened", date: "May 20, 2026", description: "Dispute logged by parent. Escrow payout held.", active: true },
              { status: "Tutor Notified", date: "May 20, 2026", description: "Mr. Simba Moyo notified. Requested response within 48 hours.", active: true },
              { status: "Escrow Hold Applied", date: "May 21, 2026", description: "Platform has applied an official hold on this transaction's funds.", active: true },
              { status: "Admin Arbitration", date: "Pending", description: "Waiting for tutor response or 48-hour expiration to process refund.", active: false }
            ]
          }
        ];
        setDisputesList(defaultDisputes);
        setSelectedDisputeId(defaultDisputes[0].id);
        localStorage.setItem("leaner_disputes", JSON.stringify(defaultDisputes));
      }
    }
  }, []);

  const saveParentChats = (updatedChats: any) => {
    setParentChatThreads(updatedChats);
    if (typeof window !== "undefined") {
      localStorage.setItem("leaner_parent_chats", JSON.stringify(updatedChats));
    }
  };

  const saveDisputes = (updatedDisputes: any[]) => {
    setDisputesList(updatedDisputes);
    if (typeof window !== "undefined") {
      localStorage.setItem("leaner_disputes", JSON.stringify(updatedDisputes));
    }
  };

  const handleSendParentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentNewMessage.trim()) return;

    const currentTutorId = activeChatTutorId;
    const userMsg = {
      sender: "parent",
      text: parentNewMessage.trim(),
      timestamp: "Just Now"
    };

    const thread = parentChatThreads[currentTutorId] || [];
    const updatedThread = [...thread, userMsg];
    
    const updatedChats = {
      ...parentChatThreads,
      [currentTutorId]: updatedThread
    };
    
    saveParentChats(updatedChats);
    setParentNewMessage("");

    // Simulate reply
    setTimeout(() => {
      let replyText = "Hello! I am currently teaching a live class, but I will get back to you shortly.";
      if (currentTutorId === "albert") {
        replyText = "Thank you for the update, Mrs. Chidziva. I will check Tinashe's homework tomorrow and let you know.";
      } else if (currentTutorId === "tariro") {
        replyText = "Understood. I will check on Chipo's progress and update the homework sheet shortly.";
      } else if (currentTutorId === "simba") {
        replyText = "I apologize for missing the class. My internet connection was down. Can we reschedule for tomorrow morning?";
      }

      const tutorReply = {
        sender: "tutor",
        text: replyText,
        timestamp: "Just Now"
      };

      const finalThread = [...updatedThread, tutorReply];
      const finalChats = {
        ...updatedChats,
        [currentTutorId]: finalThread
      };
      saveParentChats(finalChats);
    }, 1500);
  };

  const handleCreateDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeAmount.trim() || !disputeDescription.trim()) {
      alert("Please fill in the dispute amount and description.");
      return;
    }

    const newDispute = {
      id: `disp-${Date.now()}`,
      target: disputeTarget,
      transaction: disputeTransaction || "General Platform Tutoring",
      reason: disputeReason,
      amount: parseFloat(disputeAmount).toFixed(2),
      outcome: disputeOutcome,
      description: disputeDescription,
      status: "Dispute Opened",
      date: new Date().toISOString().split("T")[0],
      timeline: [
        { status: "Dispute Opened", date: "Just Now", description: "Dispute logged by parent. Escrow payout held.", active: true },
        { status: "Tutor Notified", date: "Just Now", description: `${disputeTarget} notified. Requested response within 48 hours.`, active: true },
        { status: "Escrow Hold Applied", date: "Pending", description: "Platform has applied an official hold on this transaction's funds.", active: false },
        { status: "Admin Arbitration", date: "Pending", description: "Waiting for tutor response or 48-hour expiration to process refund.", active: false }
      ]
    };

    const updatedList = [newDispute, ...disputesList];
    saveDisputes(updatedList);
    setSelectedDisputeId(newDispute.id);
    setDisputeDescription("");
    alert("Dispute Escalated Successfully! Funds have been placed on escrow hold.");
  };

  const defaultCohorts = [
    {
      id: "dc-1",
      title: "Mathematics: Algebra & Trig Cohort",
      curriculum: "Cambridge",
      tutor: "Dr. Albert Sibanda",
      meets: "Tue & Thu",
      rating: "4.9",
      emoji: "📐",
      colorClass: "bg-orange-100 text-orange-600",
      classType: "cohort"
    },
    {
      id: "dc-2",
      title: "IGCSE Chemistry: Stoichiometry Bootcamp",
      curriculum: "ZIMSEC",
      tutor: "Mrs. Tariro Ndlovu",
      meets: "Meets Friday",
      rating: "5.0",
      emoji: "🧪",
      colorClass: "bg-emerald-100 text-emerald-600",
      classType: "cohort"
    },
    {
      id: "ds-1",
      title: "1-on-1 Calculus Private Tutoring",
      curriculum: "ZIMSEC",
      tutor: "Dr. Albert Sibanda",
      meets: "Tuesday @ 09:00 CAT",
      rating: "5.0",
      emoji: "👨‍🏫",
      colorClass: "bg-purple-100 text-purple-600",
      classType: "1-on-1"
    }
  ];

  const allCohorts = [
    ...defaultCohorts,
    ...bookedCohorts.map((bc, idx) => ({
      id: bc.id || `bc-${idx}`,
      title: bc.topic ? `${bc.subject}: ${bc.topic}` : `${bc.subject} Class`,
      curriculum: bc.curriculum,
      tutor: bc.tutorName,
      meets: bc.date && bc.time ? `${bc.date} @ ${bc.time}` : bc.time || bc.date || "Scheduled",
      rating: bc.tutorRating || "5.0",
      emoji: bc.classType === "1-on-1" ? "👨‍🏫" : "🎓",
      colorClass: bc.classType === "1-on-1" ? "bg-purple-100 text-purple-650" : "bg-indigo-100 text-indigo-600",
      classType: bc.classType || "cohort"
    }))
  ];

  const getChildPurchases = (childName: string) => {
    const childCohorts = [
      ...defaultCohorts.filter(c => {
        if (childName === "Tinashe Mutasa") return c.id === "dc-1" || c.id === "ds-1";
        if (childName === "Chipo Mutasa") return c.id === "dc-2";
        return false;
      }),
      ...bookedCohorts.filter(c => c.childName === childName).map((bc, idx) => ({
        id: bc.id || `bc-${idx}`,
        title: bc.topic ? `${bc.subject}: ${bc.topic}` : `${bc.subject} Class`,
        curriculum: bc.curriculum,
        tutor: bc.tutorName,
        meets: bc.date && bc.time ? `${bc.date} @ ${bc.time}` : bc.time || bc.date || "Scheduled",
        rating: bc.tutorRating || "5.0",
        emoji: bc.classType === "1-on-1" ? "👨‍🏫" : "🎓",
        colorClass: bc.classType === "1-on-1" ? "bg-purple-100 text-purple-650" : "bg-indigo-100 text-indigo-600",
        classType: bc.classType || "cohort"
      }))
    ];

    const childResources = [
      ...purchasedResources.filter(r => {
        if (r.childName === childName) return true;
        if (!r.childName) {
          if (childName === "Tinashe Mutasa") return r.id === "dr-2";
          if (childName === "Chipo Mutasa") return r.id === "dr-1";
        }
        return false;
      })
    ];

    return { cohorts: childCohorts, resources: childResources };
  };

  // Parse initial role from registration query
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam && ["learner", "parent", "teacher", "school"].includes(roleParam)) {
      setRole(roleParam as UserRole);
    }
  }, [searchParams]);

  // Open creation modal automatically if 'create=true' is set in query params
  useEffect(() => {
    if (!pathname) return;
    const createParam = searchParams.get("create");
    if (createParam === "true") {
      if (pathname.endsWith("/cohorts")) {
        setIsCreateCohortOpen(true);
      } else if (pathname.endsWith("/slots")) {
        setIsCreateSlotOpen(true);
      } else if (pathname.endsWith("/resources")) {
        setIsCreateResourceOpen(true);
      }
    }
  }, [searchParams, pathname]);


  // Sync route pathname to active tab/section views
  useEffect(() => {
    if (!pathname) return;

    if (pathname.endsWith("/cohorts")) {
      setStudioTab("cohorts");
      setActiveSection("learner-cohorts");
    } else if (pathname.endsWith("/slots")) {
      setStudioTab("private");
    } else if (pathname.endsWith("/resources")) {
      setStudioTab("resources");
      setActiveSection("learner-library");
    } else if (pathname.endsWith("/roster")) {
      setStudioTab("roster");
    } else if (pathname.endsWith("/payouts")) {
      setStudioTab("payouts");
    } else if (pathname.endsWith("/helper")) {
      setActiveSection("learner-helper");
    } else if (pathname.endsWith("/progress")) {
      setActiveSection("parent-progress");
    } else if (pathname.endsWith("/feedback")) {
      setActiveSection("parent-feedback");
    } else if (pathname.endsWith("/parent-messages")) {
      setActiveSection("parent-messages");
    } else if (pathname.endsWith("/link")) {
      setActiveSection("parent-link");
    } else if (pathname.endsWith("/educators")) {
      setActiveSection("school-educators");
    } else if (pathname.endsWith("/license")) {
      setActiveSection("school-license");
    } else if (pathname.endsWith("/services")) {
      setActiveSection("school-services");
    } else if (pathname === "/dashboard") {
      setActiveSection("overview");
      if (role === "teacher") {
        setStudioTab("cohorts");
      }
    }
  }, [pathname, role]);

  // Sync Creator Studio offerings with localStorage to enable marketplace sharing
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCohorts = localStorage.getItem("leaner_activeCohorts");
      if (savedCohorts) {
        try {
          setActiveCohorts(JSON.parse(savedCohorts));
        } catch (e) {}
      }
      const savedResources = localStorage.getItem("leaner_uploadedResources");
      if (savedResources) {
        try {
          setUploadedResources(JSON.parse(savedResources));
        } catch (e) {}
      }
      const savedSlots = localStorage.getItem("leaner_availSlots");
      if (savedSlots) {
        try {
          setAvailSlots(JSON.parse(savedSlots));
        } catch (e) {}
      }
      setIsDataLoaded(true);
    }
  }, []);

  // Save to localStorage when states change
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("leaner_activeCohorts", JSON.stringify(activeCohorts));
    }
  }, [activeCohorts, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("leaner_uploadedResources", JSON.stringify(uploadedResources));
    }
  }, [uploadedResources, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("leaner_availSlots", JSON.stringify(availSlots));
    }
  }, [availSlots, isDataLoaded]);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleTeacherTabChange = (tab: "cohorts" | "private" | "resources" | "roster" | "payouts") => {
    setStudioTab(tab);
    const element = document.getElementById("creator-studio-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const changeRole = (newRole: UserRole) => {
    setRole(newRole);
    setActiveSection("overview");
    if (newRole === "teacher") {
      setStudioTab("cohorts");
    }
    router.push("/dashboard");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle) return;

    const newRes = {
      id: `ur-${Date.now()}`,
      title: resourceTitle,
      curriculum: resourceCurriculum,
      audience: resourceAudience,
      type: resourceType,
      price: parseFloat(resourcePrice) || 4.99,
      downloads: 0,
      revenue: 0.00,
      publishStatus: resourceSubmitStatus,
      description: resourceDescription.trim() || "No detailed description provided.",
      miniDescription: resourceMiniDescription.trim() || "Class resource download.",
      attachments: resourceAttachments
    };

    setUploadedResources(prev => [newRes, ...prev]);
    
    // Add to transaction ledger
    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "Resource Published",
        desc: `Published "${resourceTitle}" with ${resourceAttachments.length} file bundles (${resourceSubmitStatus})`,
        amount: parseFloat(resourcePrice) || 4.99,
        status: "Active"
      },
      ...prev
    ]);

    setResourceTitle("");
    setResourceDescription("");
    setResourceMiniDescription("");
    setResourceAttachments([]);
    setIsCreateResourceOpen(false);
    triggerToast(`"${newRes.title}" has been saved as ${resourceSubmitStatus === "draft" ? "a draft" : "published to the marketplace"}!`);
  };

  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCohortTitle || !newCohortMeets) return;

    const newCohort = {
      id: `ac-${Date.now()}`,
      title: newCohortTitle,
      subject: newCohortSubject,
      curriculum: newCohortCurriculum,
      schedule: `${newCohortMeets} (${newCohortSchedule})`,
      price: parseFloat(newCohortPrice) || 10.00,
      seats: parseInt(newCohortSeats) || 20,
      registeredCount: 0,
      publishStatus: cohortSubmitStatus,
      deliveryMode: newCohortDeliveryMode,
      location: newCohortDeliveryMode === "offline" ? newCohortLocation : "",
      description: newCohortDescription.trim() || "No syllabus detailed description provided.",
      miniDescription: newCohortMiniDescription.trim() || "Group learning cohort.",
      attachments: newCohortAttachments
    };

    setActiveCohorts(prev => [newCohort, ...prev]);
    
    // Add to transaction ledger
    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "Cohort Created",
        desc: `Pre-scheduled cohort: "${newCohortTitle}" (${cohortSubmitStatus})`,
        amount: parseFloat(newCohortPrice) || 10.00,
        status: "Active"
      },
      ...prev
    ]);

    setNewCohortTitle("");
    setNewCohortMeets("");
    setNewCohortDescription("");
    setNewCohortMiniDescription("");
    setNewCohortAttachments([]);
    setNewCohortDeliveryMode("online");
    setNewCohortLocation("");
    setIsCreateCohortOpen(false);
    triggerToast(`Group cohort "${newCohort.title}" has been saved as ${cohortSubmitStatus === "draft" ? "a draft" : "published and open for registration"}!`);
  };

  const handleEcoCashPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmt = parseFloat(payoutAmount);
    if (!withdrawAmt || withdrawAmt <= 0) {
      triggerToast("Please specify a valid withdrawal amount.");
      return;
    }
    if (withdrawAmt > teacherBalance) {
      triggerToast("Insufficient earnings balance.");
      return;
    }
    
    setTeacherBalance(prev => prev - withdrawAmt);
    
    // Add to transaction ledger
    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "Payout",
        desc: `Withdrawal via ${payoutMethod.toUpperCase()} to ${payoutPhone}`,
        amount: -withdrawAmt,
        status: "Transferred"
      },
      ...prev
    ]);

    setPayoutAmount("");
    triggerToast(`${payoutMethod.toUpperCase()} payout request of $${withdrawAmt.toFixed(2)} USD submitted! Payout will reflect within 5 minutes.`);
  };

  const handleAddAvailSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot = {
      id: `av-${Date.now()}`,
      day: availDay,
      time: availTime,
      subject: availSubject,
      status: "Available",
      publishStatus: slotSubmitStatus,
      description: availDescription.trim() || "Private one-on-one lesson slot.",
      miniDescription: availMiniDescription.trim() || "1-on-1 private lesson.",
      attachments: availAttachments
    };
    setAvailSlots(prev => [...prev, newSlot]);
    
    // Reset availability form fields
    setAvailDescription("");
    setAvailMiniDescription("");
    setAvailAttachments([]);
    setIsCreateSlotOpen(false);
    triggerToast(`1-on-1 slot has been saved as ${slotSubmitStatus === "draft" ? "a draft" : "published and available to book"}!`);
  };

  const handleRemoveAvailSlot = (id: string) => {
    setAvailSlots(prev => prev.filter(slot => slot.id !== id));
    triggerToast("1-on-1 availability slot removed.");
  };

  const handleJoinClass = (className: string) => {
    if (joinedClasses.includes(className)) {
      triggerToast(`Left classroom ${className}`);
      setJoinedClasses(prev => prev.filter(c => c !== className));
    } else {
      setJoinedClasses(prev => [...prev, className]);
      triggerToast(`Connecting to BigBlueButton classroom: "${className}"...`);
    }
  };

  const handleSaveChanges = () => {
    if (!editingItem) return;
    const { type, id, fields } = editingItem;

    if (type === "cohort") {
      setActiveCohorts(prev => prev.map(item => item.id === id ? { ...item, ...fields } : item));
      triggerToast(`Changes saved successfully for cohort "${fields.title}"`);
    } else if (type === "slot") {
      setAvailSlots(prev => prev.map(item => item.id === id ? { ...item, ...fields } : item));
      triggerToast(`Changes saved successfully for 1-on-1 slot`);
    } else if (type === "resource") {
      setUploadedResources(prev => prev.map(item => item.id === id ? { ...item, ...fields } : item));
      triggerToast(`Changes saved successfully for resource "${fields.title}"`);
    }

    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 border border-slate-800 animate-slide-in text-xs font-bold">
          <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dynamic Role Switcher (Tester Utility at the top) */}
      <div className="bg-slate-900 text-slate-300 py-3 px-6 text-xs flex flex-wrap items-center justify-between gap-4 border-b border-slate-950 relative z-40">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-extrabold tracking-wider uppercase text-[10px] text-slate-400">TESTER SIMULATOR:</span>
          <span>Switch roles to view contextual workflows:</span>
        </div>
        <div className="flex gap-2">
          <Button 
            size="xs" 
            variant="outline" 
            onClick={() => changeRole("teacher")}
            className={`text-[10px] font-bold h-7 rounded-lg transition-all ${role === "teacher" ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-800 hover:bg-slate-800"}`}
          >
            👨‍🏫 Teacher (Dr. Sibanda)
          </Button>
          <Button 
            size="xs" 
            variant="outline" 
            onClick={() => changeRole("learner")}
            className={`text-[10px] font-bold h-7 rounded-lg transition-all ${role === "learner" ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-800 hover:bg-slate-800"}`}
          >
            🎓 Learner (Tinashe)
          </Button>
          <Button 
            size="xs" 
            variant="outline" 
            onClick={() => changeRole("parent")}
            className={`text-[10px] font-bold h-7 rounded-lg transition-all ${role === "parent" ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-800 hover:bg-slate-800"}`}
          >
            👪 Parent (Mrs. Chipo)
          </Button>
          <Button 
            size="xs" 
            variant="outline" 
            onClick={() => changeRole("school")}
            className={`text-[10px] font-bold h-7 rounded-lg transition-all ${role === "school" ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-800 hover:bg-slate-800"}`}
          >
            🏫 School Admin (Churchill High)
          </Button>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md h-16 flex items-center justify-between px-6 shrink-0 relative z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              L
            </span>
            <span className="text-base font-black tracking-tight text-slate-900 leading-none">
              Leaner
            </span>
          </Link>
          <Badge className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[9px] hover:bg-indigo-50 font-extrabold rounded-md py-0.5">
            Portal Workspace
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <Bell className="h-4 w-4 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
          </div>

          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 border border-slate-200">
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
                {role === "teacher" && "AS"}
                {role === "learner" && "TM"}
                {role === "parent" && "CC"}
                {role === "school" && "CM"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold leading-none text-slate-900">
                {role === "teacher" && "Dr. Albert Sibanda"}
                {role === "learner" && "Tinashe Mutasa"}
                {role === "parent" && "Mrs. Chipo Chidziva"}
                {role === "school" && "Mr. Churchill Principal"}
              </span>
              <span className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                {role === "teacher" && "Teacher Dashboard"}
                {role === "learner" && "Student Profile"}
                {role === "parent" && "Parent Account"}
                {role === "school" && "Academy Administration"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-200/80 bg-white p-6 flex flex-col justify-between shrink-0 gap-8">
          <div className="space-y-6">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Navigation Workspace
            </div>
            <nav className="space-y-1">
              {role === "teacher" && (
                <>
                  <Link
                    href={`/dashboard?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname === "/dashboard"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Compass className={`h-4 w-4 shrink-0 ${pathname === "/dashboard" ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Workspace Overview</span>
                  </Link>
                  <Link
                    href={`/dashboard/cohorts?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/cohorts")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <GraduationCap className={`h-4 w-4 shrink-0 ${pathname.endsWith("/cohorts") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Group Cohorts</span>
                  </Link>
                  <Link
                    href={`/dashboard/slots?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/slots")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Calendar className={`h-4 w-4 shrink-0 ${pathname.endsWith("/slots") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>1-on-1 Slots</span>
                  </Link>
                  <Link
                    href={`/dashboard/resources?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/resources")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <BookOpen className={`h-4 w-4 shrink-0 ${pathname.endsWith("/resources") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Digital Resources</span>
                  </Link>
                  <Link
                    href={`/dashboard/roster?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/roster")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Users className={`h-4 w-4 shrink-0 ${pathname.endsWith("/roster") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Student Roster</span>
                  </Link>
                  <Link
                    href={`/dashboard/payouts?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/payouts")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <CreditCard className={`h-4 w-4 shrink-0 ${pathname.endsWith("/payouts") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Billing & Payouts</span>
                  </Link>
                </>
              )}

              {role === "learner" && (
                <>
                  <Link
                    href={`/dashboard?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname === "/dashboard"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Compass className={`h-4 w-4 shrink-0 ${pathname === "/dashboard" ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Workspace Overview</span>
                  </Link>
                  <Link
                    href={`/dashboard/cohorts?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/cohorts")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Calendar className={`h-4 w-4 shrink-0 ${pathname.endsWith("/cohorts") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>My Classes</span>
                  </Link>
                  <Link
                    href={`/dashboard/resources?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/resources")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <BookOpen className={`h-4 w-4 shrink-0 ${pathname.endsWith("/resources") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>My Study Library</span>
                  </Link>
                  <Link
                    href={`/dashboard/helper?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/helper")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Bot className={`h-4 w-4 shrink-0 ${pathname.endsWith("/helper") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>AI Homework Helper</span>
                  </Link>
                </>
              )}

              {role === "parent" && (
                <>
                  <Link
                    href={`/dashboard?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname === "/dashboard"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Compass className={`h-4 w-4 shrink-0 ${pathname === "/dashboard" ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Control Center</span>
                  </Link>
                  <Link
                    href={`/dashboard/progress?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/progress")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <GraduationCap className={`h-4 w-4 shrink-0 ${pathname.endsWith("/progress") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Children's Progress</span>
                  </Link>
                  <Link
                    href={`/dashboard/feedback?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/feedback")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <MessageSquare className={`h-4 w-4 shrink-0 ${pathname.endsWith("/feedback") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Feedback Reports</span>
                  </Link>
                  <Link
                    href={`/dashboard/parent-messages?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/parent-messages")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <MessageSquare className={`h-4 w-4 shrink-0 ${pathname.endsWith("/parent-messages") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Tutor Chat & Disputes</span>
                  </Link>
                  <Link
                    href={`/dashboard/link?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/link")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <PlusCircle className={`h-4 w-4 shrink-0 ${pathname.endsWith("/link") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Link Child Profile</span>
                  </Link>
                  <Link
                    href={`/tutors?role=${role}`}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold transition-all"
                  >
                    <ShoppingBag className="h-4 w-4 shrink-0 text-slate-400" />
                    <span>Marketplace Store</span>
                  </Link>
                </>
              )}

              {role === "school" && (
                <>
                  <Link
                    href={`/dashboard?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname === "/dashboard"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Compass className={`h-4 w-4 shrink-0 ${pathname === "/dashboard" ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Management Overview</span>
                  </Link>
                  <Link
                    href={`/dashboard/educators?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/educators")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Building className={`h-4 w-4 shrink-0 ${pathname.endsWith("/educators") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Educator Registry</span>
                  </Link>
                  <Link
                    href={`/dashboard/license?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/license")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <Award className={`h-4 w-4 shrink-0 ${pathname.endsWith("/license") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>License Information</span>
                  </Link>
                  <Link
                    href={`/dashboard/services?role=${role}`}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                      pathname.endsWith("/services")
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100/70 font-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 border border-transparent font-bold"
                    }`}
                  >
                    <CheckCircle className={`h-4 w-4 shrink-0 ${pathname.endsWith("/services") ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>System Status</span>
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">LOCAL WEATHER / TIME</span>
              <span className="text-xs font-black text-slate-800">Harare • 15:45 CAT</span>
            </div>
            <Link href="/" className="flex items-center gap-3 px-3.5 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 md:p-8 space-y-8 overflow-y-auto">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                {role === "teacher" && (
                  <>
                    Educator Workspace Overview
                    <span className="text-indigo-600 font-extrabold ml-1.5 text-lg">
                      {pathname === "/dashboard" && " • Workspace Overview"}
                      {pathname.endsWith("/cohorts") && " • Group Cohorts"}
                      {pathname.endsWith("/slots") && " • 1-on-1 Slots"}
                      {pathname.endsWith("/resources") && " • Digital Resources"}
                      {pathname.endsWith("/roster") && " • Student Roster"}
                      {pathname.endsWith("/payouts") && " • Payouts & Ledger"}
                    </span>
                  </>
                )}
                {role === "learner" && (
                  <>
                    Student Workspace Overview
                    <span className="text-indigo-600 font-extrabold ml-1.5 text-lg">
                      {pathname.endsWith("/cohorts") && " • My Classes"}
                      {pathname.endsWith("/resources") && " • My Study Library"}
                      {pathname.endsWith("/helper") && " • AI Homework Helper"}
                    </span>
                  </>
                )}
                {role === "parent" && (
                  <>
                    Parental Control Center
                    <span className="text-indigo-600 font-extrabold ml-1.5 text-lg">
                      {pathname.endsWith("/progress") && " • Children's Progress"}
                      {pathname.endsWith("/feedback") && " • Feedback Reports"}
                      {pathname.endsWith("/parent-messages") && " • Tutor Chat & Disputes"}
                      {pathname.endsWith("/link") && " • Link Child Profile"}
                    </span>
                  </>
                )}
                {role === "school" && (
                  <>
                    Multi-Tenant School Console
                    <span className="text-indigo-600 font-extrabold ml-1.5 text-lg">
                      {pathname.endsWith("/educators") && " • Educator Registry"}
                      {pathname.endsWith("/license") && " • License Info"}
                      {pathname.endsWith("/services") && " • System Status"}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-slate-500 text-xs font-medium mt-0.5">
                {role === "teacher" && (
                  <>
                    {pathname === "/dashboard" && "A high-level cockpit of your educational workspace, cohorts, available booking slots, files, and payouts."}
                    {pathname.endsWith("/cohorts") && "Manage and schedule live group classes, track student capacity, and launch WebRTC classrooms."}
                    {pathname.endsWith("/slots") && "Configure private tutoring sessions, review student-specific study plans, and link parents."}
                    {pathname.endsWith("/resources") && "Upload worksheets, textbooks, and syllabus revision guides to sell on the marketplace."}
                    {pathname.endsWith("/roster") && "Monitor student lists, link parents via code systems, and view attendance metrics."}
                    {pathname.endsWith("/payouts") && "Withdraw available earnings via EcoCash or ZIPIT and track student marketplace purchases."}
                  </>
                )}
                {role === "learner" && (
                  <>
                    {pathname === "/dashboard" && "Attend virtual cohorts, solve homework questions, and study revision packs."}
                    {pathname.endsWith("/cohorts") && "Attend your booked cohorts or 1-on-1 private sessions, submit assignments, and message tutors."}
                    {pathname.endsWith("/resources") && "Access study notes, downloaded syllabus books, and marketplace revision sheets."}
                    {pathname.endsWith("/helper") && "Ask the AI assistant questions about math, chemistry, physics, and school assignments."}
                  </>
                )}
                {role === "parent" && (
                  <>
                    {pathname === "/dashboard" && "Track grade results, link accounts, and manage EcoCash billing structures."}
                    {pathname.endsWith("/progress") && "Monitor grades, test percentages, and live attendance metrics for linked student profiles."}
                    {pathname.endsWith("/feedback") && "Review direct feedback, grade assessments, and notes left by private tutors."}
                    {pathname.endsWith("/parent-messages") && "Directly chat with your children's educators or raise payment/tutor escrow disputes."}
                    {pathname.endsWith("/link") && "Enter unique student codes to link parent view dashboards with child workspace progress."}
                  </>
                )}
                {role === "school" && (
                  <>
                    {pathname === "/dashboard" && "Oversee Churchill High School teacher uploads, classrooms, and rosters."}
                    {pathname.endsWith("/educators") && "Invite, manage, and audit teacher accounts linked to your academic platform."}
                    {pathname.endsWith("/license") && "View institutional subscription details, seats limit, and billing invoices."}
                    {pathname.endsWith("/services") && "Verify live server uptime, classroom nodes, and EcoCash payment API integrations."}
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white font-extrabold py-1 px-3">
                {role.toUpperCase()}
              </Badge>
            </div>
          </div>
          {/* DYNAMIC CARD GRID BY ROLE */}
          {pathname === "/dashboard" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {role === "teacher" && (
                <>
                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">MONTHLY REVENUE (USD)</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-black text-slate-900">${teacherBalance.toFixed(2)}</span>
                        <span className="text-[10px] text-green-500 font-bold flex items-center">
                          <TrendingUp className="h-3 w-3 mr-0.5" /> +24%
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">ACTIVE COHORTS</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-black text-slate-900">3 Courses</span>
                        <Badge className="bg-indigo-50 border border-indigo-200 text-indigo-600 text-[8px] font-bold">Live</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">STUDENTS ENROLLED</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-black text-slate-900">324 Pupils</span>
                        <span className="text-[10px] text-slate-400 font-bold">12 Schools</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">RESOURCE DOWNLOADS</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-black text-slate-900">226 Files</span>
                        <span className="text-[10px] text-slate-400 font-bold">Rating 4.9⭐</span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {role === "learner" && (
                <>
                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">UPCOMING CLASSES TODAY</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">1 Live Lesson</span>
                      <span className="text-[10px] text-indigo-600 font-bold block mt-1">16:30 CAT: Math Cohort</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">STUDY GUIDES RENTED</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">3 Syllabus PDFs</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Expires in 12 days</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">OCR HELP QUESTIONS</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">14 Solved</span>
                      <span className="text-[10px] text-emerald-600 font-bold block mt-1">Unlimited WhatsApp Ask</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">REVISION HOURS CLOCKED</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">28 Hours</span>
                      <span className="text-[10px] text-amber-500 font-bold block mt-1">⭐ Weekly High</span>
                    </CardContent>
                  </Card>
                </>
              )}

              {role === "parent" && (
                <>
                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">LINKED CHILDREN</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">2 Students</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Tinashe (O-Level) & Chipo (G9)</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-450 uppercase">TOTAL FEES PAID (USD)</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">$84.00</span>
                      <span className="text-[10px] text-slate-400 block mt-1">May invoice paid</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">ACTIVE TUTORS ASSIGNED</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">2 Experts</span>
                      <span className="text-[10px] text-indigo-600 block mt-1">Dr. Sibanda & Mr. Moyo</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">COHORT PROGRESS LOG</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">92% Attendance</span>
                      <span className="text-[10px] text-green-500 font-bold block mt-1">Excellent Status</span>
                    </CardContent>
                  </Card>
                </>
              )}

              {role === "school" && (
                <>
                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">STAFF MEMBERS ONBOARDED</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">12 Teachers</span>
                      <span className="text-[10px] text-indigo-600 font-bold block mt-1">5 Verified Creators</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">ENROLLED STUDENT POOL</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">410 Students</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Multi-tenant isolation active</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">CONCURRENT LECTURES</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">6 Rooms Active</span>
                      <span className="text-[10px] text-emerald-600 block mt-1">BigBlueButton server: Online</span>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase">REVENUE COMMISSION SHARE</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <span className="text-xl font-black text-slate-900">$1,240.00</span>
                      <span className="text-[10px] text-slate-400 block mt-1">School 15% marketplace cut</span>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}


          {/* DYNAMIC PRIMARY INTERFACE AREA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT CONTAINER (8 COLS ON LARGE FOR OVERVIEW, 12 FOR SUB-ROUTES) */}
            <div className={`${pathname === "/dashboard" ? "lg:col-span-8" : "lg:col-span-12"} space-y-8`}>
              
              {/* TEACHER WORKFLOW */}
              {/* TEACHER WORKFLOW */}
              {role === "teacher" && (
                <div id="creator-studio-section" className="space-y-6">
                  {/* Tutor Workspace Overview cockpit */}
                  {pathname === "/dashboard" && (
                    <div className="space-y-6">
                      {/* Welcome Hero Banner */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-955 to-indigo-900 p-6 md:p-8 rounded-3xl text-white shadow-lg border border-slate-800">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="relative z-10 space-y-4">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-wider">
                            <Sparkles className="h-3 w-3 animate-pulse" /> Teacher Economy Platform
                          </div>
                          <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                              Welcome back to your HQ, Dr. Albert Sibanda
                            </h2>
                            <p className="text-xs md:text-sm text-slate-350 max-w-xl font-medium leading-relaxed">
                              Monitor, scale and manage your live cohorts, private coaching sessions, digital syllabi bundles, and billing payments across the continent.
                            </p>
                          </div>
                          <div className="pt-2 flex flex-wrap gap-2.5">
                            <Button 
                              onClick={() => setIsCreateCohortOpen(true)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
                            >
                              <Plus className="h-4 w-4 mr-1.5" /> Pre-schedule Cohort
                            </Button>
                            <Button 
                              onClick={() => setIsCreateSlotOpen(true)}
                              variant="outline"
                              className="border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                            >
                              <Plus className="h-4 w-4 mr-1.5" /> Add Private Slot
                            </Button>
                            <Button 
                              onClick={() => setIsCreateResourceOpen(true)}
                              variant="outline"
                              className="border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                            >
                              <UploadCloud className="h-4 w-4 mr-1.5" /> Publish Resource
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Cockpit Workspace Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 1. Group Cohorts Card */}
                        <Card className="border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650">
                                  <GraduationCap className="h-5 w-5" />
                                </span>
                                <div>
                                  <h3 className="font-black text-sm text-slate-900">Group Cohorts</h3>
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Scheduled Live Classes</span>
                                </div>
                              </div>
                              <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-black">{activeCohorts.length} Active</Badge>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              Run syllabus-focused cohort courses. Pupils can register using EcoCash/InnBucks and attend interactive WebRTC BigBlueButton virtual meets.
                            </p>
                            {/* Mini preview list */}
                            <div className="space-y-2 pt-1">
                              {activeCohorts.slice(0, 2).map((c) => (
                                <div key={c.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100/85 text-[11px] font-bold">
                                  <span className="text-slate-850 truncate max-w-[150px]">{c.emoji} {c.title}</span>
                                  <span className="text-slate-450">{c.registeredCount}/{c.seats} seats</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                            <Link href={`/dashboard/cohorts?role=${role}`} className="text-indigo-650 hover:text-indigo-700 text-xs font-black flex items-center gap-1.5 transition-colors">
                              Open Cohorts Manager <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </Card>

                        {/* 2. 1-on-1 Availability Card */}
                        <Card className="border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650">
                                  <Calendar className="h-5 w-5" />
                                </span>
                                <div>
                                  <h3 className="font-black text-sm text-slate-900">1-on-1 Slots</h3>
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Private availability</span>
                                </div>
                              </div>
                              <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-black">
                                {availSlots.filter(s => s.status.startsWith("Booked")).length}/{availSlots.length} Booked
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              Provide private coaching calendar slots in CAT timezone. Link students and parents, set custom rates, and launch dedicated BBB video calls.
                            </p>
                            {/* Mini preview list */}
                            <div className="space-y-2 pt-1">
                              {availSlots.slice(0, 2).map((s) => (
                                <div key={s.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100/85 text-[11px] font-bold">
                                  <span className="text-slate-850 truncate max-w-[150px]">📅 {s.day} ({s.time})</span>
                                  <span className={s.status.startsWith("Booked") ? "text-emerald-600" : "text-amber-600"}>
                                    {s.status.startsWith("Booked") ? "Booked" : "Vacant"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                            <Link href={`/dashboard/slots?role=${role}`} className="text-indigo-650 hover:text-indigo-700 text-xs font-black flex items-center gap-1.5 transition-colors">
                              Manage Availability <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </Card>

                        {/* 3. Digital Resources Card */}
                        <Card className="border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650">
                                  <BookOpen className="h-5 w-5" />
                                </span>
                                <div>
                                  <h3 className="font-black text-sm text-slate-900">Digital Resources</h3>
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Syllabus Files & bundles</span>
                                </div>
                              </div>
                              <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-black">
                                {uploadedResources.length} Published
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              Sell curriculum revision guides, printables, worksheets, and lecture slides directly to teachers and students.
                            </p>
                            {/* Mini preview list */}
                            <div className="space-y-2 pt-1">
                              {uploadedResources.slice(0, 2).map((r) => (
                                <div key={r.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100/85 text-[11px] font-bold">
                                  <span className="text-slate-850 truncate max-w-[150px]">📁 {r.title}</span>
                                  <span className="text-slate-450">${r.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                            <Link href={`/dashboard/resources?role=${role}`} className="text-indigo-650 hover:text-indigo-700 text-xs font-black flex items-center gap-1.5 transition-colors">
                              Browse Study Library <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </Card>

                        {/* 4. Student Roster Card */}
                        <Card className="border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650">
                                  <Users className="h-5 w-5" />
                                </span>
                                <div>
                                  <h3 className="font-black text-sm text-slate-900">Student Roster</h3>
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pupil directory</span>
                                </div>
                              </div>
                              <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[10px] font-black">35 Pupils</Badge>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              Oversee your active registered student pool. View family guardian linkages, send test progress review notifications, and message them on WhatsApp.
                            </p>
                            <div className="p-3 bg-slate-50 border border-slate-100/80 rounded-xl text-[11px] font-extrabold text-slate-700 flex justify-between items-center">
                              <span>Linked Parents</span>
                              <span className="text-indigo-600">10 Guardians Connected</span>
                            </div>
                          </div>
                          <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                            <Link href={`/dashboard/roster?role=${role}`} className="text-indigo-650 hover:text-indigo-700 text-xs font-black flex items-center gap-1.5 transition-colors">
                              Open Student Directory <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </Card>
                      </div>

                      {/* 5. Escrow Account Summary card */}
                      <Card className="border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="flex items-start gap-4">
                            <span className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                              <CreditCard className="h-6 w-6" />
                            </span>
                            <div className="space-y-1">
                              <h3 className="font-black text-sm text-slate-900">Financial Balance & Payout Hub</h3>
                              <p className="text-xs text-slate-500 font-medium max-w-xl">
                                Withdraw earnings directly to your mobile money wallet (EcoCash or InnBucks) or bank via ZIPIT. Transactions settle instantly after the student dispute clearance period.
                              </p>
                            </div>
                          </div>
                          <div className="flex md:flex-col items-baseline md:items-end justify-between md:justify-center w-full md:w-auto p-4 md:p-0 bg-slate-50 md:bg-transparent rounded-xl shrink-0">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Wallet Balance</span>
                            <span className="text-2xl font-black text-slate-900">${teacherBalance.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-550">
                            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="h-3.5 w-3.5" /> EcoCash Online</span>
                            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="h-3.5 w-3.5" /> InnBucks Online</span>
                          </div>
                          <Link href={`/dashboard/payouts?role=${role}`} className="bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors text-center">
                            Open Payout Console
                          </Link>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* TAB CONTENT: GROUP COHORTS */}
                  {pathname.endsWith("/cohorts") && (() => {
                    const totalCohorts = activeCohorts.length;
                    const totalEnrollments = activeCohorts.reduce((acc, c) => acc + c.registeredCount, 0);
                    const totalSeats = activeCohorts.reduce((acc, c) => acc + c.seats, 0);
                    const seatUtilization = totalSeats > 0 ? Math.round((totalEnrollments / totalSeats) * 100) : 0;
                    const projectedRev = activeCohorts.reduce((acc, c) => acc + (c.price * c.registeredCount), 0);

                    return (
                      <div className="space-y-6">
                        {/* Analytics Stats Bar */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Active Cohorts</span>
                              <BookOpen className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{totalCohorts}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Syllabus-targeted classes</span>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Enrollments</span>
                              <Users className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{totalEnrollments}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Students registered</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Seat Utilization</span>
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{seatUtilization}%</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Overall fill rate</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Projected Revenue</span>
                              <DollarSign className="h-4 w-4 text-emerald-600" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">${projectedRev.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Gross expected USD value</span>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Action Header & Catalog Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm">
                          <div>
                            <h3 className="text-base font-black text-slate-900">Group Cohorts Catalog</h3>
                            <p className="text-xs text-slate-450 font-bold mt-0.5">Pre-schedule live revision classes and sell tickets.</p>
                          </div>
                          <Button 
                            onClick={() => setIsCreateCohortOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                          >
                    <Plus className="h-4 w-4" /> Pre-schedule Cohort
                          </Button>
                        </div>

                        {/* Cohort Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {activeCohorts.map((cohort) => {
                            const isExpanded = expandedItemId === cohort.id;
                            const percent = cohort.seats > 0 ? Math.round((cohort.registeredCount / cohort.seats) * 100) : 0;
                            return (
                              <Card key={cohort.id} className="border-slate-200/80 bg-white shadow-sm rounded-2xl flex flex-col hover:shadow-md transition-all">
                                <CardHeader className="p-6 pb-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="space-y-1">
                                      <div className="flex flex-wrap gap-1.5 items-center">
                                        <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[9px] font-bold py-0.5 px-2 rounded-lg">{cohort.curriculum}</Badge>
                                        <Badge className="bg-slate-50 border border-slate-200 text-slate-650 text-[9px] font-bold py-0.5 px-2 rounded-lg">{cohort.subject}</Badge>
                                        {cohort.publishStatus === "draft" && (
                                          <Badge className="bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-black py-0.5 px-2 rounded-lg">Draft</Badge>
                                        )}
                                        {cohort.publishStatus === "published" && (
                                          <Badge className="bg-emerald-50 border border-emerald-250 text-emerald-700 text-[9px] font-black py-0.5 px-2 rounded-lg">Live</Badge>
                                        )}
                                        {cohort.publishStatus === "archived" && (
                                          <Badge className="bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-black py-0.5 px-2 rounded-lg">Archived</Badge>
                                        )}
                                        {cohort.deliveryMode === "offline" ? (
                                          <Badge className="bg-rose-50 border border-rose-250 text-rose-700 text-[9px] font-black py-0.5 px-2 rounded-lg uppercase">Offline</Badge>
                                        ) : (
                                          <Badge className="bg-cyan-50 border border-cyan-250 text-cyan-700 text-[9px] font-black py-0.5 px-2 rounded-lg uppercase">Online</Badge>
                                        )}
                                      </div>
                                      <Link href={`/dashboard/cohorts/${cohort.id}`} className="hover:text-indigo-600 transition-colors">
                                        <h4 className="text-sm font-black text-slate-900 mt-1.5 leading-snug flex items-center gap-1">
                                          {cohort.title}
                                          <ArrowUpRight className="h-3 w-3 opacity-55 hover:opacity-100" />
                                        </h4>
                                      </Link>
                                      <p className="text-xs font-semibold text-slate-500 mt-1">{cohort.miniDescription || "No summary provided."}</p>
                                    </div>
                                    <span className="text-lg font-black text-slate-900 shrink-0">${cohort.price.toFixed(2)}</span>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="p-6 pt-0 pb-4 flex-1 space-y-4 text-xs">
                                  <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl space-y-2">
                                    <div className="flex items-center gap-2 text-slate-600 font-bold">
                                      <Calendar className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                      <span>{cohort.schedule}</span>
                                    </div>
                                    {cohort.deliveryMode === "offline" && cohort.location && (
                                      <div className="flex items-center gap-2 text-slate-600 font-bold pt-1.5 border-t border-slate-100/50">
                                        <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                                        <span className="truncate" title={cohort.location}>{cohort.location}</span>
                                      </div>
                                    )}
                                    <div className="space-y-1 pt-1.5 border-t border-slate-100">
                                      <div className="flex items-center justify-between font-bold text-slate-500">
                                        <span>Seat Capacity Fill</span>
                                        <span className="text-slate-800">{cohort.registeredCount} / {cohort.seats} ({percent}%)</span>
                                      </div>
                                      <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full transition-all ${
                                            percent >= 90 ? "bg-amber-500" : percent >= 50 ? "bg-indigo-600" : "bg-emerald-500"
                                          }`} 
                                          style={{ width: `${percent}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {isExpanded && (
                                    <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                      <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Syllabus Outline</h5>
                                        <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap bg-slate-50/50 p-3 rounded-xl border border-slate-100">{cohort.description}</p>
                                      </div>
                                      
                                      <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Attached Materials ({cohort.attachments?.length || 0})</h5>
                                        {cohort.attachments && cohort.attachments.length > 0 ? (
                                          <div className="grid grid-cols-1 gap-2">
                                            {cohort.attachments.map((att: any, idx: number) => (
                                              <div key={att.id} className="p-2.5 bg-slate-50/50 border border-slate-200/50 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold shrink-0">📄</span>
                                                  <div className="min-w-0">
                                                    <div className="font-extrabold text-slate-800 truncate">{idx + 1}. {att.title}</div>
                                                    <div className="text-[9px] text-slate-400 font-semibold">{att.fileName} ({att.fileSize})</div>
                                                  </div>
                                                </div>
                                                {att.notes && (
                                                  <span className="text-[9px] italic text-slate-500 pl-3 border-l border-slate-200 text-right ml-2 shrink-0">
                                                    {att.notes}
                                                  </span>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-xs italic text-slate-400">No attached files.</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </CardContent>

                                <CardFooter className="p-6 pt-0 border-t border-slate-55 flex items-center justify-between bg-slate-50/20 rounded-b-2xl">
                                  <div>
                                    {(cohort.deliveryMode || "online") === "online" && cohort.publishStatus === "published" && (
                                      <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => triggerToast(`Connecting to virtual classroom: BigBlueButton room ID BBB-${cohort.id}`)}
                                        className="h-8 text-[11px] font-black bg-emerald-600 hover:bg-emerald-500 text-white px-3 rounded-lg"
                                      >
                                        Launch BBB Room
                                      </Button>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setEditingItem({ type: "cohort", id: cohort.id, fields: { ...cohort } })}
                                      className="h-8 text-[11px] font-black text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 rounded-lg"
                                    >
                                      Edit Details
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setExpandedItemId(isExpanded ? null : cohort.id)}
                                      className="h-8 text-[11px] font-black text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 rounded-lg"
                                    >
                                      {isExpanded ? "Hide Outline" : "View Outline"}
                                    </Button>
                                  </div>
                                </CardFooter>
                              </Card>
                            );
                          })}
                        </div>

                        {/* Modal Dialog Form */}
                        {isCreateCohortOpen && (
                          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                              {/* Modal Header */}
                              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <PlusCircle className="h-5 w-5 text-indigo-600" />
                                    Pre-schedule a Live Group Cohort Class
                                  </h3>
                                  <p className="text-[10px] text-slate-450 mt-0.5 font-bold">Host live interactive lessons for multiple students. Set prices per registration in USD.</p>
                                </div>
                                <button 
                                  onClick={() => setIsCreateCohortOpen(false)}
                                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-150 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Modal Body */}
                              <form onSubmit={handleCreateCohort} className="flex flex-col flex-1 overflow-hidden">
                                <div className="p-6 overflow-y-auto space-y-4 text-xs">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <Label htmlFor="cohortTitle" className="text-xs font-bold text-slate-700">Cohort Class Title</Label>
                                      <Input 
                                        id="cohortTitle"
                                        type="text" 
                                        placeholder="e.g. Pure Mathematics: Integral Calculus revision" 
                                        value={newCohortTitle}
                                        onChange={(e) => setNewCohortTitle(e.target.value)}
                                        required
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Subject Stream</Label>
                                      <Select value={newCohortSubject} onValueChange={(val) => val && setNewCohortSubject(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                                          <SelectItem value="Physics">Physics</SelectItem>
                                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                                          <SelectItem value="English">English Literature</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Syllabus Target</Label>
                                      <Select value={newCohortCurriculum} onValueChange={(val) => val && setNewCohortCurriculum(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select curriculum" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="ZIMSEC">ZIMSEC Syllabus</SelectItem>
                                          <SelectItem value="Cambridge">Cambridge CIE</SelectItem>
                                          <SelectItem value="IEB">IEB CAPS (Matric)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Schedule Frequency</Label>
                                      <Select value={newCohortSchedule} onValueChange={(val) => val && setNewCohortSchedule(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="Weekly">Weekly Repeating</SelectItem>
                                          <SelectItem value="One-time">One-time Session</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label htmlFor="cohortMeets" className="text-xs font-bold text-slate-700">Meets On (e.g. Saturdays 10:00 CAT)</Label>
                                      <Input 
                                        id="cohortMeets"
                                        type="text" 
                                        placeholder="e.g. Tuesdays & Thursdays 14:00" 
                                        value={newCohortMeets}
                                        onChange={(e) => setNewCohortMeets(e.target.value)}
                                        required
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <Label htmlFor="cohortPrice" className="text-xs font-bold text-slate-700">Fee per student ($ USD)</Label>
                                      <Input 
                                        id="cohortPrice"
                                        type="number" 
                                        step="0.50"
                                        placeholder="10.00"
                                        value={newCohortPrice}
                                        onChange={(e) => setNewCohortPrice(e.target.value)}
                                        required
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label htmlFor="cohortSeats" className="text-xs font-bold text-slate-700">Student Capacity Limit</Label>
                                      <Input 
                                        id="cohortSeats"
                                        type="number" 
                                        placeholder="20"
                                        value={newCohortSeats}
                                        onChange={(e) => setNewCohortSeats(e.target.value)}
                                        required
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Delivery Mode</Label>
                                      <Select value={newCohortDeliveryMode} onValueChange={(val) => val && setNewCohortDeliveryMode(val as "online" | "offline")}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select delivery mode" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="online">Online (Virtual Meetup)</SelectItem>
                                          <SelectItem value="offline">Offline (Physical Venue)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {newCohortDeliveryMode === "offline" && (
                                      <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                                        <Label htmlFor="cohortLocation" className="text-xs font-bold text-slate-700">Physical Venue / Address</Label>
                                        <Input 
                                          id="cohortLocation"
                                          type="text" 
                                          placeholder="e.g. Room 10, Harare Central Academy" 
                                          value={newCohortLocation}
                                          onChange={(e) => setNewCohortLocation(e.target.value)}
                                          required={newCohortDeliveryMode === "offline"}
                                          className="border-slate-200 rounded-xl"
                                        />
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-4 pt-2 border-t border-slate-100">
                                    <div className="space-y-1.5">
                                      <Label htmlFor="cohortMiniDescription" className="text-xs font-bold text-slate-700">Quick Summary (Mini-Description)</Label>
                                      <Input 
                                        id="cohortMiniDescription"
                                        type="text" 
                                        placeholder="e.g. ZIMSEC O-Level Geometry & Algebra focal review." 
                                        value={newCohortMiniDescription}
                                        onChange={(e) => setNewCohortMiniDescription(e.target.value)}
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label htmlFor="cohortDescription" className="text-xs font-bold text-slate-700">Detailed Syllabus Description & Outline</Label>
                                      <textarea 
                                        id="cohortDescription"
                                        rows={3}
                                        placeholder="Provide a detailed outline of what topics will be taught, weekly schedules, goals, and learning outcomes..." 
                                        value={newCohortDescription}
                                        onChange={(e) => setNewCohortDescription(e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Bundled Resource Materials & Documents</Label>
                                      <MaterialAttachmentManager attachments={newCohortAttachments} onChange={setNewCohortAttachments} />
                                    </div>
                                  </div>
                                </div>

                                <div className="p-6 border-t border-slate-100 flex justify-end gap-2.5 bg-slate-50/50">
                                  <Button 
                                    type="submit"
                                    onClick={() => setCohortSubmitStatus("draft")}
                                    variant="outline"
                                    className="border-slate-200 text-slate-750 font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 transition-colors bg-white"
                                  >
                                    Save as Draft
                                  </Button>
                                  <Button 
                                    type="submit"
                                    onClick={() => setCohortSubmitStatus("published")}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                                  >
                                    <Plus className="h-4 w-4" /> Publish Cohort Class
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* TAB CONTENT: 1-ON-1 SLOTS */}
                  {studioTab === "private" && (() => {
                    const totalSlots = availSlots.length;
                    const bookedSlots = availSlots.filter(s => s.status.startsWith("Booked")).length;
                    const vacantSlots = availSlots.filter(s => !s.status.startsWith("Booked")).length;
                    const occupancyPercent = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

                    return (
                      <div className="space-y-6">
                        {/* Analytics Stats Bar */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Total Slots</span>
                              <Calendar className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{totalSlots}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Defined availability</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Booked Sessions</span>
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{bookedSlots}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Matched with students</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Vacant Slots</span>
                              <Clock className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{vacantSlots}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Open for booking</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Occupancy Rate</span>
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{occupancyPercent}%</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Conversion metric</span>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Action Header & Catalog Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm">
                          <div>
                            <h3 className="text-base font-black text-slate-900">1-on-1 Tutoring Availability</h3>
                            <p className="text-xs text-slate-450 font-bold mt-0.5">Define your available times for private exam preparation sessions.</p>
                          </div>
                          <Button 
                            onClick={() => setIsCreateSlotOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <Plus className="h-4 w-4" /> Add 1-on-1 Slot
                          </Button>
                        </div>

                        {/* Availability Slots Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {availSlots.map((slot) => {
                            const isExpanded = expandedItemId === slot.id;
                            const isBooked = slot.status.startsWith("Booked");
                            return (
                              <Card key={slot.id} className="border-slate-200/80 bg-white shadow-sm rounded-2xl flex flex-col hover:shadow-md transition-all">
                                <CardHeader className="p-6 pb-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="space-y-1">
                                      <div className="flex flex-wrap gap-1.5 items-center">
                                        <Badge className="bg-slate-50 border border-slate-200 text-slate-650 text-[9px] font-bold py-0.5 px-2 rounded-lg">{slot.subject}</Badge>
                                        {slot.publishStatus === "draft" && (
                                          <Badge className="bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-black py-0.5 px-2 rounded-lg">Draft</Badge>
                                        )}
                                        {slot.publishStatus === "published" && (
                                          <Badge className="bg-emerald-50 border border-emerald-250 text-emerald-700 text-[9px] font-black py-0.5 px-2 rounded-lg">Live</Badge>
                                        )}
                                        {slot.publishStatus === "archived" && (
                                          <Badge className="bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-black py-0.5 px-2 rounded-lg">Archived</Badge>
                                        )}
                                      </div>
                                      <Link href={`/dashboard/slots/${slot.id}`} className="hover:text-indigo-600 transition-colors">
                                        <h4 className="text-sm font-black text-slate-900 mt-1.5 leading-snug flex items-center gap-1">
                                          {slot.day}s at {slot.time}
                                          <ArrowUpRight className="h-3 w-3 opacity-55 hover:opacity-100" />
                                        </h4>
                                      </Link>
                                      <p className="text-xs font-semibold text-slate-500 mt-1">{slot.miniDescription || "No summary provided."}</p>
                                    </div>
                                    
                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg shrink-0 border ${
                                      isBooked ? "bg-green-50 text-green-700 border-green-200 animate-pulse" : "bg-slate-50 text-slate-500 border-slate-250"
                                    }`}>
                                      {slot.status}
                                    </span>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="p-6 pt-0 pb-4 flex-1 space-y-4 text-xs">
                                  {isExpanded && (
                                    <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                      <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Student Guidance & Goals</h5>
                                        <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                          {slot.description || "No topic description provided for this session."}
                                        </p>
                                      </div>
                                      
                                      <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Preparatory & Homework Files ({slot.attachments?.length || 0})</h5>
                                        {slot.attachments && slot.attachments.length > 0 ? (
                                          <div className="grid grid-cols-1 gap-2">
                                            {slot.attachments.map((att: any, idx: number) => (
                                              <div key={att.id} className="p-2.5 bg-slate-50/50 border border-slate-200/50 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold shrink-0">📄</span>
                                                  <div className="min-w-0">
                                                    <div className="font-extrabold text-slate-800 truncate">{idx + 1}. {att.title}</div>
                                                    <div className="text-[9px] text-slate-400 font-semibold">{att.fileName} ({att.fileSize})</div>
                                                  </div>
                                                </div>
                                                {att.notes && (
                                                  <span className="text-[9px] italic text-slate-500 pl-3 border-l border-slate-200 text-right ml-2 shrink-0">
                                                    {att.notes}
                                                  </span>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-xs italic text-slate-400">No preparatory file downloads attached.</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </CardContent>

                                <CardFooter className="p-6 pt-0 border-t border-slate-55 flex items-center justify-end gap-2 bg-slate-50/20 rounded-b-2xl">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingItem({ type: "slot", id: slot.id, fields: { ...slot } })}
                                    className="h-8 text-[11px] font-black text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 rounded-lg"
                                  >
                                    Edit Details
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setExpandedItemId(isExpanded ? null : slot.id)}
                                    className="h-8 text-[11px] font-black text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 rounded-lg"
                                  >
                                    {isExpanded ? "Hide Guidance" : "View Guidance"}
                                  </Button>

                                  {!isBooked ? (
                                    <Button 
                                      type="button"
                                      onClick={() => handleRemoveAvailSlot(slot.id)}
                                      variant="ghost" 
                                      className="h-8 text-[11px] font-bold text-red-600 hover:text-red-500 hover:bg-red-50 px-3 rounded-lg"
                                    >
                                      Remove Slot
                                    </Button>
                                  ) : (
                                    <Button 
                                      type="button"
                                      onClick={() => triggerToast(`Connecting to 1-on-1 private virtual classroom: BigBlueButton room ID BBB-${slot.id}`)}
                                      className="h-8 text-[11px] font-black bg-emerald-600 hover:bg-emerald-500 text-white px-3 rounded-lg"
                                    >
                                      Launch BBB Room
                                    </Button>
                                  )}
                                </CardFooter>
                              </Card>
                            );
                          })}
                        </div>

                        {/* Modal Dialog Form */}
                        {isCreateSlotOpen && (
                          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                              {/* Modal Header */}
                              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <PlusCircle className="h-5 w-5 text-indigo-600" />
                                    Define 1-on-1 Private Booking Availability
                                  </h3>
                                  <p className="text-[10px] text-slate-450 mt-0.5 font-bold">Select the days and times you are free to accept private students. These slots display in the Marketplace.</p>
                                </div>
                                <button 
                                  onClick={() => setIsCreateSlotOpen(false)}
                                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-150 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Modal Body */}
                              <form onSubmit={handleAddAvailSlot} className="flex flex-col flex-1 overflow-hidden">
                                <div className="p-6 overflow-y-auto space-y-4 text-xs">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Day of the Week</Label>
                                      <Select value={availDay} onValueChange={(val) => val && setAvailDay(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="Monday">Mondays</SelectItem>
                                          <SelectItem value="Tuesday">Tuesdays</SelectItem>
                                          <SelectItem value="Wednesday">Wednesdays</SelectItem>
                                          <SelectItem value="Thursday">Thursdays</SelectItem>
                                          <SelectItem value="Friday">Fridays</SelectItem>
                                          <SelectItem value="Saturday">Saturdays</SelectItem>
                                          <SelectItem value="Sunday">Sundays</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Available Time Block (CAT)</Label>
                                      <Select value={availTime} onValueChange={(val) => val && setAvailTime(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="08:00 CAT">08:00 CAT (Morning)</SelectItem>
                                          <SelectItem value="09:30 CAT">09:30 CAT</SelectItem>
                                          <SelectItem value="11:00 CAT">11:00 CAT</SelectItem>
                                          <SelectItem value="13:00 CAT">13:00 CAT (Afternoon)</SelectItem>
                                          <SelectItem value="14:30 CAT">14:30 CAT</SelectItem>
                                          <SelectItem value="16:00 CAT">16:00 CAT (Late Afternoon)</SelectItem>
                                          <SelectItem value="17:30 CAT">17:30 CAT</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Subject Coverage</Label>
                                      <Select value={availSubject} onValueChange={(val) => val && setAvailSubject(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                                          <SelectItem value="Physics">Physics</SelectItem>
                                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                                          <SelectItem value="English">English Literature</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-2 border-t border-slate-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <Label htmlFor="availMiniDescription" className="text-xs font-bold text-slate-700">Session Subject Summary (Mini-Description)</Label>
                                        <Input 
                                          id="availMiniDescription"
                                          type="text" 
                                          placeholder="e.g. Cambridge A-Level Electromagnetism review." 
                                          value={availMiniDescription}
                                          onChange={(e) => setAvailMiniDescription(e.target.value)}
                                          className="border-slate-200 rounded-xl"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <Label htmlFor="availDescription" className="text-xs font-bold text-slate-700">Detailed Student Guidance / Topic Goals</Label>
                                        <Input 
                                          id="availDescription"
                                          type="text" 
                                          placeholder="Provide focus instructions (e.g. revise chapter 3 mole theory beforehand)." 
                                          value={availDescription}
                                          onChange={(e) => setAvailDescription(e.target.value)}
                                          className="border-slate-200 rounded-xl"
                                        />
                                      </div>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Homework & Preparatory Attachments</Label>
                                      <MaterialAttachmentManager attachments={availAttachments} onChange={setAvailAttachments} />
                                    </div>
                                  </div>
                                </div>

                                <div className="p-6 border-t border-slate-100 flex justify-end gap-2.5 bg-slate-50/50">
                                  <Button 
                                    type="submit"
                                    onClick={() => setSlotSubmitStatus("draft")}
                                    variant="outline"
                                    className="border-slate-200 text-slate-750 font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 transition-colors bg-white"
                                  >
                                    Save as Draft
                                  </Button>
                                  <Button 
                                    type="submit"
                                    onClick={() => setSlotSubmitStatus("published")}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                                  >
                                    <Plus className="h-4 w-4" /> Add Availability Slot
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* TAB CONTENT: DIGITAL RESOURCES */}
                  {studioTab === "resources" && (() => {
                    const totalResources = uploadedResources.length;
                    const totalDownloads = uploadedResources.reduce((acc, r) => acc + (r.downloads || 0), 0);
                    const grossRevenue = uploadedResources.reduce((acc, r) => acc + (r.revenue || 0), 0);
                    const avgPrice = totalResources > 0 ? (uploadedResources.reduce((acc, r) => acc + (r.price || 0), 0) / totalResources) : 0;

                    return (
                      <div className="space-y-6">
                        {/* Analytics Stats Bar */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Catalog Size</span>
                              <ShoppingBag className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{totalResources}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Published assets</span>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Downloads</span>
                              <Download className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">{totalDownloads}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Acquired items</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Gross Revenue</span>
                              <DollarSign className="h-4 w-4 text-emerald-600" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">${grossRevenue.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Total earnings USD</span>
                            </CardContent>
                          </Card>

                          <Card className="border-slate-100 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl hover:border-slate-200 transition-all">
                            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Average Price</span>
                              <TrendingUp className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <span className="text-2xl font-black text-slate-900">${avgPrice.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">Value per asset</span>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Action Header & Catalog Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm">
                          <div>
                            <h3 className="text-base font-black text-slate-900">Digital Resources Storefront</h3>
                            <p className="text-xs text-slate-450 font-bold mt-0.5">Upload syllabus worksheets, lesson plan schemes, and exam materials.</p>
                          </div>
                          <Button 
                            onClick={() => setIsCreateResourceOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <Plus className="h-4 w-4" /> Publish Resource
                          </Button>
                        </div>

                        {/* Resource Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {uploadedResources.map((item) => {
                            const isExpanded = expandedItemId === item.id;
                            return (
                              <Card key={item.id} className="border-slate-200/80 bg-white shadow-sm rounded-2xl flex flex-col hover:shadow-md transition-all">
                                <CardHeader className="p-6 pb-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="space-y-1">
                                      <div className="flex flex-wrap gap-1.5 items-center">
                                        <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-700 text-[9px] font-bold py-0.5 px-2 rounded-lg">{item.curriculum}</Badge>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg border ${
                                          item.audience === "Teachers" ? "bg-orange-50 text-orange-700 border-orange-200" :
                                          item.audience === "Students" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                          "bg-emerald-50 text-emerald-700 border-emerald-250"
                                        }`}>
                                          {item.audience}
                                        </span>
                                        {item.publishStatus === "draft" && (
                                          <Badge className="bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-black py-0.5 px-2 rounded-lg">Draft</Badge>
                                        )}
                                        {item.publishStatus === "published" && (
                                          <Badge className="bg-emerald-50 border border-emerald-250 text-emerald-700 text-[9px] font-black py-0.5 px-2 rounded-lg">Live</Badge>
                                        )}
                                        {item.publishStatus === "archived" && (
                                          <Badge className="bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-black py-0.5 px-2 rounded-lg">Archived</Badge>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-start gap-2.5 mt-2">
                                        <div className="p-2 bg-indigo-50/80 rounded-xl text-indigo-650 shrink-0 mt-0.5">
                                          <FileText className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <Link href={`/dashboard/resources/${item.id}`} className="hover:text-indigo-600 transition-colors">
                                            <h4 className="text-sm font-black text-slate-900 leading-snug flex items-center gap-1">
                                              {item.title}
                                              <ArrowUpRight className="h-3 w-3 opacity-55 hover:opacity-100" />
                                            </h4>
                                          </Link>
                                          <span className="text-[10px] text-slate-450 font-bold block mt-0.5">{item.type}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <span className="text-lg font-black text-slate-900 shrink-0">${item.price.toFixed(2)}</span>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="p-6 pt-0 pb-4 flex-1 space-y-4 text-xs">
                                  <p className="text-xs font-semibold text-slate-505">{item.miniDescription || "No summary provided."}</p>
                                  
                                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl text-center">
                                    <div>
                                      <span className="text-[9px] font-bold text-slate-450 block uppercase">Downloads</span>
                                      <span className="text-sm font-black text-slate-800">{item.downloads} downloads</span>
                                    </div>
                                    <div className="border-l border-slate-200/60">
                                      <span className="text-[9px] font-bold text-slate-450 block uppercase">Total Revenue</span>
                                      <span className="text-sm font-black text-emerald-650">${item.revenue.toFixed(2)}</span>
                                    </div>
                                  </div>

                                  {isExpanded && (
                                    <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                      <div>
                                        <h5 className="text-[10px] font-black text-slate-450 uppercase tracking-wider mb-1.5">Detailed Description</h5>
                                        <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap bg-slate-50/50 p-3 rounded-xl border border-slate-100">{item.description}</p>
                                      </div>
                                      
                                      <div>
                                        <h5 className="text-[10px] font-black text-slate-450 uppercase tracking-wider mb-2">Package Files & Bundle Downloads ({item.attachments?.length || 0})</h5>
                                        {item.attachments && item.attachments.length > 0 ? (
                                          <div className="grid grid-cols-1 gap-2">
                                            {item.attachments.map((att: any, idx: number) => (
                                              <div key={att.id} className="p-2.5 bg-slate-50/50 border border-slate-200/50 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold shrink-0">📄</span>
                                                  <div className="min-w-0">
                                                    <div className="font-extrabold text-slate-800 truncate">{idx + 1}. {att.title}</div>
                                                    <div className="text-[9px] text-slate-400 font-semibold">{att.fileName} ({att.fileSize})</div>
                                                  </div>
                                                </div>
                                                {att.notes && (
                                                  <span className="text-[9px] italic text-slate-500 pl-3 border-l border-slate-200 text-right ml-2 shrink-0">
                                                    {att.notes}
                                                  </span>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-xs italic text-slate-400">No downloadable files bundled. File needs to be uploaded.</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </CardContent>

                                <CardFooter className="p-6 pt-0 border-t border-slate-55 flex items-center justify-end gap-2 bg-slate-50/20 rounded-b-2xl">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingItem({ type: "resource", id: item.id, fields: { ...item } })}
                                    className="h-8 text-[11px] font-black text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 rounded-lg"
                                  >
                                    Edit Details
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                                    className="h-8 text-[11px] font-black text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 rounded-lg"
                                  >
                                    {isExpanded ? "Hide Package" : "View Package"}
                                  </Button>
                                </CardFooter>
                              </Card>
                            );
                          })}
                        </div>

                        {/* Modal Dialog Form */}
                        {isCreateResourceOpen && (
                          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                              {/* Modal Header */}
                              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div>
                                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                    <UploadCloud className="h-5 w-5 text-indigo-600" />
                                    Create & Publish a Syllabus Resource
                                  </h3>
                                  <p className="text-[10px] text-slate-450 mt-0.5 font-bold">Upload curriculum worksheets, exam schematics, or lesson prep sheets. Sell/rent to peers or students.</p>
                                </div>
                                <button 
                                  onClick={() => setIsCreateResourceOpen(false)}
                                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-150 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Modal Body */}
                              <form onSubmit={handleUploadResource} className="flex flex-col flex-1 overflow-hidden">
                                <div className="p-6 overflow-y-auto space-y-4 text-xs">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <Label htmlFor="resTitle" className="text-xs font-bold text-slate-700">Resource Title</Label>
                                      <Input 
                                        id="resTitle"
                                        type="text" 
                                        placeholder="e.g. O-Level Chemistry Revision Handout" 
                                        value={resourceTitle}
                                        onChange={(e) => setResourceTitle(e.target.value)}
                                        required
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Curriculum Target</Label>
                                      <Select value={resourceCurriculum} onValueChange={(val) => val && setResourceCurriculum(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select curriculum" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="ZIMSEC">ZIMSEC Local Syllabus</SelectItem>
                                          <SelectItem value="Cambridge">Cambridge CIE Syllabus</SelectItem>
                                          <SelectItem value="IEB">IEB CAPS (Matric)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Target Audience</Label>
                                      <Select value={resourceAudience} onValueChange={(val) => val && setResourceAudience(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select audience" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="Students">Students Only (Worksheets, Revision)</SelectItem>
                                          <SelectItem value="Teachers">Teachers Only (Lesson Plans, Rubrics)</SelectItem>
                                          <SelectItem value="Both">Both Students & Teachers</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Resource Category Type</Label>
                                      <Select value={resourceType} onValueChange={(val) => val && setResourceType(val)}>
                                        <SelectTrigger className="border-slate-200 rounded-xl">
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                          <SelectItem value="PDF Notes">PDF Revision Notes</SelectItem>
                                          <SelectItem value="Lesson Plan Template">Lesson Plan & Schemes</SelectItem>
                                          <SelectItem value="Worksheet">Printable Worksheets</SelectItem>
                                          <SelectItem value="Exam Prep Slides">Exam Board Revision Slides</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label htmlFor="resPrice" className="text-xs font-bold text-slate-700">USD Price ($)</Label>
                                      <Input 
                                        id="resPrice"
                                        type="number" 
                                        step="0.01"
                                        placeholder="4.99"
                                        value={resourcePrice}
                                        onChange={(e) => setResourcePrice(e.target.value)}
                                        required
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-2 border-t border-slate-100">
                                    <div className="space-y-1.5">
                                      <Label htmlFor="resourceMiniDescription" className="text-xs font-bold text-slate-700">Quick Resource Summary (Mini-Description)</Label>
                                      <Input 
                                        id="resourceMiniDescription"
                                        type="text" 
                                        placeholder="e.g. ZIMSEC O-Level Mechanics kinematics reference package." 
                                        value={resourceMiniDescription}
                                        onChange={(e) => setResourceMiniDescription(e.target.value)}
                                        className="border-slate-200 rounded-xl"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label htmlFor="resourceDescription" className="text-xs font-bold text-slate-700">Detailed Resource & Package Contents Description</Label>
                                      <textarea 
                                        id="resourceDescription"
                                        rows={3}
                                        placeholder="Describe the resource file bundles in detail, including topic coverage, answers availability, target grades..." 
                                        value={resourceDescription}
                                        onChange={(e) => setResourceDescription(e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <Label className="text-xs font-bold text-slate-700">Syllabus Files & Bundle Downloads</Label>
                                      <MaterialAttachmentManager attachments={resourceAttachments} onChange={setResourceAttachments} />
                                    </div>
                                  </div>
                                </div>

                                <div className="p-6 border-t border-slate-100 flex justify-end gap-2.5 bg-slate-50/50">
                                  <Button 
                                    type="submit"
                                    onClick={() => setResourceSubmitStatus("draft")}
                                    variant="outline"
                                    className="border-slate-200 text-slate-750 font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 transition-colors bg-white"
                                  >
                                    Save as Draft
                                  </Button>
                                  <Button 
                                    type="submit"
                                    onClick={() => setResourceSubmitStatus("published")}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                                  >
                                    <Plus className="h-4 w-4" /> Publish Resource
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* TAB CONTENT: STUDENT ROSTER */}
                  {studioTab === "roster" && (
                    <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950">Booked Students & Parent Links</CardTitle>
                        <CardDescription className="text-xs">Access linked parents, active classes, and send notifications.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                                <th className="py-2.5">Student Name</th>
                                <th className="py-2.5">Class / Cohort</th>
                                <th className="py-2.5">Linked Parent</th>
                                <th className="py-2.5">Contact Phone</th>
                                <th className="py-2.5 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 font-extrabold text-slate-900">Tinashe Sibanda</td>
                                <td className="py-3">O-Level Mathematics Revision</td>
                                <td className="py-3 font-semibold text-slate-600">John Sibanda</td>
                                <td className="py-3 font-semibold text-slate-600">+263 77 481 9054</td>
                                <td className="py-3 text-right">
                                  <Button 
                                    onClick={() => triggerToast("WhatsApp template sent: Welcome John Sibanda & Tinashe to O-Level Math!")}
                                    variant="outline" 
                                    className="h-7 text-[10px] font-black border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                  >
                                    WhatsApp Welcome
                                  </Button>
                                </td>
                              </tr>
                              <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 font-extrabold text-slate-900">Chipo Ndlovu</td>
                                <td className="py-3">A-Level Calculus Prep</td>
                                <td className="py-3 font-semibold text-slate-600">Tariro Ndlovu</td>
                                <td className="py-3 font-semibold text-slate-600">+263 78 551 2291</td>
                                <td className="py-3 text-right">
                                  <Button 
                                    onClick={() => triggerToast("WhatsApp template sent: Welcome Tariro Ndlovu & Chipo to Calculus Prep!")}
                                    variant="outline" 
                                    className="h-7 text-[10px] font-black border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                  >
                                    WhatsApp Welcome
                                  </Button>
                                </td>
                              </tr>
                              <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 font-extrabold text-slate-900">Farai Moyo</td>
                                <td className="py-3">O-Level Mathematics Revision</td>
                                <td className="py-3 font-semibold text-slate-600">Simba Moyo</td>
                                <td className="py-3 font-semibold text-slate-600">+263 77 122 3904</td>
                                <td className="py-3 text-right">
                                  <Button 
                                    onClick={() => triggerToast("WhatsApp template sent: Welcome Simba Moyo & Farai to O-Level Math!")}
                                    variant="outline" 
                                    className="h-7 text-[10px] font-black border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                  >
                                    WhatsApp Welcome
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* TAB CONTENT: PAYOUTS & LEDGERS */}
                  {studioTab === "payouts" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-slate-200/80 bg-white">
                          <CardHeader className="p-4 pb-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase">AVAILABLE FOR PAYOUT</span>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <span className="text-xl font-black text-slate-950">${teacherBalance.toFixed(2)}</span>
                            <span className="text-[10px] text-slate-400 block mt-1">Held securely in Escrow</span>
                          </CardContent>
                        </Card>
                        <Card className="border-slate-200/80 bg-white">
                          <CardHeader className="p-4 pb-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase">PENDING APPROVAL</span>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <span className="text-xl font-black text-slate-900">$0.00</span>
                            <span className="text-[10px] text-slate-400 block mt-1">Under 24h dispute window</span>
                          </CardContent>
                        </Card>
                        <Card className="border-slate-200/80 bg-white">
                          <CardHeader className="p-4 pb-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase">TOTAL EARNINGS TO DATE</span>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <span className="text-xl font-black text-indigo-655">$1,741.24</span>
                            <span className="text-[10px] text-green-500 font-bold block mt-1">Payout status active</span>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Escrow Payout Console Form */}
                      <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                        <CardHeader className="p-6">
                          <CardTitle className="text-base font-black text-slate-950 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-indigo-600" />
                            Escrow Balance Payout Console
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Withdraw your available earnings via local mobile wallets (EcoCash / InnBucks) or bank transfers.
                          </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleEcoCashPayout}>
                          <CardContent className="p-6 pt-0 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-slate-700">Withdrawal Payout Target</Label>
                                <Select value={payoutMethod} onValueChange={(val: any) => {
                                  if (val) {
                                    setPayoutMethod(val);
                                    setPayoutPhone(val === "ecocash" ? "+263 77 481 9054" : val === "innbucks" ? "+263 78 481 9054" : "12-345678-A-90");
                                  }
                                }}>
                                  <SelectTrigger className="border-slate-200 rounded-xl">
                                    <SelectValue placeholder="Select target" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="ecocash">EcoCash Mobile Money</SelectItem>
                                    <SelectItem value="innbucks">InnBucks Wallet</SelectItem>
                                    <SelectItem value="zipit">ZIPIT Bank Transfer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-1.5">
                                <Label htmlFor="payPhoneField" className="text-xs font-bold text-slate-700">
                                  {payoutMethod === "zipit" ? "Bank Account Number" : "Mobile Phone Target"}
                                </Label>
                                <Input 
                                  id="payPhoneField"
                                  type="text" 
                                  value={payoutPhone}
                                  onChange={(e) => setPayoutPhone(e.target.value)}
                                  required
                                  className="border-slate-200 rounded-xl"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label htmlFor="payAmtField" className="text-xs font-bold text-slate-700">Withdraw Amount ($ USD)</Label>
                                <Input 
                                  id="payAmtField"
                                  type="number" 
                                  step="1.00"
                                  min="1"
                                  placeholder="e.g. 50.00"
                                  value={payoutAmount}
                                  onChange={(e) => setPayoutAmount(e.target.value)}
                                  required
                                  className="border-slate-200 rounded-xl"
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-6 pt-0 flex justify-end">
                            <Button 
                              type="submit" 
                              className="bg-[#00a884] hover:bg-[#009172] text-white font-extrabold px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5"
                            >
                              <Smartphone className="h-4 w-4" /> Request Payout
                            </Button>
                          </CardFooter>
                        </form>
                      </Card>

                      {/* Transaction Ledger Card */}
                      <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                        <CardHeader className="p-6">
                          <CardTitle className="text-base font-black text-slate-950">Earnings & Payout Ledger History</CardTitle>
                          <CardDescription className="text-xs">Statement log for resource downloads, class tickets, and escrow withdrawals.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse">
                              <thead>
                                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                                  <th className="py-2.5">Date</th>
                                  <th className="py-2.5">Transaction Type</th>
                                  <th className="py-2.5">Reconciliation Description</th>
                                  <th className="py-2.5 text-right">Amount (USD)</th>
                                  <th className="py-2.5 text-right">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transactions.map((tx) => (
                                  <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 font-semibold text-slate-500">{tx.date}</td>
                                    <td className="py-3">
                                      <Badge className={`text-[8px] font-bold px-1.5 py-0 rounded ${
                                        tx.type.startsWith("Sale") ? "bg-green-50 border border-green-150 text-green-700" :
                                        tx.type.startsWith("Payout") ? "bg-red-50 border border-red-150 text-red-700" :
                                        "bg-indigo-50 border border-indigo-150 text-indigo-700"
                                      }`}>
                                        {tx.type}
                                      </Badge>
                                    </td>
                                    <td className="py-3 font-bold text-slate-700">{tx.desc}</td>
                                    <td className={`py-3 font-black text-right ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                                      {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                                    </td>
                                    <td className="py-3 text-right">
                                      <span className="font-extrabold text-[10px] text-slate-400 uppercase">{tx.status}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                </div>
              )}

              {/* LEARNER WORKFLOW */}
              {role === "learner" && (
                <>
                  {/* Join Live Cohorts Dashboard List */}
                  {(pathname === "/dashboard" || pathname.endsWith("/cohorts")) && (
                    <Card id="learner-cohorts" className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950">
                          My Classes
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Join your live WebRTC virtual classroom sessions on BigBlueButton or view session details.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        {allCohorts.map((cohort) => (
                          <div key={cohort.id} className="p-4 border border-slate-150 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-400 transition-colors bg-white">
                            <div className="flex items-start gap-3">
                              <span className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-lg ${cohort.colorClass}`}>
                                {cohort.emoji}
                              </span>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Link 
                                    href={cohort.classType === "1-on-1" ? `/dashboard/slots/${cohort.id}?role=learner` : `/dashboard/cohorts/${cohort.id}?role=learner`} 
                                    className="font-extrabold text-sm text-slate-900 leading-snug hover:text-indigo-650 hover:underline transition-colors"
                                  >
                                    {cohort.title}
                                  </Link>
                                  <Badge className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                                    cohort.classType === "1-on-1" 
                                      ? "bg-purple-50 text-purple-700 border-purple-100" 
                                      : "bg-indigo-50 text-indigo-700 border-indigo-100"
                                  }`}>
                                    {cohort.classType === "1-on-1" ? "1-on-1 Private" : "Cohort"}
                                  </Badge>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 mt-1">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {cohort.rating} • {cohort.tutor} • {cohort.meets} ({cohort.curriculum})
                                </span>
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleJoinClass(cohort.title)}
                              className={`font-black text-xs px-4 py-2 rounded-xl transition-all ${joinedClasses.includes(cohort.title) ? "bg-green-600 hover:bg-green-500 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"}`}
                            >
                              {joinedClasses.includes(cohort.title) ? (
                                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Connected!</span>
                              ) : (
                                "Join Live Class"
                              )}
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* My Downloaded Materials */}
                  {(pathname === "/dashboard" || pathname.endsWith("/resources")) && (
                    <Card id="learner-library" className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950">
                          My Study Library
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Access and download study notes rented/purchased from the Marketplace.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-3">
                        <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-800 mb-4 flex items-start gap-2.5">
                          <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold block mb-0.5 text-indigo-950">Where are these files from?</span>
                            <span className="text-[11px] font-medium leading-relaxed text-indigo-900/90 block">
                              These resources are created and uploaded by certified Tutors/Teachers. They are automatically added here when purchased from the marketplace or shared by your tutors. Click a resource title to view details, reviews, or chat with the author.
                            </span>
                          </div>
                        </div>

                        {purchasedResources.length === 0 ? (
                          <>
                            <div className="p-3 border border-slate-100 rounded-xl flex justify-between items-center bg-slate-50 text-xs font-bold">
                              <span className="flex items-center gap-2 text-slate-800">
                                <FileText className="h-4 w-4 text-emerald-600" />
                                ZIMSEC O-Level Mathematics Past papers solutions.pdf
                              </span>
                              <Button variant="ghost" size="sm" onClick={() => alert("Downloading: ZIMSEC O-Level Mathematics Past papers solutions.pdf")} className="h-8 text-[10px] font-extrabold text-indigo-600 hover:underline">
                                Download File
                              </Button>
                            </div>
                            <div className="p-3 border border-slate-100 rounded-xl flex justify-between items-center bg-slate-50 text-xs font-bold">
                              <span className="flex items-center gap-2 text-slate-800">
                                <FileText className="h-4 w-4 text-emerald-600" />
                                Cambridge A-Level Physics Mechanics formula sheet.pdf
                              </span>
                              <Button variant="ghost" size="sm" onClick={() => alert("Downloading: Cambridge A-Level Physics Mechanics formula sheet.pdf")} className="h-8 text-[10px] font-extrabold text-indigo-600 hover:underline">
                                Download File
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-4">
                            {purchasedResources.map((res) => (
                              <div key={res.id} className="space-y-2 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                                <div className="flex justify-between items-center gap-2">
                                  <Link 
                                    href={`/dashboard/resources/${res.id}?role=learner`} 
                                    className="text-xs font-black text-slate-900 hover:text-indigo-650 hover:underline transition-colors"
                                  >
                                    {res.title}
                                  </Link>
                                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold py-0 rounded shrink-0">
                                    {res.curriculum} {res.type}
                                  </Badge>
                                </div>
                                {res.attachments && res.attachments.length > 0 ? (
                                  <div className="space-y-1.5 pl-2">
                                    {res.attachments.map((att: any) => (
                                      <div key={att.id} className="p-2 border border-slate-100 rounded-lg flex justify-between items-center bg-slate-50/50 text-[11px] font-bold">
                                        <span className="flex items-center gap-1.5 text-slate-700">
                                          <FileText className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                          {att.title} ({att.fileName || "attachment.pdf"})
                                        </span>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          onClick={() => alert(`Downloading: ${att.title} (${att.fileName || "document"})\nFormat: PDF Notes\nSource: Leaner Dynamic Sync CDN`)}
                                          className="h-6 px-2 text-[9px] font-black text-indigo-600 hover:underline"
                                        >
                                          Download
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-[10px] text-slate-400 font-bold pl-2">No attachments in package bundle.</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* AI Homework Helper (shown in left column when on the /helper route) */}
                  {pathname.endsWith("/helper") && (
                    <Card id="learner-helper" className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                      <div className="bg-purple-900 p-6 text-white text-center space-y-3">
                        <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest block">WHATSAPP INTERACTION</span>
                        <Bot className="h-10 w-10 text-purple-200 mx-auto" />
                        <h3 className="text-base font-black">AI Homework Companion</h3>
                        <p className="text-[11px] text-purple-200 leading-relaxed">
                          Need help solving a math or science problem? Snap a photo and send it directly to our WhatsApp bot.
                        </p>
                      </div>
                      <CardContent className="p-5 text-center text-xs space-y-4">
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-extrabold text-slate-700">
                          📲 BOT PHONE: +263 78 842 1195
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold py-5 rounded-xl shadow-md">
                          Open WhatsApp Chat
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {/* PARENT WORKFLOW */}
              {role === "parent" && (
                <>
                  {/* Children Activity Progress */}
                  {(pathname === "/dashboard" || pathname.endsWith("/progress")) && (
                    <Card id="parent-progress" className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950">
                          My Children's Academic Progress logs
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Monitor test scores, quiz averages, and live classroom attendance metrics.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        {/* Child 1 */}
                        <div className="p-4 border border-slate-150 rounded-2xl space-y-3 bg-white">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold flex items-center justify-center">
                                TM
                              </span>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-900">Tinashe Mutasa</h4>
                                <span className="text-[9px] text-slate-400 font-bold uppercase">Grade 11 • Cambridge</span>
                              </div>
                            </div>
                            <Badge className="bg-green-50 border border-green-200 text-green-700 font-bold">Active Learner</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold text-slate-500 pt-2 border-t border-slate-50">
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <span>MATHEMATICS</span>
                              <span className="block text-sm font-black text-slate-900 mt-0.5">A (88%)</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <span>PHYSICS COHORT</span>
                              <span className="block text-sm font-black text-slate-900 mt-0.5">B+ (79%)</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <span>ATTENDANCE RATE</span>
                              <span className="block text-sm font-black text-slate-900 mt-0.5">94%</span>
                            </div>
                          </div>
                        </div>

                        {/* Child 2 */}
                        <div className="p-4 border border-slate-150 rounded-2xl space-y-3 bg-white">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 text-xs font-extrabold flex items-center justify-center">
                                CM
                              </span>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-900">Chipo Mutasa</h4>
                                <span className="text-[9px] text-slate-400 font-bold uppercase">Grade 8 • ZIMSEC</span>
                              </div>
                            </div>
                            <Badge className="bg-green-50 border border-green-200 text-green-700 font-bold">Active Learner</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold text-slate-500 pt-2 border-t border-slate-50">
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <span>GENERAL SCIENCE</span>
                              <span className="block text-sm font-black text-slate-900 mt-0.5">B (74%)</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <span>ENGLISH WORK</span>
                              <span className="block text-sm font-black text-slate-900 mt-0.5">A- (80%)</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <span>ATTENDANCE RATE</span>
                              <span className="block text-sm font-black text-slate-900 mt-0.5">90%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Children Purchases (Cohorts and Digital Resources) */}
                  {(pathname === "/dashboard" || pathname.endsWith("/progress")) && (
                    <Card id="parent-purchases" className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950 flex items-center justify-between">
                          <span>Purchased Learning Resources & Classes</span>
                          <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded-lg border border-slate-200 uppercase tracking-widest font-black">Escrow Protected</span>
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Active live cohorts, 1-on-1 private tuition coaching, and digital study assets mapped to child profile nodes.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-6">
                        {/* Child 1: Tinashe Mutasa */}
                        {(() => {
                          const childName = "Tinashe Mutasa";
                          const data = getChildPurchases(childName);
                          return (
                            <div className="space-y-3 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100/60">
                                <div className="flex items-center gap-2">
                                  <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center">TM</span>
                                  <span className="font-extrabold text-xs text-slate-800">{childName}</span>
                                </div>
                                <span className="text-[9px] text-slate-450 uppercase font-black tracking-wider">Cambridge Grade 11</span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                {/* Classes column */}
                                <div className="space-y-2">
                                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Live Classes & Private Slots</h5>
                                  {data.cohorts.length > 0 ? (
                                    <div className="space-y-2">
                                      {data.cohorts.map((c: any) => (
                                        <div key={c.id} className="p-3 border border-slate-100 rounded-xl bg-white space-y-1 hover:border-slate-250 transition-all">
                                          <div className="flex justify-between items-start gap-2">
                                            <Link 
                                              href={c.classType === "1-on-1" ? `/dashboard/slots/${c.id}?role=parent` : `/dashboard/cohorts/${c.id}?role=parent`}
                                              className="font-bold text-slate-800 hover:text-indigo-655 hover:underline leading-snug"
                                            >
                                              {c.title}
                                            </Link>
                                            <Badge className={`text-[9px] shrink-0 font-black border-none uppercase ${c.classType === "1-on-1" ? "bg-purple-50 text-purple-700" : "bg-indigo-50 text-indigo-700"}`}>
                                              {c.classType === "1-on-1" ? "1-on-1" : "Cohort"}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold pt-1">
                                            <span>Tutor: {c.tutor}</span>
                                            <span className="text-[9px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{c.meets}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-slate-400 font-bold italic py-2">No active class registrations.</p>
                                  )}
                                </div>

                                {/* Resources column */}
                                <div className="space-y-2">
                                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Study Libraries & Resources</h5>
                                  {data.resources.length > 0 ? (
                                    <div className="space-y-2">
                                      {data.resources.map((r: any) => (
                                        <div key={r.id} className="p-3 border border-slate-100 rounded-xl bg-white space-y-2 hover:border-slate-250 transition-all">
                                          <div className="flex justify-between items-start gap-2">
                                            <Link 
                                              href={`/dashboard/resources/${r.id}?role=parent`}
                                              className="font-bold text-slate-800 hover:text-indigo-655 hover:underline leading-snug"
                                            >
                                              {r.title}
                                            </Link>
                                            <Badge className="bg-emerald-50 text-emerald-700 text-[9px] shrink-0 font-black border-none uppercase">{r.type}</Badge>
                                          </div>
                                          {r.attachments && r.attachments.length > 0 && (
                                            <div className="space-y-1.5 pt-1.5 border-t border-slate-50">
                                              {r.attachments.map((att: any) => (
                                                <div key={att.id} className="flex justify-between items-center text-[10px] bg-slate-50/70 p-1.5 rounded border border-slate-100/60 font-bold font-sans">
                                                  <span className="text-slate-650 truncate max-w-[130px] flex items-center gap-1">
                                                    <FileText className="h-3 w-3 text-emerald-500 shrink-0" />
                                                    {att.title}
                                                  </span>
                                                  <button 
                                                    onClick={() => alert(`Downloading attachment: ${att.fileName || "attachment.pdf"}`)}
                                                    className="text-[9px] text-indigo-600 hover:underline shrink-0 font-black"
                                                  >
                                                    Download
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-slate-400 font-bold italic py-2">No digital materials purchased.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Child 2: Chipo Mutasa */}
                        {(() => {
                          const childName = "Chipo Mutasa";
                          const data = getChildPurchases(childName);
                          return (
                            <div className="space-y-3 pt-4 border-t border-slate-100">
                              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100/60">
                                <div className="flex items-center gap-2">
                                  <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black flex items-center justify-center">CM</span>
                                  <span className="font-extrabold text-xs text-slate-800">{childName}</span>
                                </div>
                                <span className="text-[9px] text-slate-450 uppercase font-black tracking-wider">ZIMSEC Grade 8</span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                {/* Classes column */}
                                <div className="space-y-2">
                                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Live Classes & Private Slots</h5>
                                  {data.cohorts.length > 0 ? (
                                    <div className="space-y-2">
                                      {data.cohorts.map((c: any) => (
                                        <div key={c.id} className="p-3 border border-slate-100 rounded-xl bg-white space-y-1 hover:border-slate-250 transition-all">
                                          <div className="flex justify-between items-start gap-2">
                                            <Link 
                                              href={c.classType === "1-on-1" ? `/dashboard/slots/${c.id}?role=parent` : `/dashboard/cohorts/${c.id}?role=parent`}
                                              className="font-bold text-slate-800 hover:text-indigo-655 hover:underline leading-snug"
                                            >
                                              {c.title}
                                            </Link>
                                            <Badge className={`text-[9px] shrink-0 font-black border-none uppercase ${c.classType === "1-on-1" ? "bg-purple-50 text-purple-700" : "bg-indigo-50 text-indigo-700"}`}>
                                              {c.classType === "1-on-1" ? "1-on-1" : "Cohort"}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold pt-1">
                                            <span>Tutor: {c.tutor}</span>
                                            <span className="text-[9px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{c.meets}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-slate-400 font-bold italic py-2">No active class registrations.</p>
                                  )}
                                </div>

                                {/* Resources column */}
                                <div className="space-y-2">
                                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Study Libraries & Resources</h5>
                                  {data.resources.length > 0 ? (
                                    <div className="space-y-2">
                                      {data.resources.map((r: any) => (
                                        <div key={r.id} className="p-3 border border-slate-100 rounded-xl bg-white space-y-2 hover:border-slate-250 transition-all">
                                          <div className="flex justify-between items-start gap-2">
                                            <Link 
                                              href={`/dashboard/resources/${r.id}?role=parent`}
                                              className="font-bold text-slate-800 hover:text-indigo-655 hover:underline leading-snug"
                                            >
                                              {r.title}
                                            </Link>
                                            <Badge className="bg-emerald-50 text-emerald-700 text-[9px] shrink-0 font-black border-none uppercase">{r.type}</Badge>
                                          </div>
                                          {r.attachments && r.attachments.length > 0 && (
                                            <div className="space-y-1.5 pt-1.5 border-t border-slate-50">
                                              {r.attachments.map((att: any) => (
                                                <div key={att.id} className="flex justify-between items-center text-[10px] bg-slate-50/70 p-1.5 rounded border border-slate-100/60 font-bold font-sans">
                                                  <span className="text-slate-655 truncate max-w-[130px] flex items-center gap-1">
                                                    <FileText className="h-3 w-3 text-emerald-500 shrink-0" />
                                                    {att.title}
                                                  </span>
                                                  <button 
                                                    onClick={() => alert(`Downloading attachment: ${att.fileName || "attachment.pdf"}`)}
                                                    className="text-[9px] text-indigo-600 hover:underline shrink-0 font-black"
                                                  >
                                                    Download
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-slate-400 font-bold italic py-2">No digital materials purchased.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  )}

                  {/* Feedback Logs */}
                  {(pathname === "/dashboard" || pathname.endsWith("/feedback")) && (
                    <Card id="parent-feedback" className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950">
                          Feedback Reports from Tutors
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Direct comments from private cohort tutors on student evaluations.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-3">
                        <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 text-xs">
                          <div className="flex justify-between items-center mb-2 font-bold">
                            <span className="text-slate-800">Dr. Albert Sibanda regarding Tinashe</span>
                            <span className="text-slate-400">May 18</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed italic">
                            "Tinashe performed exceptionally well in the quadratic inequalities quiz. He needs to review trigonometric identities in chapter 5, but overall progress is excellent."
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Link Child Profile (shown in left column when on the /link route) */}
                  {pathname.endsWith("/link") && (
                    <Card id="parent-link" className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                      <CardHeader className="p-5">
                        <CardTitle className="text-sm font-black text-slate-900">Add Child profile Link</CardTitle>
                        <CardDescription className="text-xs">
                          Enter the student profile workspace code to link grades.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 pt-0 space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="scod" className="text-xs font-bold text-slate-700">Student Code</Label>
                          <Input 
                            id="scod"
                            type="text" 
                            placeholder="e.g. L-548-STU"
                            className="border-slate-200 rounded-xl"
                          />
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-5 rounded-xl shadow-sm">
                          Validate & Link Student
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Tutor Chat & Escrow Disputes Center */}
                  {pathname.endsWith("/parent-messages") && (
                    <div className="space-y-6">
                      {/* Top Premium Tab Switcher */}
                      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-md">
                        <button
                          onClick={() => setParentActiveTab("chat")}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                            parentActiveTab === "chat"
                              ? "bg-white text-indigo-700 shadow-sm border border-slate-150"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Tutor Messaging
                        </button>
                        <button
                          onClick={() => setParentActiveTab("disputes")}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                            parentActiveTab === "disputes"
                              ? "bg-white text-indigo-700 shadow-sm border border-slate-150"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          <Scale className="h-4 w-4" />
                          Escrow Disputes Center
                        </button>
                      </div>

                      {parentActiveTab === "chat" ? (
                        /* Tutor Messaging View */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm min-h-[550px]">
                          {/* Left Pane: Tutors Directory */}
                          <div className="lg:col-span-4 border-r border-slate-150 flex flex-col bg-slate-50/50">
                            <div className="p-4 border-b border-slate-150 space-y-3 bg-white">
                              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Tutors Directory</h3>
                              <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                                <Input
                                  placeholder="Search tutors by name..."
                                  value={chatSearchQuery}
                                  onChange={(e) => setChatSearchQuery(e.target.value)}
                                  className="pl-9 bg-slate-50 border-slate-200 rounded-xl text-xs"
                                />
                              </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-4">
                              {/* Linked Tutors */}
                              <div className="space-y-1">
                                <span className="px-3 text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                  Linked Educators
                                </span>
                                {[
                                  { id: "albert", name: "Dr. Albert Sibanda", subject: "O-Level Mathematics", avatar: "AS", active: true, desc: "Tinashe's Math Coach" },
                                  { id: "tariro", name: "Mrs. Tariro Ndlovu", subject: "A-Level Chemistry", avatar: "TN", active: true, desc: "Chipo's Chemistry Coach" }
                                ]
                                  .filter(t => t.name.toLowerCase().includes(chatSearchQuery.toLowerCase()))
                                  .map(tutor => (
                                    <button
                                      key={tutor.id}
                                      onClick={() => setActiveChatTutorId(tutor.id)}
                                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                                        activeChatTutorId === tutor.id
                                          ? "bg-indigo-50 text-indigo-950 border border-indigo-150 shadow-sm"
                                          : "hover:bg-slate-100/70 border border-transparent text-slate-700"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="relative shrink-0">
                                          <Avatar className="h-8 w-8 border border-slate-200">
                                            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-extrabold text-[10px]">{tutor.avatar}</AvatarFallback>
                                          </Avatar>
                                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                                        </div>
                                        <div className="min-w-0">
                                          <h4 className="font-extrabold text-xs truncate leading-snug">{tutor.name}</h4>
                                          <p className="text-[10px] text-slate-400 truncate leading-snug font-medium">{tutor.subject}</p>
                                        </div>
                                      </div>
                                      <Badge className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[8px] font-black shrink-0">LINKED</Badge>
                                    </button>
                                  ))}
                              </div>

                              {/* Marketplace Lookup */}
                              <div className="space-y-1 pt-2">
                                <span className="px-3 text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                  Marketplace Lookup
                                </span>
                                {[
                                  { id: "simba", name: "Mr. Simba Moyo", subject: "1-on-1 Private Tuition", avatar: "SM", active: false, desc: "Escrow Hold Active" }
                                ]
                                  .filter(t => t.name.toLowerCase().includes(chatSearchQuery.toLowerCase()))
                                  .map(tutor => (
                                    <button
                                      key={tutor.id}
                                      onClick={() => setActiveChatTutorId(tutor.id)}
                                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                                        activeChatTutorId === tutor.id
                                          ? "bg-indigo-50 text-indigo-950 border border-indigo-150 shadow-sm"
                                          : "hover:bg-slate-100/70 border border-transparent text-slate-700"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="relative shrink-0">
                                          <Avatar className="h-8 w-8 border border-slate-200">
                                            <AvatarFallback className="bg-purple-100 text-purple-700 font-extrabold text-[10px]">{tutor.avatar}</AvatarFallback>
                                          </Avatar>
                                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-slate-350 border-2 border-white"></span>
                                        </div>
                                        <div className="min-w-0">
                                          <h4 className="font-extrabold text-xs truncate leading-snug">{tutor.name}</h4>
                                          <p className="text-[10px] text-slate-400 truncate leading-snug font-medium">{tutor.subject}</p>
                                        </div>
                                      </div>
                                      <Badge className="bg-amber-50 border border-amber-200 text-amber-700 text-[8px] font-black shrink-0">DISPUTE TARGET</Badge>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Pane: Live Chat thread */}
                          <div className="lg:col-span-8 flex flex-col bg-white">
                            {(() => {
                              const tutor = [
                                { id: "albert", name: "Dr. Albert Sibanda", subject: "O-Level Mathematics", avatar: "AS", active: true },
                                { id: "tariro", name: "Mrs. Tariro Ndlovu", subject: "A-Level Chemistry", avatar: "TN", active: true },
                                { id: "simba", name: "Mr. Simba Moyo", subject: "1-on-1 Private Tuition", avatar: "SM", active: false }
                              ].find(t => t.id === activeChatTutorId);

                              if (!tutor) {
                                return (
                                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
                                    <MessageSquare className="h-10 w-10 text-slate-300" />
                                    <p className="text-xs font-bold">Select a tutor from the directory to initiate messaging.</p>
                                  </div>
                                );
                              }

                              const messages = parentChatThreads[activeChatTutorId] || [];

                              return (
                                <>
                                  {/* Chat Header */}
                                  <div className="p-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-3">
                                      <div className="relative">
                                        <Avatar className="h-9 w-9 border border-slate-200">
                                          <AvatarFallback className="bg-indigo-100 text-indigo-700 font-extrabold text-[11px]">{tutor.avatar}</AvatarFallback>
                                        </Avatar>
                                        <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${tutor.active ? "bg-green-500" : "bg-slate-350"}`}></span>
                                      </div>
                                      <div>
                                        <h4 className="font-extrabold text-xs text-slate-900 leading-snug">{tutor.name}</h4>
                                        <span className="text-[10px] font-semibold text-slate-400">{tutor.subject} • {tutor.active ? "Active Now" : "Offline"}</span>
                                      </div>
                                    </div>
                                    <Badge className="bg-indigo-50 text-indigo-700 border-none font-bold text-[9px] px-2 py-0.5 rounded-md">Escrow Secure</Badge>
                                  </div>

                                  {/* Chat Messages Area */}
                                  <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px] bg-slate-50/20">
                                    <div className="text-center py-2">
                                      <span className="text-[9px] text-slate-400 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Escrow Messaging Thread</span>
                                    </div>
                                    
                                    {messages.length === 0 ? (
                                      <p className="text-center text-[10px] text-slate-450 italic py-6">No message history. Type a message below to start chatting.</p>
                                    ) : (
                                      messages.map((m: any, idx: number) => {
                                        const isParent = m.sender === "parent";
                                        return (
                                          <div key={idx} className={`flex ${isParent ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm border ${
                                              isParent
                                                ? "bg-indigo-600 text-white border-indigo-750 rounded-tr-none"
                                                : "bg-white text-slate-800 border-slate-200 rounded-tl-none"
                                            }`}>
                                              <p className="leading-relaxed font-sans">{m.text}</p>
                                              <span className={`text-[8px] block mt-1 text-right ${isParent ? "text-indigo-200" : "text-slate-400"} font-bold`}>
                                                {m.timestamp}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>

                                  {/* Chat Input Area */}
                                  <form onSubmit={handleSendParentMessage} className="p-4 border-t border-slate-150 bg-white">
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="Type your message to educator..."
                                        value={parentNewMessage}
                                        onChange={(e) => setParentNewMessage(e.target.value)}
                                        className="flex-1 border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white"
                                      />
                                      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 rounded-xl shadow-sm">
                                        Send <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                      </Button>
                                    </div>
                                    <span className="text-[9px] text-slate-400 block mt-1.5 font-bold">⚠️ Chats are logged by Platform Admins for escrow release safety audits.</span>
                                  </form>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      ) : (
                        /* Dispute Center View */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Left Column: Escalate Dispute Form */}
                          <div className="lg:col-span-5">
                            <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                              <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                                  <AlertTriangle className="h-4.5 w-4.5 text-rose-500" />
                                  Escalate Escrow Dispute
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  Request a platform admin review and freeze transaction escrow funds.
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-6 pt-0">
                                <form onSubmit={handleCreateDispute} className="space-y-4">
                                  {/* Target Entity */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-bold text-slate-700">Target Tutor or Entity</Label>
                                    <Select value={disputeTarget} onValueChange={(val) => val && setDisputeTarget(val)}>
                                      <SelectTrigger className="border-slate-200 rounded-xl text-xs bg-slate-50">
                                        <SelectValue placeholder="Select target" />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-xl">
                                        <SelectItem value="Mr. Simba Moyo">Mr. Simba Moyo (Private Calculus)</SelectItem>
                                        <SelectItem value="Dr. Albert Sibanda">Dr. Albert Sibanda (Math Cohort)</SelectItem>
                                        <SelectItem value="Mrs. Tariro Ndlovu">Mrs. Tariro Ndlovu (Chemistry)</SelectItem>
                                        <SelectItem value="Platform Support">Platform System / Billing</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Linked Transaction */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-bold text-slate-700">Linked Purchase Transaction</Label>
                                    {(() => {
                                      const options = [
                                        ...bookedCohorts.map(c => ({ id: c.id, label: `${c.title} (${c.classType === "1-on-1" ? "1-on-1" : "Cohort"}) - $${c.price || '45.00'}` })),
                                        ...purchasedResources.map(r => ({ id: r.id, label: `${r.title} (Resource) - $${r.price || '15.00'}` })),
                                        { id: "gen", label: "General Private Booking / Wallet Top-up" }
                                      ];

                                      return (
                                        <Select 
                                          value={disputeTransaction || (options[0]?.label || "")} 
                                          onValueChange={(val) => val && setDisputeTransaction(val)}
                                        >
                                          <SelectTrigger className="border-slate-200 rounded-xl text-xs bg-slate-50">
                                            <SelectValue placeholder="Select class or resource" />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl">
                                            {options.map((opt, idx) => (
                                              <SelectItem key={idx} value={opt.label}>{opt.label}</SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      );
                                    })()}
                                  </div>

                                  {/* Dispute Reason */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-bold text-slate-700">Primary Dispute Reason</Label>
                                    <Select value={disputeReason} onValueChange={(val) => val && setDisputeReason(val)}>
                                      <SelectTrigger className="border-slate-200 rounded-xl text-xs bg-slate-50">
                                        <SelectValue placeholder="Select reason" />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-xl">
                                        <SelectItem value="Missed Slot / Absent Tutor">Missed Slot / Absent Tutor</SelectItem>
                                        <SelectItem value="Poor Teaching Quality">Poor Teaching Quality</SelectItem>
                                        <SelectItem value="Incomplete Course Material">Incomplete Course Material</SelectItem>
                                        <SelectItem value="Billing / Payment Error">Billing / Payment Error</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Desired Resolution */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-bold text-slate-700">Desired Outcome</Label>
                                    <Select value={disputeOutcome} onValueChange={(val) => val && setDisputeOutcome(val)}>
                                      <SelectTrigger className="border-slate-200 rounded-xl text-xs bg-slate-50">
                                        <SelectValue placeholder="Select outcome" />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-xl">
                                        <SelectItem value="Full Refund to Wallet">Full Refund to Platform Wallet</SelectItem>
                                        <SelectItem value="Reschedule Session">Reschedule Class Session</SelectItem>
                                        <SelectItem value="Partial Refund to Wallet">Partial Refund</SelectItem>
                                        <SelectItem value="Platform Support Intervention">Platform Support Intervention</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Refund Amount */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-bold text-slate-700">Requested Refund Amount ($ USD)</Label>
                                    <div className="relative">
                                      <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-extrabold">$</span>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={disputeAmount}
                                        onChange={(e) => setDisputeAmount(e.target.value)}
                                        className="pl-7 border-slate-200 rounded-xl text-xs bg-slate-50"
                                      />
                                    </div>
                                  </div>

                                  {/* Details */}
                                  <div className="space-y-1">
                                    <Label className="text-xs font-bold text-slate-700">Dispute Details & Description</Label>
                                    <textarea
                                      className="flex min-h-[90px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                      value={disputeDescription}
                                      onChange={(e) => setDisputeDescription(e.target.value)}
                                      placeholder="Explain the incident in detail. Include dates, times, and why you are seeking a refund..."
                                    />
                                  </div>

                                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-5 rounded-xl shadow-md flex items-center justify-center gap-2">
                                    <Scale className="h-4 w-4" /> Log Official Escrow Dispute
                                  </Button>
                                </form>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Right Column: Escrow Ledger & Timeline */}
                          <div className="lg:col-span-7 space-y-6">
                            <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                              <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-sm font-black text-slate-950">
                                  Active Disputes & Escrow Ledger
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  Track dispute status, escrow releases, and platform arbitration stages.
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-6 pt-0 space-y-4">
                                {disputesList.length === 0 ? (
                                  <p className="text-xs text-slate-400 font-bold italic text-center py-8">No disputes raised.</p>
                                ) : (
                                  <div className="space-y-2">
                                    {disputesList.map((d: any) => (
                                      <button
                                        key={d.id}
                                        onClick={() => setSelectedDisputeId(d.id)}
                                        className={`w-full flex items-center justify-between p-3.5 border rounded-xl text-left transition-all ${
                                          selectedDisputeId === d.id
                                            ? "bg-slate-50 border-slate-250 shadow-sm"
                                            : "border-slate-100 hover:bg-slate-50/50 hover:border-slate-200"
                                        }`}
                                      >
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-xs text-slate-800">{d.target}</span>
                                            <span className="text-[9px] text-slate-400">• {d.date}</span>
                                          </div>
                                          <p className="text-[10px] text-slate-500 font-medium truncate max-w-[280px]">{d.reason}: {d.transaction}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                          <span className="font-black text-xs text-rose-600 block">${d.amount}</span>
                                          <Badge className={`text-[8px] font-black uppercase shrink-0 border-none ${
                                            d.status === "Dispute Opened"
                                              ? "bg-rose-50 text-rose-700"
                                              : d.status === "Escrow Hold Applied"
                                              ? "bg-amber-50 text-amber-700"
                                              : "bg-indigo-50 text-indigo-700"
                                          }`}>
                                            {d.status}
                                          </Badge>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>

                            {(() => {
                              const dispute = disputesList.find((d: any) => d.id === selectedDisputeId);
                              if (!dispute) return null;

                              return (
                                <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-200">
                                  <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex justify-between items-center">
                                    <div>
                                      <h4 className="text-xs font-black text-slate-900 uppercase">Arbitration Case {dispute.id}</h4>
                                      <span className="text-[10px] text-slate-400 font-bold">{dispute.transaction}</span>
                                    </div>
                                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200 font-black text-[9px]">Held in Escrow</Badge>
                                  </div>
                                  <CardContent className="p-6 space-y-5">
                                    {/* Dispute Info */}
                                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Disputed Tutor</span>
                                        <span className="font-extrabold text-slate-800">{dispute.target}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Reason Category</span>
                                        <span className="font-extrabold text-slate-800">{dispute.reason}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Requested Refund</span>
                                        <span className="font-extrabold text-rose-600">${dispute.amount} USD</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Desired Resolution</span>
                                        <span className="font-extrabold text-slate-800">{dispute.outcome}</span>
                                      </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1 text-xs">
                                      <span className="text-[9px] text-slate-450 font-black uppercase tracking-wider block">Case Description</span>
                                      <p className="text-slate-650 bg-slate-50/30 p-3 rounded-lg border border-slate-100 leading-relaxed font-sans">{dispute.description}</p>
                                    </div>

                                    {/* Timeline */}
                                    <div className="space-y-4">
                                      <span className="text-[9px] text-slate-450 font-black uppercase tracking-wider block">Arbitration Timeline & Milestones</span>
                                      
                                      <div className="relative pl-6 space-y-5 border-l-2 border-slate-150 ml-3">
                                        {dispute.timeline.map((step: any, index: number) => {
                                          return (
                                            <div key={index} className="relative">
                                              {/* Dot indicator */}
                                              <span className={`absolute -left-[31px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-white ${
                                                step.active 
                                                  ? "border-green-500 text-green-500" 
                                                  : "border-slate-300 text-slate-300"
                                              }`}>
                                                {step.active && <Check className="h-2.5 w-2.5 shrink-0 stroke-[3]" />}
                                              </span>
                                              
                                              <div className="space-y-0.5">
                                                <div className="flex justify-between items-center text-xs">
                                                  <span className={`font-extrabold ${step.active ? "text-slate-900" : "text-slate-400"}`}>{step.status}</span>
                                                  <span className="text-[10px] text-slate-400 font-bold">{step.date}</span>
                                                </div>
                                                <p className={`text-[10px] leading-relaxed ${step.active ? "text-slate-500" : "text-slate-400"}`}>{step.description}</p>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Alert Note */}
                                    <div className="p-3 bg-amber-50 border border-amber-250/60 rounded-xl text-amber-900 text-[10px] font-bold flex items-start gap-2.5">
                                      <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                      <div>
                                        <span className="block mb-0.5 font-extrabold">Escrow Guarantee Protected</span>
                                        <span className="text-slate-650 leading-relaxed font-sans block">
                                          Escrow payouts to teachers are automatically locked for up to 48 hours when a dispute is raised. Standard resolution is resolved by admin arbitration within 24 hours.
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* SCHOOL WORKFLOW */}
              {role === "school" && (
                <>
                  {/* Institution Teacher Registry */}
                  {(pathname === "/dashboard" || pathname.endsWith("/educators")) && (
                    <Card id="school-educators" className="border-slate-200/80 bg-white shadow-sm rounded-2xl">
                      <CardHeader className="p-6">
                        <CardTitle className="text-base font-black text-slate-950 flex justify-between items-center">
                          <span>Churchill High School: Onboarded Educators</span>
                          <Button size="xs" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-8 rounded-lg text-[10px]">
                            + Invite Teacher
                          </Button>
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Manage teachers registered under your institution tenant license.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-3">
                          {/* Teacher Item 1 */}
                          <div className="p-3.5 border border-slate-100 rounded-xl flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border border-slate-200">
                                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">AS</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-extrabold text-slate-900">Dr. Albert Sibanda</span>
                                <span className="text-[10px] text-slate-400">Subjects: Mathematics & Chemistry • Form 4-6</span>
                              </div>
                            </div>
                            <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold">5 Classes Scheduled</Badge>
                          </div>

                          {/* Teacher Item 2 */}
                          <div className="p-3.5 border border-slate-100 rounded-xl flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border border-slate-200">
                                <AvatarFallback className="bg-orange-100 text-orange-700 text-xs font-bold">TN</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-extrabold text-slate-900">Mrs. Tariro Ndlovu</span>
                                <span className="text-[10px] text-slate-400">Subjects: Physics • Form 5-6</span>
                              </div>
                            </div>
                            <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold">4 Classes Scheduled</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* License Information (shown in left column when on /license route) */}
                  {pathname.endsWith("/license") && (
                    <Card id="school-license" className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                      <div className="bg-slate-900 p-6 text-white text-center space-y-2">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block">INSTITUTIONAL LICENSE</span>
                        <Building className="h-8 w-8 text-indigo-400 mx-auto" />
                        <h3 className="text-base font-black">Churchill High School</h3>
                        <p className="text-[10px] text-slate-400">Premium School Plan • 450 Seats</p>
                      </div>
                      <CardContent className="p-5 text-xs font-bold text-slate-600 space-y-3">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span>Subscription status</span>
                          <span className="text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span>Next renewal</span>
                          <span className="text-slate-900">June 30, 2026</span>
                        </div>
                        <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold rounded-xl py-5">
                          Download Billing Invoice
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* System Status Panel (shown in left column when on /services route) */}
                  {pathname.endsWith("/services") && (
                    <Card id="school-services" className="border-slate-250/80 bg-white shadow-sm rounded-2xl p-5 space-y-4">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">System Services Status</h4>
                      
                      <div className="space-y-2 text-xs font-semibold text-slate-500">
                        <div className="flex justify-between items-center">
                          <span>Virtual Classroom Server</span>
                          <Badge className="bg-green-100 text-green-700 border-none text-[9px] hover:bg-green-100 font-bold">Online</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>WhatsApp SMS Gateway</span>
                          <Badge className="bg-green-100 text-green-700 border-none text-[9px] hover:bg-green-100 font-bold">Online</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>EcoCash payments Api</span>
                          <Badge className="bg-green-100 text-green-700 border-none text-[9px] hover:bg-green-100 font-bold">Operational</Badge>
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              )}

            </div>

            {/* RIGHT SIDE CONTAINER - ACTIONS & PAYOUT PANEL (4 COLS ON LARGE) */}
            {pathname === "/dashboard" && (
              <div className="lg:col-span-4 space-y-8">
                
                {/* TEACHER SIDEBAR: WhatsApp AI Lesson Prep Assistant & Verification */}
                {role === "teacher" && (
                  <div className="space-y-6">
                    {/* WhatsApp Lesson Prep Copilot */}
                    <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                      <div className="bg-[#075e54] p-6 text-white relative">
                        <div className="absolute right-3 top-3 bg-emerald-500/25 border border-emerald-400/30 px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase">
                          AI PILOT ACTIVE
                        </div>
                        <Bot className="h-9 w-9 text-emerald-250 mb-2" />
                        <span className="text-[9px] font-black text-emerald-200 uppercase tracking-widest block">WHATSAPP AI PREP BOT</span>
                        <h3 className="text-base font-black mt-0.5">Teacher Creator Copilot</h3>
                        <p className="text-[11px] text-emerald-100/90 leading-relaxed mt-1">
                          Dictate schemes of work, brainstorm exam quizzes, or compile curriculum materials by messaging our AI tutor line.
                        </p>
                      </div>
                      <CardContent className="p-5 space-y-4 text-xs">
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                          <span className="text-[9px] font-black text-slate-400 block mb-1">WHATSAPP NUMBER</span>
                          <div className="font-extrabold text-slate-800 text-sm flex items-center justify-between">
                            <span>+263 78 842 1195</span>
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">RECENT WHATSAPP DRAFTS</span>
                          
                          <div className="p-3 border border-slate-100 rounded-xl bg-white space-y-1 shadow-sm">
                            <div className="flex justify-between items-center text-[10px] font-bold text-indigo-600">
                              <span>O-Level Chemistry Quiz</span>
                              <span>May 20</span>
                            </div>
                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                              "Generated 5 MCQ questions on Stoichiometry. Options A-D formatted for ZIMSEC."
                            </p>
                            <div className="pt-2 flex justify-end">
                              <Button 
                                onClick={() => triggerToast("Imported O-Level Chemistry Quiz to active resources!")} 
                                size="xs" 
                                className="h-6 text-[9px] font-black bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-none rounded-lg"
                              >
                                Import to Catalog
                              </Button>
                            </div>
                          </div>

                          <div className="p-3 border border-slate-100 rounded-xl bg-white space-y-1 shadow-sm">
                            <div className="flex justify-between items-center text-[10px] font-bold text-indigo-600">
                              <span>Form 4 Lesson Plan</span>
                              <span>May 19</span>
                            </div>
                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                              "Lesson Plan template on Newton's Laws of Motion. Formatted with CAPS outcomes."
                            </p>
                            <div className="pt-2 flex justify-end">
                              <Button 
                                onClick={() => triggerToast("Imported Form 4 Lesson Plan to active resources!")} 
                                size="xs" 
                                className="h-6 text-[9px] font-black bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-none rounded-lg"
                              >
                                Import to Catalog
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Credentials / Curation Badge */}
                    <Card className="border-slate-200/80 bg-white shadow-sm rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">VERIFIED CREATOR STATUS</h4>
                          <p className="text-[10px] text-slate-400">Background Checked & Credentials Approved</p>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 leading-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
                        🛡️ Verified teachers earn <b>85% commission</b> on resources and live cohorts. Payout transfers are backed by standard platform escrow dispute windows.
                      </div>
                    </Card>
                  </div>
                )}

                {/* LEARNER SIDEBAR: AI Homework solver prompt */}
                {role === "learner" && (
                  <Card id="learner-helper" className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                    <div className="bg-purple-900 p-6 text-white text-center space-y-3">
                      <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest block">WHATSAPP INTERACTION</span>
                      <Bot className="h-10 w-10 text-purple-200 mx-auto" />
                      <h3 className="text-base font-black">AI Homework Companion</h3>
                      <p className="text-[11px] text-purple-200 leading-relaxed">
                        Need help solving a math or science problem? Snap a photo and send it directly to our WhatsApp bot.
                      </p>
                    </div>
                    <CardContent className="p-5 text-center text-xs space-y-4">
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-extrabold text-slate-700">
                        📲 BOT PHONE: +263 78 842 1195
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold py-5 rounded-xl shadow-md">
                        Open WhatsApp Chat
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* PARENT SIDEBAR: Linked child code generator */}
                {role === "parent" && (
                  <Card id="parent-link" className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="p-5">
                      <CardTitle className="text-sm font-black text-slate-900">Add Child profile Link</CardTitle>
                      <CardDescription className="text-xs">
                        Enter the student profile workspace code to link grades.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="scod" className="text-xs font-bold text-slate-700">Student Code</Label>
                        <Input 
                          id="scod"
                          type="text" 
                          placeholder="e.g. L-548-STU"
                          className="border-slate-200 rounded-xl"
                        />
                      </div>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-5 rounded-xl shadow-sm">
                        Validate & Link Student
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* SCHOOL SIDEBAR: License information */}
                {role === "school" && (
                  <Card id="school-license" className="border-slate-200/80 bg-white shadow-sm rounded-2xl overflow-hidden">
                    <div className="bg-slate-900 p-6 text-white text-center space-y-2">
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block">INSTITUTIONAL LICENSE</span>
                      <Building className="h-8 w-8 text-indigo-400 mx-auto" />
                      <h3 className="text-base font-black">Churchill High School</h3>
                      <p className="text-[10px] text-slate-400">Premium School Plan • 450 Seats</p>
                    </div>
                    <CardContent className="p-5 text-xs font-bold text-slate-600 space-y-3">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Subscription status</span>
                        <span className="text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Next renewal</span>
                        <span className="text-slate-900">June 30, 2026</span>
                      </div>
                      <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold rounded-xl py-5">
                        Download Billing Invoice
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Platform Status Panel (Common to all roles) */}
                <Card id="school-services" className="border-slate-250/80 bg-white shadow-sm rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">System Services Status</h4>
                  
                  <div className="space-y-2 text-xs font-semibold text-slate-500">
                    <div className="flex justify-between items-center">
                      <span>Virtual Classroom Server</span>
                      <Badge className="bg-green-100 text-green-700 border-none text-[9px] hover:bg-green-100 font-bold">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>WhatsApp SMS Gateway</span>
                      <Badge className="bg-green-100 text-green-700 border-none text-[9px] hover:bg-green-100 font-bold">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>EcoCash payments Api</span>
                      <Badge className="bg-green-100 text-green-700 border-none text-[9px] hover:bg-green-100 font-bold">Operational</Badge>
                    </div>
                  </div>
                </Card>

              </div>
            )}
          </div>

    {/* Centralized Edit Modal */}
    {editingItem && (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Modal Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Edit {editingItem.type === "cohort" ? "Group Cohort" : editingItem.type === "slot" ? "1-on-1 Availability" : "Digital Resource"}
              </h3>
              <p className="text-[10px] text-slate-450 mt-0.5 font-bold">Modify your offering's details, publishing workflow status, and attachments.</p>
            </div>
            <button 
              onClick={() => setEditingItem(null)}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-150 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-4 text-xs">
            {/* Dynamic Edit Forms based on type */}
            {editingItem.type === "cohort" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Cohort Title</Label>
                  <Input 
                    type="text"
                    value={editingItem.fields.title || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, title: e.target.value } })}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Subject Stream</Label>
                    <Select 
                      value={editingItem.fields.subject} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, subject: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="English">English Literature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Curriculum Target</Label>
                    <Select 
                      value={editingItem.fields.curriculum} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, curriculum: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="ZIMSEC">ZIMSEC Local Syllabus</SelectItem>
                        <SelectItem value="Cambridge">Cambridge CIE Syllabus</SelectItem>
                        <SelectItem value="IEB">IEB CAPS (Matric)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Schedule (Time/Meets)</Label>
                    <Input 
                      type="text"
                      value={editingItem.fields.schedule || ""}
                      onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, schedule: e.target.value } })}
                      className="border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Entry Ticket Fee (USD)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={editingItem.fields.price || ""}
                      onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, price: parseFloat(e.target.value) || 0 } })}
                      className="border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Max Seats Cap</Label>
                    <Input 
                      type="number"
                      value={editingItem.fields.seats || ""}
                      onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, seats: parseInt(e.target.value) || 0 } })}
                      className="border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Delivery Mode</Label>
                    <Select 
                      value={editingItem.fields.deliveryMode || "online"} 
                      onValueChange={(val) => setEditingItem(prev => prev && { 
                        ...prev, 
                        fields: { 
                          ...prev.fields, 
                          deliveryMode: val,
                          location: val === "online" ? "" : prev.fields.location 
                        } 
                      })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue placeholder="Select delivery mode" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="online">Online (Virtual Meetup)</SelectItem>
                        <SelectItem value="offline">Offline (Physical Venue)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(editingItem.fields.deliveryMode || "online") === "offline" && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <Label className="text-xs font-bold text-slate-700">Physical Venue / Address</Label>
                      <Input 
                        type="text"
                        placeholder="e.g. Room 10, Harare Central Academy" 
                        value={editingItem.fields.location || ""}
                        onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, location: e.target.value } })}
                        className="border-slate-200 rounded-xl"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Quick Summary (Mini-Description)</Label>
                  <Input 
                    type="text"
                    value={editingItem.fields.miniDescription || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, miniDescription: e.target.value } })}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Detailed Syllabus Description & Outline</Label>
                  <textarea 
                    rows={4}
                    value={editingItem.fields.description || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, description: e.target.value } })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Bundled Resource Materials & Documents</Label>
                  <MaterialAttachmentManager 
                    attachments={editingItem.fields.attachments || []} 
                    onChange={(newAtts) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, attachments: newAtts } })} 
                  />
                </div>
              </>
            )}

            {editingItem.type === "slot" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Day of the Week</Label>
                    <Select 
                      value={editingItem.fields.day} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, day: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Monday">Mondays</SelectItem>
                        <SelectItem value="Tuesday">Tuesdays</SelectItem>
                        <SelectItem value="Wednesday">Wednesdays</SelectItem>
                        <SelectItem value="Thursday">Thursdays</SelectItem>
                        <SelectItem value="Friday">Fridays</SelectItem>
                        <SelectItem value="Saturday">Saturdays</SelectItem>
                        <SelectItem value="Sunday">Sundays</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Time Block (CAT)</Label>
                    <Select 
                      value={editingItem.fields.time} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, time: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="08:00 CAT">08:00 CAT (Morning)</SelectItem>
                        <SelectItem value="09:30 CAT">09:30 CAT</SelectItem>
                        <SelectItem value="11:00 CAT">11:00 CAT</SelectItem>
                        <SelectItem value="13:00 CAT">13:00 CAT (Afternoon)</SelectItem>
                        <SelectItem value="14:30 CAT">14:30 CAT</SelectItem>
                        <SelectItem value="16:00 CAT">16:00 CAT (Late Afternoon)</SelectItem>
                        <SelectItem value="17:30 CAT">17:30 CAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Subject Stream</Label>
                    <Select 
                      value={editingItem.fields.subject} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, subject: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="English">English Literature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Session Subject Summary (Mini-Description)</Label>
                  <Input 
                    type="text"
                    value={editingItem.fields.miniDescription || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, miniDescription: e.target.value } })}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Detailed Student Guidance & Goals</Label>
                  <Input 
                    type="text"
                    value={editingItem.fields.description || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, description: e.target.value } })}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Homework & Preparatory Attachments</Label>
                  <MaterialAttachmentManager 
                    attachments={editingItem.fields.attachments || []} 
                    onChange={(newAtts) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, attachments: newAtts } })} 
                  />
                </div>
              </>
            )}

            {editingItem.type === "resource" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Resource Package Title</Label>
                  <Input 
                    type="text"
                    value={editingItem.fields.title || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, title: e.target.value } })}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Curriculum Target</Label>
                    <Select 
                      value={editingItem.fields.curriculum} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, curriculum: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="ZIMSEC">ZIMSEC Local Syllabus</SelectItem>
                        <SelectItem value="Cambridge">Cambridge CIE Syllabus</SelectItem>
                        <SelectItem value="IEB">IEB CAPS (Matric)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Target Audience</Label>
                    <Select 
                      value={editingItem.fields.audience} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, audience: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Students">Students Only (Worksheets, Revision)</SelectItem>
                        <SelectItem value="Teachers">Teachers Only (Lesson Plans, Rubrics)</SelectItem>
                        <SelectItem value="Both">Both Students & Teachers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Resource Category Type</Label>
                    <Select 
                      value={editingItem.fields.type} 
                      onValueChange={(val) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, type: val } })}
                    >
                      <SelectTrigger className="border-slate-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="PDF Notes">PDF Revision Notes</SelectItem>
                        <SelectItem value="Lesson Plan Template">Lesson Plan & Schemes</SelectItem>
                        <SelectItem value="Worksheet">Printable Worksheets</SelectItem>
                        <SelectItem value="Exam Prep Slides">Exam Board Revision Slides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">USD Price ($)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={editingItem.fields.price || ""}
                      onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, price: parseFloat(e.target.value) || 0 } })}
                      className="border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Downloads Count (Read-only)</Label>
                    <Input 
                      type="number"
                      disabled
                      value={editingItem.fields.downloads || 0}
                      className="border-slate-200 rounded-xl bg-slate-50 cursor-not-allowed font-semibold text-slate-550"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Quick Resource Summary (Mini-Description)</Label>
                  <Input 
                    type="text"
                    value={editingItem.fields.miniDescription || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, miniDescription: e.target.value } })}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Detailed Resource & Package Contents Description</Label>
                  <textarea 
                    rows={4}
                    value={editingItem.fields.description || ""}
                    onChange={(e) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, description: e.target.value } })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Syllabus Files & Bundle Downloads</Label>
                  <MaterialAttachmentManager 
                    attachments={editingItem.fields.attachments || []} 
                    onChange={(newAtts) => setEditingItem(prev => prev && { ...prev, fields: { ...prev.fields, attachments: newAtts } })} 
                  />
                </div>
              </>
            )}

            {/* Status selection field (Common workflow state) */}
            <div className="space-y-2.5 border-t border-slate-100 pt-5">
              <Label className="text-xs font-black text-slate-700 uppercase tracking-wide">Workflow Publication Status</Label>
              <div className="flex gap-2">
                {[
                  { val: "draft", label: "Draft", desc: "Hidden from marketplace", color: "hover:bg-amber-50 active:bg-amber-100 border-amber-200", activeColor: "bg-amber-50 border-amber-300 text-amber-700 font-extrabold shadow-sm" },
                  { val: "published", label: "Live (Published)", desc: "Visible in student search", color: "hover:bg-emerald-50 active:bg-emerald-100 border-emerald-250", activeColor: "bg-emerald-50 border-emerald-300 text-emerald-700 font-extrabold shadow-sm" },
                  { val: "archived", label: "Archived", desc: "Delisted and frozen", color: "hover:bg-slate-50 active:bg-slate-100 border-slate-350", activeColor: "bg-slate-100 border-slate-400 text-slate-700 font-extrabold shadow-sm" }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => {
                      setEditingItem(prev => prev && {
                        ...prev,
                        fields: { ...prev.fields, publishStatus: opt.val }
                      });
                    }}
                    className={`flex-1 p-2.5 rounded-xl border text-left transition-all duration-150 ${
                      (editingItem.fields.publishStatus || "published") === opt.val
                        ? opt.activeColor
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-[11px] font-bold">{opt.label}</div>
                    <div className="text-[9px] opacity-80 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
            <Button 
              onClick={() => setEditingItem(null)}
              variant="outline"
              className="border-slate-200 text-slate-700 font-extrabold px-5 py-2 rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveChanges}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-2 rounded-xl shadow-sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    )}
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-500">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
