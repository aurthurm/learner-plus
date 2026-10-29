"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  Calendar, 
  ArrowLeft, 
  Smartphone, 
  Check, 
  Loader2, 
  Clock, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Users,
  Download,
  FileText,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Tutors mock data
interface Tutor {
  id: string;
  name: string;
  avatar: string;
  fallback: string;
  subject: string;
  topic: string;
  curricula: string[];
  rate: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  qualification: string;
  verified: boolean;
  slots: string[];
}

const TUTORS_DATA: Tutor[] = [
  {
    id: "tut-1",
    name: "Dr. Albert Sibanda",
    avatar: "",
    fallback: "AS",
    subject: "Mathematics",
    topic: "Pure Calculus & Algebra",
    curricula: ["Cambridge", "ZIMSEC"],
    rate: 15.00,
    rating: 4.9,
    reviewsCount: 84,
    bio: "Ph.D. in Applied Mathematics with over 15 years experience training students for competitive exams, O-Levels, and high-tier Cambridge A-Levels.",
    qualification: "Ph.D. in Math (UZ), Certified Examiner",
    verified: true,
    slots: ["09:00 CAT", "11:30 CAT", "14:30 CAT", "16:00 CAT"]
  },
  {
    id: "tut-2",
    name: "Mrs. Tariro Ndlovu",
    avatar: "",
    fallback: "TN",
    subject: "Chemistry",
    topic: "Stoichiometry & Organic Chemistry",
    curricula: ["ZIMSEC", "IEB"],
    rate: 12.00,
    rating: 5.0,
    reviewsCount: 42,
    bio: "Passionate high school chemistry tutor specializing in converting abstract laboratory formulas into simple, visual concepts.",
    qualification: "B.Sc. Chemistry & Education (Midlands)",
    verified: true,
    slots: ["10:00 CAT", "13:00 CAT", "15:30 CAT"]
  },
  {
    id: "tut-3",
    name: "Mr. Simba Moyo",
    avatar: "",
    fallback: "SM",
    subject: "Physics",
    topic: "Classical Mechanics & Electromagnetism",
    curricula: ["Cambridge"],
    rate: 18.00,
    rating: 4.8,
    reviewsCount: 56,
    bio: "Specialist Physics instructor guiding students through Cambridge AS/A-Level revisions and university entrance setups.",
    qualification: "M.Sc. Physics (NUST), ex-Falcon College Tutor",
    verified: true,
    slots: ["08:30 CAT", "11:00 CAT", "15:00 CAT", "17:30 CAT"]
  },
  {
    id: "tut-4",
    name: "Mrs. Chipo Chidziva",
    avatar: "",
    fallback: "CC",
    subject: "English",
    topic: "Creative Writing & Literature Analysis",
    curricula: ["Cambridge", "ZIMSEC", "IEB"],
    rate: 10.00,
    rating: 4.7,
    reviewsCount: 31,
    bio: "Dedicated language arts educator focused on creative expression, grammar mastery, and critical analysis of set books.",
    qualification: "B.A. English & Linguistics (UZ)",
    verified: false,
    slots: ["09:30 CAT", "14:00 CAT", "16:30 CAT"]
  }
];

const defaultCohorts = [
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
    description: "Advanced study group covering differential and integral calculus, Taylor series, and complex integration techniques for Cambridge A-Level math stream.",
    miniDescription: "A-Level Calculus theorems & application review.",
    attachments: [
      { id: "att-c1", title: "Integration Formulas Reference Guide", fileName: "integration_formulas_reference_guide.pdf", fileSize: "3.1 MB", order: 1 }
    ]
  }
];

const defaultResources = [
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
];

const defaultSlots = [
  { 
    id: "av-1", 
    day: "Tuesday", 
    time: "09:00 CAT", 
    subject: "Mathematics", 
    status: "Booked (Tinashe Mutasa)",
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
    description: "Private session covering circular motion dynamics.",
    miniDescription: "Physics tutoring slot - Chipo.",
    attachments: []
  }
];

function TutorsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "learner";
  const [selectedChild, setSelectedChild] = useState("Tinashe Mutasa");

  // Active Category Tab
  const [marketplaceTab, setMarketplaceTab] = useState<"tutors" | "cohorts" | "resources">("tutors");

  // Sync state with localstorage
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [teacherBalance, setTeacherBalance] = useState(250.00);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [bookedCohorts, setBookedCohorts] = useState<any[]>([]);
  const [purchasedResources, setPurchasedResources] = useState<any[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");

  // Detail Modal view state
  const [viewDetailItem, setViewDetailItem] = useState<{ type: "cohort" | "slot" | "resource"; item: any } | null>(null);

  // Unified Checkout Purchase Item state
  const [purchaseItem, setPurchaseItem] = useState<{
    type: "tutor" | "cohort" | "resource";
    id: string;
    title: string;
    price: number;
    detail?: any;
  } | null>(null);

  // Sync search keyword from query parameter on mount
  useEffect(() => {
    const q = searchParams.get("search");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCohorts = localStorage.getItem("leaner_activeCohorts");
      if (savedCohorts) {
        try { setCohorts(JSON.parse(savedCohorts)); } catch (e) {}
      } else {
        setCohorts(defaultCohorts);
        localStorage.setItem("leaner_activeCohorts", JSON.stringify(defaultCohorts));
      }

      const savedResources = localStorage.getItem("leaner_uploadedResources");
      if (savedResources) {
        try { setResources(JSON.parse(savedResources)); } catch (e) {}
      } else {
        setResources(defaultResources);
        localStorage.setItem("leaner_uploadedResources", JSON.stringify(defaultResources));
      }

      const savedSlots = localStorage.getItem("leaner_availSlots");
      if (savedSlots) {
        try { setSlots(JSON.parse(savedSlots)); } catch (e) {}
      } else {
        setSlots(defaultSlots);
        localStorage.setItem("leaner_availSlots", JSON.stringify(defaultSlots));
      }

      const savedBalance = localStorage.getItem("leaner_teacherBalance");
      if (savedBalance) {
        setTeacherBalance(parseFloat(savedBalance) || 250.00);
      } else {
        localStorage.setItem("leaner_teacherBalance", "250.00");
      }

      const savedTx = localStorage.getItem("leaner_transactions");
      if (savedTx) {
        try { setTransactions(JSON.parse(savedTx)); } catch (e) {}
      } else {
        const defaultTx = [
          { id: "tx-1", date: "2026-05-19", type: "Sale: Resource", desc: "Form 3 Lesson Plan Schemes sold to Churchill Teacher", amount: 12.50, status: "Completed" },
          { id: "tx-2", date: "2026-05-18", type: "Sale: Cohort", desc: "Tinashe Sibanda booked O-Level Math cohort", amount: 8.00, status: "Escrow Released" },
          { id: "tx-3", date: "2026-05-17", type: "Payout", desc: "Withdrawal to EcoCash wallet +263 774819054", amount: -50.00, status: "Transferred" }
        ];
        setTransactions(defaultTx);
        localStorage.setItem("leaner_transactions", JSON.stringify(defaultTx));
      }

      const savedBooked = localStorage.getItem("bookedCohorts");
      if (savedBooked) {
        try { setBookedCohorts(JSON.parse(savedBooked)); } catch (e) {}
      }

      const savedPurchased = localStorage.getItem("purchasedResources");
      if (savedPurchased) {
        try { setPurchasedResources(JSON.parse(savedPurchased)); } catch (e) {}
      }

      setIsDataLoaded(true);
    }
  }, []);

  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedCurriculum, setSelectedCurriculum] = useState("All");
  const [selectedRateRange, setSelectedRateRange] = useState("All");

  // Booking Modal States (Checkout)
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1); // 1: Date/Time, 2: Payment Selector, 3: PIN Simulation, 4: Success
  const [bookingDate, setBookingDate] = useState("2026-05-25");
  const [bookingTime, setBookingTime] = useState("");
  const [paymentProvider, setPaymentProvider] = useState<"ecocash" | "innbucks">("ecocash");
  const [mobileNumber, setMobileNumber] = useState("+263 77 ");
  const [isProcessingUSSD, setIsProcessingUSSD] = useState(false);
  const [ussdTimer, setUssdTimer] = useState(15);

  // Filter Logic
  const filteredTutors = TUTORS_DATA.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutor.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === "All" || tutor.subject === selectedSubject;
    
    const matchesCurriculum = selectedCurriculum === "All" || tutor.curricula.includes(selectedCurriculum);
    
    let matchesRate = true;
    if (selectedRateRange === "under-12") {
      matchesRate = tutor.rate <= 12;
    } else if (selectedRateRange === "over-12") {
      matchesRate = tutor.rate > 12;
    }

    return matchesSearch && matchesSubject && matchesCurriculum && matchesRate;
  });

  const filteredCohorts = cohorts.filter((cohort) => {
    if (cohort.publishStatus !== "published") return false;

    const matchesSearch = cohort.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cohort.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cohort.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === "All" || cohort.subject === selectedSubject;
    
    const matchesCurriculum = selectedCurriculum === "All" || cohort.curriculum === selectedCurriculum;
    
    let matchesRate = true;
    if (selectedRateRange === "under-12") {
      matchesRate = cohort.price <= 12;
    } else if (selectedRateRange === "over-12") {
      matchesRate = cohort.price > 12;
    }

    return matchesSearch && matchesSubject && matchesCurriculum && matchesRate;
  });

  const filteredResources = resources.filter((res) => {
    if (res.publishStatus !== "published") return false;

    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === "All" || (res.subject && res.subject === selectedSubject) || (res.title.toLowerCase().includes(selectedSubject.toLowerCase()));
    
    const matchesCurriculum = selectedCurriculum === "All" || res.curriculum === selectedCurriculum;
    
    let matchesRate = true;
    if (selectedRateRange === "under-12") {
      matchesRate = res.price <= 12;
    } else if (selectedRateRange === "over-12") {
      matchesRate = res.price > 12;
    }

    return matchesSearch && matchesSubject && matchesCurriculum && matchesRate;
  });

  // Countdown timer for USSD PIN Approval
  useEffect(() => {
    let interval: any;
    if (isProcessingUSSD && ussdTimer > 0) {
      interval = setInterval(() => {
        setUssdTimer((prev) => prev - 1);
      }, 1000);
    } else if (ussdTimer === 0 && isProcessingUSSD) {
      handleUSSDApprove();
    }
    return () => clearInterval(interval);
  }, [isProcessingUSSD, ussdTimer]);

  const handleOpenBooking = (tutor: Tutor) => {
    const tutorSlots = slots.filter(s => s.publishStatus === "published" && s.status === "Available" && s.subject === tutor.subject);
    const availableSlots = tutorSlots.length > 0 ? tutorSlots.map(s => s.time) : tutor.slots;
    const initialTime = availableSlots[0] || "";

    setBookingDate("2026-05-25");
    setBookingTime(initialTime);
    setPaymentProvider("ecocash");
    setMobileNumber(paymentProvider === "ecocash" ? "+263 77 " : "+263 78 ");
    setBookingStep(1);

    setPurchaseItem({
      type: "tutor",
      id: tutor.id,
      title: `1-on-1 with ${tutor.name}`,
      price: tutor.rate,
      detail: {
        tutorName: tutor.name,
        subject: tutor.subject,
        topic: tutor.topic,
        curriculum: tutor.curricula[0],
        rating: tutor.rating.toString(),
        availableSlots: availableSlots,
        slotId: tutorSlots.find(s => s.time === initialTime)?.id || tutorSlots[0]?.id || null
      }
    });
  };

  const handleOpenCohortBooking = (cohort: any) => {
    setPaymentProvider("ecocash");
    setMobileNumber("+263 77 ");
    setBookingStep(2);

    setPurchaseItem({
      type: "cohort",
      id: cohort.id,
      title: cohort.title,
      price: cohort.price,
      detail: {
        tutorName: "Dr. Albert Sibanda",
        subject: cohort.subject,
        topic: cohort.title,
        curriculum: cohort.curriculum,
        meets: cohort.schedule
      }
    });
  };

  const handleOpenResourceBooking = (res: any) => {
    setPaymentProvider("ecocash");
    setMobileNumber("+263 77 ");
    setBookingStep(2);

    setPurchaseItem({
      type: "resource",
      id: res.id,
      title: res.title,
      price: res.price,
      detail: {
        category: res.type,
        curriculum: res.curriculum,
        audience: res.audience,
        attachmentsCount: res.attachments?.length || 0,
        attachments: res.attachments || []
      }
    });
  };

  const handleNextStep = () => {
    if (bookingStep === 1) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      setBookingStep(3);
      setIsProcessingUSSD(true);
      setUssdTimer(15);
    }
  };

  const handleUSSDApprove = () => {
    setIsProcessingUSSD(false);
    if (!purchaseItem) return;

    const dateStr = new Date().toISOString().split("T")[0];
    const newTxId = `tx-${Date.now()}`;
    let newTxDesc = "";
    let newBalance = teacherBalance;

    const buyerName = role === "parent" ? "Mrs. Chipo Chidziva" : "Tinashe Mutasa";
    const targetChild = role === "parent" ? selectedChild : "Tinashe Mutasa";

    if (purchaseItem.type === "tutor") {
      newTxDesc = role === "parent"
        ? `${buyerName} booked 1-on-1 slot: ${purchaseItem.title} for ${targetChild}`
        : `${buyerName} booked 1-on-1 slot: ${purchaseItem.title}`;
      newBalance += purchaseItem.price;

      if (purchaseItem.detail.slotId) {
        const updatedSlots = slots.map(s => 
          s.id === purchaseItem.detail.slotId ? { ...s, status: `Booked (${targetChild})` } : s
        );
        setSlots(updatedSlots);
        localStorage.setItem("leaner_availSlots", JSON.stringify(updatedSlots));
      }

      const newBooking = {
        id: purchaseItem.detail.slotId,
        classType: "1-on-1",
        tutorName: purchaseItem.detail.tutorName,
        subject: purchaseItem.detail.subject,
        topic: purchaseItem.detail.topic,
        curriculum: purchaseItem.detail.curriculum,
        date: bookingDate,
        time: bookingTime,
        tutorRating: purchaseItem.detail.rating,
        bookedAt: new Date().toISOString(),
        childName: targetChild
      };
      const updatedBooked = [...bookedCohorts, newBooking];
      setBookedCohorts(updatedBooked);
      localStorage.setItem("bookedCohorts", JSON.stringify(updatedBooked));

    } else if (purchaseItem.type === "cohort") {
      newTxDesc = role === "parent"
        ? `${buyerName} bought "${purchaseItem.title}" cohort seat for ${targetChild}`
        : `${buyerName} joined "${purchaseItem.title}" group cohort`;
      newBalance += purchaseItem.price;

      const updatedCohorts = cohorts.map(c => 
        c.id === purchaseItem.id ? { ...c, registeredCount: (c.registeredCount || 0) + 1 } : c
      );
      setCohorts(updatedCohorts);
      localStorage.setItem("leaner_activeCohorts", JSON.stringify(updatedCohorts));

      const newBooking = {
        id: purchaseItem.id,
        classType: "cohort",
        tutorName: purchaseItem.detail.tutorName,
        subject: purchaseItem.detail.subject,
        topic: purchaseItem.detail.topic || purchaseItem.title,
        curriculum: purchaseItem.detail.curriculum,
        date: "Saturdays",
        time: purchaseItem.detail.meets,
        tutorRating: "4.9",
        bookedAt: new Date().toISOString(),
        childName: targetChild
      };
      const updatedBooked = [...bookedCohorts, newBooking];
      setBookedCohorts(updatedBooked);
      localStorage.setItem("bookedCohorts", JSON.stringify(updatedBooked));

    } else if (purchaseItem.type === "resource") {
      newTxDesc = role === "parent"
        ? `${buyerName} bought study pack: "${purchaseItem.title}" for ${targetChild}`
        : `${buyerName} bought study pack: "${purchaseItem.title}"`;
      newBalance += purchaseItem.price;

      const updatedResources = resources.map(r => 
        r.id === purchaseItem.id ? { 
          ...r, 
          downloads: (r.downloads || 0) + 1, 
          revenue: (r.revenue || 0) + purchaseItem.price 
        } : r
      );
      setResources(updatedResources);
      localStorage.setItem("leaner_uploadedResources", JSON.stringify(updatedResources));

      const newPurchased = {
        id: purchaseItem.id,
        title: purchaseItem.title,
        curriculum: purchaseItem.detail.curriculum,
        type: purchaseItem.detail.category,
        attachments: purchaseItem.detail.attachments || [],
        childName: targetChild
      };
      const updatedPurchased = [...purchasedResources, newPurchased];
      setPurchasedResources(updatedPurchased);
      localStorage.setItem("purchasedResources", JSON.stringify(updatedPurchased));
    }

    setTeacherBalance(newBalance);
    localStorage.setItem("leaner_teacherBalance", newBalance.toFixed(2));

    const newTxObj = {
      id: newTxId,
      date: dateStr,
      type: purchaseItem.type === "resource" ? "Sale: Resource" : purchaseItem.type === "cohort" ? "Sale: Cohort" : "Sale: 1-on-1",
      desc: newTxDesc,
      amount: purchaseItem.price,
      status: purchaseItem.type === "resource" ? "Completed" : "Escrow Released"
    };
    const updatedTxList = [newTxObj, ...transactions];
    setTransactions(updatedTxList);
    localStorage.setItem("leaner_transactions", JSON.stringify(updatedTxList));

    setBookingStep(4);
  };

  const handleCloseModal = () => {
    setPurchaseItem(null);
    setBookingStep(1);
    setIsProcessingUSSD(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* Top Header Navigation */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md h-16 flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              L
            </span>
            <span className="text-base font-black tracking-tight text-slate-900">
              Leaner
            </span>
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Tutor Marketplace</span>
        </div>

        <Link href={`/dashboard?role=${role}`}>
          <Button variant="ghost" className="text-xs font-extrabold text-slate-600 flex items-center gap-1">
            Go to Dashboard <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </header>

      {/* Marketplace Category Selector */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex gap-6 overflow-x-auto">
          <button
            onClick={() => setMarketplaceTab("tutors")}
            className={`py-4 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${marketplaceTab === "tutors" ? "border-indigo-650 text-indigo-650 border-indigo-650" : "border-transparent text-slate-450 hover:text-slate-700"}`}
          >
            🤝 1-on-1 Tutoring
          </button>
          <button
            onClick={() => setMarketplaceTab("cohorts")}
            className={`py-4 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${marketplaceTab === "cohorts" ? "border-indigo-650 text-indigo-650 border-indigo-650" : "border-transparent text-slate-450 hover:text-slate-700"}`}
          >
            🎓 Group Cohorts
          </button>
          <button
            onClick={() => setMarketplaceTab("resources")}
            className={`py-4 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${marketplaceTab === "resources" ? "border-indigo-650 text-indigo-650 border-indigo-650" : "border-transparent text-slate-450 hover:text-slate-700"}`}
          >
            📚 Study Packs Store
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Filter Console */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Filter className="h-4 w-4 text-indigo-600" /> Filters
              </span>
              <button 
                onClick={() => {
                  setSelectedSubject("All");
                  setSelectedCurriculum("All");
                  setSelectedRateRange("All");
                  setSearchQuery("");
                }}
                className="text-[10px] text-slate-400 hover:text-slate-800 font-bold uppercase transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">
                {marketplaceTab === "tutors" ? "Tutor Search" : marketplaceTab === "cohorts" ? "Cohort Search" : "Study Pack Search"}
              </Label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
                <Input 
                  placeholder={marketplaceTab === "tutors" ? "e.g. Calculus, electromagnetism" : marketplaceTab === "cohorts" ? "e.g. Math, Chemistry Cohort" : "e.g. Past papers, Revision pack"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-slate-200 rounded-xl text-xs h-9"
                />
              </div>
            </div>

            {/* Subject Filters */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Subject Stream</Label>
              <Select value={selectedSubject} onValueChange={(val) => val && setSelectedSubject(val)}>
                <SelectTrigger className="border-slate-200 rounded-xl text-xs h-9">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="All">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Curriculum Filters */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Curriculum Target</Label>
              <Select value={selectedCurriculum} onValueChange={(val) => val && setSelectedCurriculum(val)}>
                <SelectTrigger className="border-slate-200 rounded-xl text-xs h-9">
                  <SelectValue placeholder="All Curricula" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="All">All Curricula</SelectItem>
                  <SelectItem value="Cambridge">Cambridge CIE</SelectItem>
                  <SelectItem value="ZIMSEC">ZIMSEC Local Board</SelectItem>
                  <SelectItem value="IEB">IEB CAPS Matric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">
                {marketplaceTab === "resources" ? "One-off Pricing (USD)" : "Hourly / Seat Rate (USD)"}
              </Label>
              <Select value={selectedRateRange} onValueChange={(val) => val && setSelectedRateRange(val)}>
                <SelectTrigger className="border-slate-200 rounded-xl text-xs h-9">
                  <SelectValue placeholder="All Pricing" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="All">All Price Ranges</SelectItem>
                  <SelectItem value="under-12">Under $12 / item</SelectItem>
                  <SelectItem value="over-12">Over $12 / item</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Right Side Cards Directory */}
        <main className="lg:col-span-3 space-y-6">

          {/* 1. TUTORS TAB */}
          {marketplaceTab === "tutors" && (
            <>
              <div className="flex justify-between items-center px-1">
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-tight">Verified Curriculum Instructors</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Showing {filteredTutors.length} tutors corresponding to your selectors.</p>
                </div>
              </div>

              {filteredTutors.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-slate-200 bg-white rounded-2xl text-center space-y-4">
                  <span className="text-3xl block">🔍</span>
                  <h4 className="font-extrabold text-sm text-slate-900">No Tutors Match Search Criteria</h4>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">Try clearing selected curriculum/rate filters or change the search query keywords.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTutors.map((tutor) => (
                    <Card key={tutor.id} className="border-slate-200/80 bg-white shadow-sm rounded-2xl flex flex-col justify-between overflow-hidden hover:shadow-md transition-all">
                      <CardHeader className="p-5 flex flex-row justify-between items-start gap-4">
                        <div className="flex items-start gap-3.5">
                          <Avatar className="h-12 w-12 border border-slate-100">
                            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-extrabold">{tutor.fallback}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-black text-sm text-slate-900 leading-snug">{tutor.name}</h3>
                              {tutor.verified && (
                                <Badge className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[8px] px-1 font-bold py-0 rounded">
                                  VERIFIED
                                </Badge>
                              )}
                            </div>
                            <span className="text-[10px] text-indigo-650 font-extrabold block mt-0.5">{tutor.subject} • {tutor.topic}</span>
                            <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{tutor.qualification}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-slate-900 block leading-tight">${tutor.rate.toFixed(2)}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">per hour</span>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 text-xs text-slate-500 leading-relaxed font-medium space-y-4">
                        <p>{tutor.bio}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tutor.curricula.map((curr) => (
                            <Badge key={curr} variant="outline" className="border-slate-200 bg-slate-50/50 text-[9px] font-bold text-slate-600 rounded-md">
                              {curr} Syllabus
                            </Badge>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 pt-0 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>{tutor.rating}</span>
                          <span className="text-slate-400">({tutor.reviewsCount} reviews)</span>
                        </div>
                        <Button 
                          onClick={() => handleOpenBooking(tutor)}
                          className="bg-indigo-655 hover:bg-indigo-600 text-white font-extrabold text-xs h-9 px-4 rounded-xl shadow-sm"
                        >
                          Book Lesson
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 2. GROUP COHORTS TAB */}
          {marketplaceTab === "cohorts" && (
            <>
              <div className="flex justify-between items-center px-1">
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-tight">Active Live Group Cohorts</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Showing {filteredCohorts.length} cohorts corresponding to your selectors.</p>
                </div>
              </div>

              {filteredCohorts.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-slate-200 bg-white rounded-2xl text-center space-y-4">
                  <span className="text-3xl block">🎓</span>
                  <h4 className="font-extrabold text-sm text-slate-900">No Group Cohorts Match Search Criteria</h4>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">Try clearing selected curriculum/rate filters or change the search query keywords.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCohorts.map((cohort) => {
                    const seatsLeft = (cohort.seats || 25) - (cohort.registeredCount || 0);
                    return (
                      <Card key={cohort.id} className="border-slate-200/80 bg-white shadow-sm rounded-2xl flex flex-col justify-between overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="p-5 pb-3">
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className="bg-indigo-50 border border-indigo-150 text-indigo-750 text-[9px] font-extrabold rounded-md px-1.5 py-0.5 uppercase">
                                  {cohort.subject}
                                </Badge>
                                <Badge variant="outline" className="border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-600 rounded-md">
                                  {cohort.curriculum} Syllabus
                                </Badge>
                              </div>
                              <h3 className="font-black text-sm text-slate-900 leading-snug mt-1.5">{cohort.title}</h3>
                              <span className="text-[10px] text-slate-450 font-bold block">Taught by Dr. Albert Sibanda</span>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-black text-indigo-650 block leading-tight">${cohort.price.toFixed(2)}</span>
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">per student</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-5 pt-0 pb-4 text-xs text-slate-500 font-medium space-y-4 flex-grow">
                          <p className="line-clamp-2 leading-relaxed">{cohort.description}</p>
                          
                          <div className="grid grid-cols-2 gap-3 bg-slate-50/50 border border-slate-100 p-3 rounded-xl text-[10px] font-bold text-slate-650">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                              {cohort.schedule}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              {seatsLeft > 0 ? `${seatsLeft} seats left` : "Cohort full"}
                            </span>
                          </div>
                        </CardContent>

                        <CardFooter className="p-5 pt-0 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center gap-4 shrink-0">
                          <Button 
                            variant="outline"
                            onClick={() => setViewDetailItem({ type: "cohort", item: cohort })}
                            className="border-slate-250 hover:bg-slate-100 hover:text-slate-800 font-extrabold text-[10px] h-9 px-3 rounded-xl transition-all"
                          >
                            View Outlines
                          </Button>
                          <Button 
                            onClick={() => handleOpenCohortBooking(cohort)}
                            className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold text-xs h-9 px-4 rounded-xl shadow-sm"
                          >
                            Join Cohort
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* 3. DIGITAL STUDY PACKS TAB */}
          {marketplaceTab === "resources" && (
            <>
              <div className="flex justify-between items-center px-1">
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-tight">Digital Syllabus Revision Store</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Showing {filteredResources.length} packages corresponding to your selectors.</p>
                </div>
              </div>

              {filteredResources.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-slate-200 bg-white rounded-2xl text-center space-y-4">
                  <span className="text-3xl block">📚</span>
                  <h4 className="font-extrabold text-sm text-slate-900">No Study Packs Match Search Criteria</h4>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">Try clearing selected curriculum/rate filters or change the search query keywords.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.map((res) => (
                    <Card key={res.id} className="border-slate-200/80 bg-white shadow-sm rounded-2xl flex flex-col justify-between overflow-hidden hover:shadow-md transition-all">
                      <CardHeader className="p-5 pb-3">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className="bg-emerald-50 border border-emerald-150 text-emerald-700 text-[9px] font-extrabold rounded-md px-1.5 py-0.5 uppercase">
                                {res.type}
                              </Badge>
                              <Badge variant="outline" className="border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-600 rounded-md">
                                {res.curriculum} Syllabus
                              </Badge>
                            </div>
                            <h3 className="font-black text-sm text-slate-900 leading-snug mt-1.5">{res.title}</h3>
                            <span className="text-[10px] text-slate-450 font-bold block">Resource for {res.audience}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-black text-slate-900 block leading-tight">${res.price.toFixed(2)}</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">one-off pay</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 pb-4 text-xs text-slate-500 font-medium space-y-4 flex-grow">
                        <p className="line-clamp-2 leading-relaxed">{res.description}</p>
                        
                        <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-100 p-3 rounded-xl text-[10px] font-bold text-slate-650">
                          <span className="flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                            {res.attachments?.length || 0} Files inside package
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1.5">
                            <Download className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                            {res.downloads || 0} Downloads
                          </span>
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 pt-0 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center gap-4 shrink-0">
                        <Button 
                          variant="outline"
                          onClick={() => setViewDetailItem({ type: "resource", item: res })}
                          className="border-slate-250 hover:bg-slate-100 hover:text-slate-800 font-extrabold text-[10px] h-9 px-3 rounded-xl transition-all"
                        >
                          View Package
                        </Button>
                        <Button 
                          onClick={() => handleOpenResourceBooking(res)}
                          className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold text-xs h-9 px-4 rounded-xl shadow-sm"
                        >
                          Buy Pack
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

        </main>
      </div>

      {/* Dynamic Detail Viewer Modal */}
      {viewDetailItem && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden animate-zoom-in flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div>
                <span className="text-[9px] font-black text-indigo-650 uppercase tracking-widest block mb-0.5">
                  {viewDetailItem.type === "cohort" ? "Group Cohort Outline" : "Digital Study Pack Info"}
                </span>
                <h3 className="font-black text-sm text-slate-900 leading-snug">
                  {viewDetailItem.item.title}
                </h3>
              </div>
              <button 
                onClick={() => setViewDetailItem(null)}
                className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center font-bold text-slate-400 hover:text-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed flex-grow">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide block">Outline Summary</span>
                <p className="font-extrabold text-slate-800 text-xs">
                  {viewDetailItem.item.miniDescription}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide block">Full Description</span>
                <p className="font-medium whitespace-pre-wrap">
                  {viewDetailItem.item.description || "No full description provided."}
                </p>
              </div>

              {/* Specific metadata based on type */}
              {viewDetailItem.type === "cohort" && (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Syllabus Subject</span>
                    <span className="text-slate-900 text-xs font-black">{viewDetailItem.item.subject} ({viewDetailItem.item.curriculum})</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Meets Schedule</span>
                    <span className="text-slate-900 text-xs font-black">{viewDetailItem.item.schedule}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Price / Student</span>
                    <span className="text-slate-900 text-xs font-black">${viewDetailItem.item.price.toFixed(2)} USD</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Cap Limit</span>
                    <span className="text-slate-900 text-xs font-black">{(viewDetailItem.item.seats || 25) - (viewDetailItem.item.registeredCount || 0)} seats left</span>
                  </div>
                </div>
              )}

              {viewDetailItem.type === "resource" && (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold">
                  <div>
                    <span className="text-[9px] text-slate-400 block">File Type</span>
                    <span className="text-slate-900 text-xs font-black">{viewDetailItem.item.type}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Syllabus Target</span>
                    <span className="text-slate-900 text-xs font-black">{viewDetailItem.item.curriculum} Syllabus</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Price</span>
                    <span className="text-slate-900 text-xs font-black">${viewDetailItem.item.price.toFixed(2)} USD</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Audience</span>
                    <span className="text-slate-900 text-xs font-black">{viewDetailItem.item.audience}</span>
                  </div>
                </div>
              )}

              {/* Attachments Section */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide block">
                  {viewDetailItem.type === "resource" ? "Files in Package bundle" : "Attached Material Outlines"}
                </span>
                {viewDetailItem.item.attachments && viewDetailItem.item.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {viewDetailItem.item.attachments
                      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                      .map((att: any) => (
                        <div key={att.id} className="p-3 border border-slate-150 rounded-xl flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">📄</span>
                            <div>
                              <p className="font-extrabold text-slate-800 text-[11px] leading-tight">{att.title}</p>
                              {att.notes && <p className="text-[9px] text-slate-450 mt-0.5">{att.notes}</p>}
                            </div>
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase shrink-0">{att.fileSize || "1.5 MB"}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 font-bold">
                    No attachments uploaded.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
              <Button variant="ghost" onClick={() => setViewDetailItem(null)} className="font-bold text-slate-500">
                Close
              </Button>
              <Button
                onClick={() => {
                  const item = viewDetailItem.item;
                  const type = viewDetailItem.type;
                  setViewDetailItem(null);
                  if (type === "cohort") {
                    handleOpenCohortBooking(item);
                  } else if (type === "resource") {
                    handleOpenResourceBooking(item);
                  }
                }}
                className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold px-6 rounded-xl shadow-md"
              >
                {viewDetailItem.type === "cohort" ? "Join Cohort Stream" : "Purchase Package"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Booking Flow Modal Container */}
      {purchaseItem && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden animate-zoom-in">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="font-black text-sm text-slate-900">
                  {purchaseItem.type === "tutor" ? `Book 1-on-1: ${purchaseItem.detail.tutorName}` : purchaseItem.type === "cohort" ? `Join Cohort: ${purchaseItem.title}` : `Purchase study Pack`}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                  {purchaseItem.type === "tutor" ? `${purchaseItem.detail.subject} Tutoring` : purchaseItem.type === "cohort" ? `${purchaseItem.detail.subject} Group Cohort` : `${purchaseItem.detail.category}`}
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center font-bold text-slate-400 hover:text-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* STEP 1: Date & Time Picker */}
            {bookingStep === 1 && purchaseItem.type === "tutor" && (
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Select Date</Label>
                  <Input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700">Available Time Slots (CAT)</Label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {purchaseItem.detail.availableSlots.map((slot: string) => (
                      <div 
                        key={slot}
                        onClick={() => {
                          setBookingTime(slot);
                          const matchedSlot = slots.find(s => s.publishStatus === "published" && s.status === "Available" && s.time === slot && s.subject === purchaseItem.detail.subject);
                          if (matchedSlot && purchaseItem.detail) {
                            purchaseItem.detail.slotId = matchedSlot.id;
                          } else if (purchaseItem.detail) {
                            purchaseItem.detail.slotId = null;
                          }
                        }}
                        className={`p-3 border rounded-xl cursor-pointer text-center text-xs font-extrabold transition-all ${bookingTime === slot ? "bg-indigo-650 border-indigo-650 text-white shadow-sm" : "border-slate-200 hover:border-indigo-400 bg-white"}`}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-end">
                  <Button 
                    onClick={handleNextStep}
                    disabled={!bookingTime || !bookingDate}
                    className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold px-6 rounded-xl flex items-center gap-1"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment Provider Selection & Phone Input */}
            {bookingStep === 2 && (
              <div className="p-6 space-y-5">
                <div className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
                  {purchaseItem.type === "tutor" ? (
                    <span>You are booking a 1-on-1 session for <strong>{purchaseItem.detail.subject}</strong> on <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>. Total fee: <strong className="text-slate-900">${purchaseItem.price.toFixed(2)} USD</strong>.</span>
                  ) : purchaseItem.type === "cohort" ? (
                    <span>You are joining the group cohort <strong>{purchaseItem.title}</strong>, meeting <strong>{purchaseItem.detail.meets}</strong>. Total fee: <strong className="text-slate-900">${purchaseItem.price.toFixed(2)} USD</strong>.</span>
                  ) : (
                    <span>You are buying the study pack <strong>{purchaseItem.title}</strong> ({purchaseItem.detail.category}). Total fee: <strong className="text-slate-900">${purchaseItem.price.toFixed(2)} USD</strong>.</span>
                  )}
                </div>

                {role === "parent" && (
                  <div className="space-y-1.5 p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-xl">
                    <Label className="text-xs font-bold text-indigo-950 flex items-center gap-1">
                      <span>👪</span> Assign Purchase to Child:
                    </Label>
                    <Select value={selectedChild} onValueChange={(val) => val && setSelectedChild(val)}>
                      <SelectTrigger className="border-slate-200 bg-white rounded-xl text-xs font-extrabold h-9">
                        <SelectValue placeholder="Select child" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tinashe Mutasa">Tinashe Mutasa (Grade 11, Cambridge)</SelectItem>
                        <SelectItem value="Chipo Mutasa">Chipo Mutasa (Grade 8, ZIMSEC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700">Select Mobile Money Provider</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* EcoCash Selector */}
                    <div 
                      onClick={() => {
                        setPaymentProvider("ecocash");
                        setMobileNumber("+263 77 ");
                      }}
                      className={`p-4 border rounded-2xl cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentProvider === "ecocash" ? "border-indigo-500 bg-indigo-50/20 text-indigo-900" : "border-slate-200 bg-white"}`}
                    >
                      <Smartphone className="h-6 w-6 text-[#00a884]" />
                      <span className="text-xs font-black">EcoCash Wallet</span>
                    </div>

                    {/* InnBucks Selector */}
                    <div 
                      onClick={() => {
                        setPaymentProvider("innbucks");
                        setMobileNumber("+263 78 ");
                      }}
                      className={`p-4 border rounded-2xl cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentProvider === "innbucks" ? "border-indigo-500 bg-indigo-50/20 text-indigo-900" : "border-slate-200 bg-white"}`}
                    >
                      <Smartphone className="h-6 w-6 text-orange-500" />
                      <span className="text-xs font-black">InnBucks Pay</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="payPhone" className="text-xs font-bold text-slate-700">Billing Wallet Number</Label>
                  <Input 
                    id="payPhone"
                    type="text" 
                    placeholder="+26377..." 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-slate-200 rounded-xl"
                  />
                  <p className="text-[10px] text-slate-400">Enter phone number linked to your mobile money billing account.</p>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between gap-3">
                  {purchaseItem.type === "tutor" ? (
                    <Button variant="ghost" onClick={() => setBookingStep(1)} className="font-bold text-slate-500">
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button 
                    onClick={handleNextStep}
                    disabled={!mobileNumber || mobileNumber.length < 9}
                    className="bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold px-6 rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    Initiate Payment <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: USSD PIN CountDown Approval Simulator */}
            {bookingStep === 3 && (
              <div className="p-6 text-center space-y-6">
                <div className="h-12 w-12 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-sm">USSD Push Notification Sent!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    We sent a payment prompt message to **{mobileNumber}**. Please unlock your device, check for the EcoCash/InnBucks pop-up prompt, and enter your account PIN to confirm the fee transaction.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl font-extrabold text-xs text-slate-700 max-w-sm mx-auto">
                  ⏳ Session expires in: <span className="text-indigo-650 text-sm font-black">{ussdTimer} seconds</span>
                </div>

                <div className="border-t border-slate-150 pt-5 flex flex-col gap-2.5">
                  <Button 
                    onClick={handleUSSDApprove}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-5 rounded-xl shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4 w-4" /> Simulate PIN Input & Approval
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setIsProcessingUSSD(false);
                      setBookingStep(2);
                    }} 
                    className="w-full text-red-500 hover:bg-red-50 font-bold"
                  >
                    Cancel Transaction
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Success Screen */}
            {bookingStep === 4 && (
              <div className="p-8 text-center space-y-6">
                <div className="h-16 w-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-sm">
                  <ShieldCheck className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Payment Approved!</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Your mobile payment was verified. A booking transaction has been logged.
                    {role === "parent" 
                      ? ` The item is now fully unlocked in ${selectedChild}'s workspace profile.`
                      : " The item is now fully unlocked in your student profile."}
                  </p>
                </div>

                <div className="p-4 border border-slate-150 rounded-2xl text-left text-xs bg-slate-50/50 space-y-2 font-bold text-slate-600">
                  {role === "parent" && (
                    <div className="flex justify-between border-b border-slate-100 pb-1.5 mb-1.5">
                      <span>Assigned Student:</span>
                      <span className="text-indigo-700 font-extrabold">{selectedChild}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Item Purchased:</span>
                    <span className="text-slate-900 font-extrabold">{purchaseItem.title}</span>
                  </div>
                  {purchaseItem.type === "tutor" && (
                    <div className="flex justify-between">
                      <span>Lesson Slot:</span>
                      <span className="text-slate-900 font-extrabold">{bookingDate} at {bookingTime}</span>
                    </div>
                  )}
                  {purchaseItem.type === "cohort" && (
                    <div className="flex justify-between">
                      <span>Schedule:</span>
                      <span className="text-slate-900 font-extrabold">{purchaseItem.detail.meets}</span>
                    </div>
                  )}
                  {purchaseItem.type === "resource" && (
                    <div className="flex justify-between">
                      <span>Package Category:</span>
                      <span className="text-slate-900 font-extrabold">{purchaseItem.detail.category}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Amount Charged:</span>
                    <span className="text-indigo-650 font-black">${purchaseItem.price.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reference ID:</span>
                    <span className="text-slate-550 font-extrabold">TXN-LM-{Date.now().toString().slice(-6)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      handleCloseModal();
                      router.push(role === "parent" ? "/dashboard?role=parent" : "/dashboard?role=learner");
                    }}
                    className="w-full bg-indigo-650 hover:bg-indigo-600 text-white font-extrabold py-5 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default function TutorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-500">Loading Tutors...</div>}>
      <TutorsContent />
    </Suspense>
  );
}
