"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Check,
  Plus
} from "lucide-react";

// Types corresponding to shared workspace models
interface CohortClass {
  id: string;
  title: string;
  subject: string;
  curriculum: "ZIMSEC" | "Cambridge" | "IEB";
  grade: string;
  tutorName: string;
  tutorImage: string;
  tutorRole: string;
  rating: number;
  reviewsCount: number;
  pricePerClass: number;
  durationWeeks: number;
  schedule: string;
  startDate: string;
  tags: string[];
}

interface TeacherResource {
  id: string;
  title: string;
  subject: string;
  curriculum: "ZIMSEC" | "Cambridge" | "IEB";
  grade: string;
  fileType: "PDF" | "PPT" | "DOCX";
  pages: number;
  creatorName: string;
  creatorAvatar: string;
  rating: number;
  downloadsCount: number;
  originalPrice: number;
  discountPrice: number;
  description: string;
}

// 1. Mock Data
const CATEGORIES = [
  { id: "all", name: "All Subjects", icon: "🌐" },
  { id: "math", name: "Mathematics", icon: "📐" },
  { id: "science", name: "Physics & Chemistry", icon: "🧪" },
  { id: "biology", name: "Biology & Life Sciences", icon: "🌿" },
  { id: "english", name: "English & Literature", icon: "📝" },
  { id: "exams", name: "Exam Prep & Bootcamps", icon: "🎯" },
];

const COHORT_CLASSES: CohortClass[] = [
  {
    id: "c-1",
    title: "O-Level Mathematics: Algebra & Trigonometry Masterclass",
    subject: "math",
    curriculum: "ZIMSEC",
    grade: "Grade 10-11",
    tutorName: "Dr. Albert Sibanda",
    tutorImage: "/avatars/tutor-1.jpg",
    tutorRole: "Former Exam Moderator, 15+ Yrs Exp",
    rating: 4.9,
    reviewsCount: 114,
    pricePerClass: 10.00,
    durationWeeks: 8,
    schedule: "Every Tue & Thu, 16:30 - 17:30 CAT",
    startDate: "Starts May 25",
    tags: ["Algebra", "Live Cohort", "Homework Help"]
  },
  {
    id: "c-2",
    title: "A-Level Physics: Mechanics & Relativity Cohort",
    subject: "science",
    curriculum: "Cambridge",
    grade: "Grade 12-13",
    tutorName: "Mrs. Tariro Ndlovu",
    tutorImage: "/avatars/tutor-2.jpg",
    tutorRole: "MSc Physics, Author of Syllabus Guides",
    rating: 5.0,
    reviewsCount: 78,
    pricePerClass: 15.00,
    durationWeeks: 10,
    schedule: "Every Mon & Wed, 15:00 - 16:30 CAT",
    startDate: "Starts May 28",
    tags: ["Mechanics", "Intensive", "Exam Preparation"]
  },
  {
    id: "c-3",
    title: "O-Level Biology: Cells, Ecosystems & Human Physiology",
    subject: "biology",
    curriculum: "ZIMSEC",
    grade: "Grade 10-11",
    tutorName: "Mr. Farai Moyo",
    tutorImage: "/avatars/tutor-3.jpg",
    tutorRole: "Senior Biology Teacher, Cambridge Certified",
    rating: 4.8,
    reviewsCount: 56,
    pricePerClass: 8.50,
    durationWeeks: 6,
    schedule: "Saturdays, 09:00 - 11:00 CAT",
    startDate: "Starts June 1",
    tags: ["Cell Biology", "Ecology", "Interactive Lab"]
  },
  {
    id: "c-4",
    title: "IEB Matric English Home Language: Poetry & Essay Writing",
    subject: "english",
    curriculum: "IEB",
    grade: "Grade 12",
    tutorName: "Ms. Sarah Golding",
    tutorImage: "/avatars/tutor-4.jpg",
    tutorRole: "BEd English, Specialized Writing Coach",
    rating: 4.9,
    reviewsCount: 92,
    pricePerClass: 12.00,
    durationWeeks: 8,
    schedule: "Every Friday, 16:00 - 18:00 CAT",
    startDate: "Starts May 29",
    tags: ["Poetry", "Essay Prep", "Literature Analysis"]
  },
  {
    id: "c-5",
    title: "Cambridge IGCSE Chemistry: Stoichiometry & Organic Bootcamp",
    subject: "science",
    curriculum: "Cambridge",
    grade: "Grade 9-10",
    tutorName: "Dr. Albert Sibanda",
    tutorImage: "/avatars/tutor-1.jpg",
    tutorRole: "Former Exam Moderator, 15+ Yrs Exp",
    rating: 5.0,
    reviewsCount: 41,
    pricePerClass: 14.00,
    durationWeeks: 6,
    schedule: "Every Thursday, 15:30 - 17:00 CAT",
    startDate: "Starts June 3",
    tags: ["Stoichiometry", "Organic Chemistry", "Quick Review"]
  }
];

const TEACHER_RESOURCES: TeacherResource[] = [
  {
    id: "r-1",
    title: "Complete ZIMSEC O-Level Mathematics Revision Guide",
    subject: "math",
    curriculum: "ZIMSEC",
    grade: "Grade 10-11",
    fileType: "PDF",
    pages: 148,
    creatorName: "Mrs. Tariro Ndlovu",
    creatorAvatar: "/avatars/tutor-2.jpg",
    rating: 5.0,
    downloadsCount: 420,
    originalPrice: 8.00,
    discountPrice: 4.99,
    description: "Detailed worked solutions for past paper questions spanning 2018-2024. Includes cheat sheets for fast formula memorization."
  },
  {
    id: "r-2",
    title: "Cambridge A-Level Physics Lab Manual & Notes",
    subject: "science",
    curriculum: "Cambridge",
    grade: "Grade 12-13",
    fileType: "DOCX",
    pages: 56,
    creatorName: "Dr. Albert Sibanda",
    creatorAvatar: "/avatars/tutor-1.jpg",
    rating: 4.9,
    downloadsCount: 290,
    originalPrice: 12.00,
    discountPrice: 8.50,
    description: "Step-by-step guidance on all core practical evaluations. Designed specifically to maximize marks in Paper 3 & 4."
  },
  {
    id: "r-3",
    title: "Grade 12 IEB Shakespeare's Hamlet Exam Analysis pack",
    subject: "english",
    curriculum: "IEB",
    grade: "Grade 12",
    fileType: "PPT",
    pages: 82,
    creatorName: "Ms. Sarah Golding",
    creatorAvatar: "/avatars/tutor-4.jpg",
    rating: 4.8,
    downloadsCount: 154,
    originalPrice: 6.50,
    discountPrice: 3.99,
    description: "Visually premium classroom slides exploring key themes, quotes, and character breakdowns. Ready-to-teach curriculum slides."
  },
  {
    id: "r-4",
    title: "O-Level Biology Revision Sheets: Cells & Nutrition",
    subject: "biology",
    curriculum: "ZIMSEC",
    grade: "Grade 10",
    fileType: "PDF",
    pages: 24,
    creatorName: "Mr. Farai Moyo",
    creatorAvatar: "/avatars/tutor-3.jpg",
    rating: 4.9,
    downloadsCount: 310,
    originalPrice: 3.50,
    discountPrice: 1.99,
    description: "High-yield worksheets complete with diagrams for quick review before exams. Fully mapped to ZIMSEC objectives."
  }
];

const WHATSAPP_FLOWS = {
  matcher: [
    { sender: "user", text: "Hello, I need a mathematics tutor for ZIMSEC O-Level." },
    { sender: "bot", text: "Hi! I can help you with that. Let's find your perfect match. What is your preferred budget per hour?\n\n1. Under $5/hr\n2. $5 - $10/hr\n3. Over $10/hr" },
    { sender: "user", text: "2" },
    { sender: "bot", text: "Great! Finding tutors in the $5 - $10 range... 🔎\n\nI found **Dr. Albert Sibanda** (ZIMSEC Math Expert, Rated 4.9⭐, $10/class). He has an upcoming live cohort starting on May 25.\n\nWould you like me to:\n1. Book a trial seat\n2. Request a call back\n3. Show another tutor" },
    { sender: "user", text: "1" },
    { sender: "bot", text: "Confirming trial seat registration... 🎟️\nDone! Dr. Sibanda's team will contact you on this number to set up your account. Get ready for class on May 25!" }
  ],
  homework: [
    { sender: "user", text: "*Sends image of math equation: 2x² - 5x + 3 = 0*" },
    { sender: "bot", text: "Analyzing image... 👁️\nDetected: Quadratic Equation `2x² - 5x + 3 = 0`.\n\nLet's solve this step-by-step using the Quadratic Formula:\n\n`x = [-b ± √(b² - 4ac)] / 2a`\n\nHere, a = 2, b = -5, c = 3.\n\n1. Calculate discriminant: `b² - 4ac`\n`= (-5)² - 4(2)(3) = 25 - 24 = 1`\n\n2. Solve for x:\n`x = [-(-5) ± √1] / (2 * 2)`\n`x = [5 ± 1] / 4`\n\nTherefore:\n`x₁ = (5 + 1) / 4 = 1.5`\n`x₂ = (5 - 1) / 4 = 1.0`\n\nWould you like me to find similar practice questions? (Reply YES/NO)" }
  ],
  teacher: [
    { sender: "user", text: "/lesson Grade 10 Photosynthesis, ZIMSEC syllabus, 45 minute lesson" },
    { sender: "bot", text: "Drafting Lesson Plan Outline... 📄\n\n**Topic:** Introduction to Photosynthesis\n**Duration:** 45 minutes\n**Syllabus Code:** ZIMSEC Biology 5008/1\n\n**1. Objectives (5 mins):**\n- Define photosynthesis.\n- Identify the raw materials & conditions needed.\n\n**2. Core Lesson (25 mins):**\n- Explain the word equation: `Carbon Dioxide + Water → Glucose + Oxygen` in the presence of sunlight and chlorophyll.\n- Draw and label a leaf cross-section showing chloroplasts.\n\n**3. Guided Activity (10 mins):**\n- Students complete a diagram labeling activity.\n\n**4. Assessment (5 mins):**\n- Quick 3-question quiz: 1) What is chlorophyll? 2) Why is oxygen released? 3) Name the energy source.\n\nI have generated a ready-to-print PDF worksheet for this lesson. Reply **DOWNLOAD** to fetch it!" }
  ]
};

export default function Home() {
  // Stateful states
  const [activeSearchTab, setActiveSearchTab] = useState<"tutors" | "resources">("tutors");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeWhatsappFlow, setActiveWhatsappFlow] = useState<"matcher" | "homework" | "teacher">("matcher");
  const [cartCount, setCartCount] = useState(0);
  const [bookedCohorts, setBookedCohorts] = useState<string[]>([]);
  const [addedResources, setAddedResources] = useState<string[]>([]);

  // Filtering lists
  const filteredCohorts = COHORT_CLASSES.filter(c => {
    const matchesCategory = selectedCategory === "all" || c.subject === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.curriculum.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredResources = TEACHER_RESOURCES.filter(r => {
    const matchesCategory = selectedCategory === "all" || r.subject === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.curriculum.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookCohort = (id: string) => {
    window.location.href = "/tutors";
  };

  const handleAddResource = (id: string) => {
    if (addedResources.includes(id)) {
      setAddedResources(prev => prev.filter(rId => rId !== id));
      setCartCount(prev => Math.max(0, prev - 1));
    } else {
      setAddedResources(prev => [...prev, id]);
      setCartCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Banner (Teachers Pay Teachers style creator prompt) */}
      <div className="w-full bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white py-2.5 px-6 text-center text-xs md:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="h-4 w-4 animate-spin text-amber-300" />
        <span>Are you an educator? Upload lesson plans and start earning!</span>
        <a href="#creator-portal" className="underline hover:text-indigo-100 transition-colors ml-1">
          Learn how to sell resources →
        </a>
      </div>

      {/* Navigation (Outschool & Coral Academy mix) */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-600/30">
              L
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Leaner
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                Teacher Economy
              </span>
            </div>
          </div>
          
          {/* Main Search Bar (Nav central element like TpT & Outschool) */}
          <div className="hidden lg:flex items-center relative w-full max-w-md">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder={`Search ${activeSearchTab === "tutors" ? "live cohort classes..." : "syllabuses, exam guides, slides..."}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-slate-200 focus:border-indigo-500 rounded-full bg-slate-55 w-full text-sm"
            />
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <a href="/tutors" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> Live Cohorts
            </a>
            <a href="#resources" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> Resources
            </a>
            <a href="#whatsapp" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <Bot className="h-4 w-4" /> WhatsApp AI
            </a>
          </nav>

          {/* CTA & Shopping Cart (TpT style) */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative cursor-pointer group flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors">
              <ShoppingBag className="h-5 w-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex font-bold text-slate-700">
              Log In
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-md shadow-indigo-600/10 px-5 rounded-full transition-transform active:scale-95">
              Join Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section (Coral Academy style structural trust, TpT search style, and Outschool vibrant styling) */}
      <section className="relative bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/50 py-16 md:py-24 overflow-hidden">
        {/* Curtains / Graphic details background */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none hidden md:block bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6">
              <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
              Verified Local Curriculum: Cambridge, ZIMSEC, IEB
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6">
              Africa's Hub for <br className="hidden md:inline" />
              <span className="text-indigo-600 underline decoration-indigo-300 decoration-wavy decoration-2">Live Tutoring</span> & Teacher Resources
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8 font-medium">
              Join cohorts led by certified local educators, or browse thousands of worksheets, slides, and study notes tailored to local syllabuses. Accessible even on slow connections.
            </p>

            {/* Tabbed Search Interface (Mix of TpT search and Outschool clarity) */}
            <Card className="w-full border-slate-200/80 shadow-lg rounded-2xl overflow-hidden mb-8 max-w-2xl bg-white">
              <CardHeader className="p-0 border-b border-slate-100">
                <div className="flex bg-slate-50/80 p-1.5">
                  <button 
                    onClick={() => setActiveSearchTab("tutors")}
                    className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeSearchTab === "tutors" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    <GraduationCap className="h-4 w-4 text-indigo-600" />
                    Live Cohort Classes
                  </button>
                  <button 
                    onClick={() => setActiveSearchTab("resources")}
                    className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeSearchTab === "resources" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    Syllabus Materials
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative flex items-center">
                  <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <Input 
                    type="text" 
                    placeholder={activeSearchTab === "tutors" ? "Search Dr. Sibanda, Math, O-Level..." : "Search mechanics notes, revision slides..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 border-slate-200 focus:border-indigo-500 rounded-xl text-sm w-full"
                  />
                </div>
                <Button 
                  onClick={() => {
                    if (activeSearchTab === "tutors") {
                      window.location.href = `/tutors?search=${encodeURIComponent(searchQuery)}`;
                    } else {
                      window.location.href = `/dashboard?role=learner&tab=resources&search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 rounded-xl flex items-center gap-2 shadow-sm shrink-0"
                >
                  Search
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Curriculum alignment badges (Coral Academy style) */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
              <span>ALIGNED SYLLABUSES:</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-slate-200 text-slate-600 px-3 py-1 font-bold bg-white">Cambridge (IGCSE & A-Level)</Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-600 px-3 py-1 font-bold bg-white">ZIMSEC (O & A-Level)</Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-600 px-3 py-1 font-bold bg-white">IEB Matric (CAPS)</Badge>
              </div>
            </div>
          </div>

          {/* Right Cards Showcase (Vibrant edtech look representing the platform features) */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">
            {/* Background elements */}
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

            {/* Float Card 1: Sample Live Class (Outschool Style) */}
            <Card className="border-slate-200/80 shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300 max-w-sm ml-auto bg-white">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-orange-50 border border-orange-200 text-orange-700 font-bold hover:bg-orange-50 text-[10px]">
                    LIVE COHORT
                  </Badge>
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                    4.9 (42)
                  </span>
                </div>
                <CardTitle className="text-sm font-black line-clamp-1">Mathematics Grade 11 Prep</CardTitle>
                <CardDescription className="text-xs line-clamp-1">Linear Equations, Quadratics & Geometry</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs">
                <div className="flex items-center gap-2 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Avatar className="h-7 w-7 border-2 border-indigo-200">
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[10px] font-bold">AS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">Dr. Albert Sibanda</span>
                    <span className="text-[9px] text-slate-400">Ex-Moderator, University of Zimbabwe</span>
                  </div>
                </div>
                <div className="flex justify-between items-center font-bold text-[10px] text-slate-500">
                  <span>Weekly Starts May 25</span>
                  <span className="text-indigo-600 text-xs">$10/class</span>
                </div>
              </CardContent>
            </Card>

            {/* Float Card 2: Sample Resource (TpT Style) */}
            <Card className="border-slate-200/80 shadow-md transform -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-sm mr-auto bg-white">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-50 text-[10px]">
                    PDF STUDY NOTES
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-bold">148 Pages</span>
                </div>
                <CardTitle className="text-sm font-black line-clamp-1">O-Level Chemistry worked Solutions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs">
                <p className="text-slate-500 line-clamp-2 text-[11px] mb-3">
                  Step-by-step calculations for organic chemical reactions and mass calculations.
                </p>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-400 text-[10px] flex items-center gap-1">
                    <Download className="h-3 w-3 text-slate-400" />
                    420 Downloads
                  </span>
                  <span className="text-emerald-600 text-xs">$4.99 <span className="text-slate-400 line-through text-[9px] font-normal">$8.00</span></span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Grid (Outschool Style with friendly icons and dynamic filtering state) */}
      <section className="bg-white border-b border-slate-200/50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-black tracking-widest text-slate-400 uppercase text-center mb-6">
            Browse by Curriculum Area
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-all duration-150 ${isActive ? "bg-indigo-50 border-indigo-500 shadow-sm shadow-indigo-600/5 scale-[1.03]" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"}`}
                >
                  <span className="text-2xl mb-2">{cat.icon}</span>
                  <span className="text-xs font-black text-slate-900 text-center">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 1: Live Tutor Cohorts (Coral Academy / Outschool Style) */}
      <section id="tutors" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-extrabold mb-3">
              <Calendar className="h-3.5 w-3.5 text-orange-500" />
              COHORT INTERACTION
            </div>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              Learn Live with Expert Local Educators
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Interactive small-group cohorts running on reliable, localized timetables.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200 text-xs font-bold rounded-xl bg-white hover:bg-slate-50">
              View All Cohorts ({COHORT_CLASSES.length})
            </Button>
          </div>
        </div>

        {filteredCohorts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCohorts.map((cohort) => {
              const isBooked = bookedCohorts.includes(cohort.id);
              return (
                <Card 
                  key={cohort.id} 
                  className="border-slate-200/80 hover:border-indigo-400 bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <CardHeader className="p-5 pb-3">
                    <div className="flex justify-between items-center gap-2 mb-3">
                      <Badge className="bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-[10px] font-bold">
                        {cohort.curriculum} Syllabus
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 border border-slate-100 rounded-md">
                        {cohort.grade}
                      </span>
                    </div>
                    <CardTitle className="text-base font-black text-slate-950 tracking-tight line-clamp-2 leading-snug">
                      {cohort.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-5 pt-0 flex-grow text-xs flex flex-col justify-between gap-4">
                    {/* Tutor info banner */}
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <Avatar className="h-8 w-8 border-2 border-indigo-100">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">AS</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 flex items-center gap-1">
                          {cohort.tutorName}
                          <CheckCircle className="h-3 w-3 text-green-500 fill-green-500 border-none" />
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">{cohort.tutorRole}</span>
                      </div>
                    </div>

                    <div className="space-y-2 font-semibold text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        <span className="line-clamp-1">{cohort.schedule}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-700">{cohort.rating}</span>
                          <span>({cohort.reviewsCount} reviews)</span>
                        </div>
                        <span className="text-[11px] text-indigo-500 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                          {cohort.startDate}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 border-t border-slate-100/80 bg-slate-50/50 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400">PRICE PER CLASS</span>
                      <span className="text-lg font-black text-slate-900">${cohort.pricePerClass.toFixed(2)}</span>
                    </div>
                    <Button 
                      onClick={() => handleBookCohort(cohort.id)}
                      className={`font-black text-xs px-5 py-2.5 rounded-xl transition-all duration-150 ${isBooked ? "bg-green-600 hover:bg-green-500 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"}`}
                    >
                      {isBooked ? (
                        <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Booked!</span>
                      ) : (
                        "Book Trial Class"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
            <Compass className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <span className="text-sm font-extrabold text-slate-500 block">No live cohorts match your query.</span>
            <span className="text-xs text-slate-400 block mt-1">Try clearing your filters or changing your search terms.</span>
          </div>
        )}
      </section>

      {/* Section 2: Syllabus Resources Marketplace (Teachers Pay Teachers Style) */}
      <section id="resources" className="bg-white border-t border-b border-slate-200/50 py-20 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold mb-3">
                <ShoppingBag className="h-3.5 w-3.5 text-emerald-500" />
                TEACHER MARKETPLACE
              </div>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight">
                Top-Rated Syllabus Resources & Notes
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Download teacher-created lesson plans, worksheets, and study notes tailored exactly to syllabus requirements.
              </p>
            </div>

            <div>
              <Button variant="outline" className="border-slate-200 text-xs font-bold rounded-xl bg-white hover:bg-slate-50">
                View All Files ({TEACHER_RESOURCES.length})
              </Button>
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.map((resource) => {
                const isAdded = addedResources.includes(resource.id);
                return (
                  <Card 
                    key={resource.id} 
                    className="border-slate-200/80 hover:border-emerald-500 bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {/* Document thumbnail placeholder */}
                    <div className="bg-slate-100 border-b border-slate-100 h-44 flex flex-col justify-center items-center p-4 relative group">
                      {/* Document Page Decorator */}
                      <div className="h-28 w-20 bg-white border border-slate-200 rounded shadow-md flex flex-col justify-between p-2 group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
                        {/* Syllabus line decorator */}
                        <div className="h-2 w-full bg-indigo-500 rounded-sm mb-1.5"></div>
                        <div className="space-y-1.5 flex-grow">
                          <div className="h-1 w-full bg-slate-100 rounded-sm"></div>
                          <div className="h-1 w-5/6 bg-slate-100 rounded-sm"></div>
                          <div className="h-1 w-full bg-slate-100 rounded-sm"></div>
                          <div className="h-1 w-4/6 bg-slate-100 rounded-sm"></div>
                        </div>
                        <Badge className="bg-emerald-50 border border-emerald-200 text-[8px] text-emerald-700 py-0 px-1 absolute bottom-1.5 right-1.5 hover:bg-emerald-50 font-black">
                          {resource.fileType}
                        </Badge>
                      </div>
                      
                      <Badge className="absolute top-3 left-3 bg-slate-900 text-white font-extrabold text-[9px] hover:bg-slate-900">
                        {resource.curriculum} Syllabus
                      </Badge>
                    </div>

                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                        <span>{resource.grade}</span>
                        <span>{resource.pages} Pages</span>
                      </div>
                      <CardTitle className="text-sm font-extrabold text-slate-900 tracking-tight line-clamp-2 min-h-10 leading-snug">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 flex-grow text-[11px] text-slate-500 flex flex-col justify-between gap-3">
                      <p className="line-clamp-2 leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-slate-100/80 pt-3">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-slate-100 text-slate-700 text-[8px] font-bold">AS</AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-slate-700 text-[10px]">{resource.creatorName}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[10px]">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 border-t border-slate-100 bg-slate-55 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 line-through font-medium">
                          ${resource.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-base font-black text-emerald-600 leading-none">
                          ${resource.discountPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button 
                        onClick={() => handleAddResource(resource.id)}
                        className={`h-8 font-black text-[10px] px-3.5 rounded-lg border transition-all duration-150 ${isAdded ? "bg-emerald-600 hover:bg-emerald-500 text-white border-none" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"}`}
                      >
                        {isAdded ? (
                          <span className="flex items-center gap-0.5"><Check className="h-3 w-3" /> In Cart</span>
                        ) : (
                          <span className="flex items-center gap-0.5"><Plus className="h-3 w-3" /> Add To Cart</span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
              <Compass className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <span className="text-sm font-extrabold text-slate-500 block">No resources match your query.</span>
              <span className="text-xs text-slate-400 block mt-1">Try clearing your filters or changing your search terms.</span>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: WhatsApp AI Gateway (Low data / Offline support - Unique African Feature) */}
      <section id="whatsapp" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text details */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-extrabold mb-3">
              <Smartphone className="h-3.5 w-3.5 text-purple-600" />
              LOW DATA ECOSYSTEM
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 mb-6">
              Low Bandwidth? Learn Directly via WhatsApp
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
              We understand that data bundles can be expensive. That's why the entire Leaner directory, study notes downloads, and homework solve agents can be accessed offline through our automated WhatsApp gateway.
            </p>

            <div className="space-y-4 mb-8">
              {/* Feature 1 */}
              <div 
                onClick={() => setActiveWhatsappFlow("matcher")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${activeWhatsappFlow === "matcher" ? "bg-white border-purple-500 shadow-md" : "border-slate-100 bg-slate-50 hover:bg-slate-100"}`}
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  🔍
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Tutor Matchmaker Bot</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Find live tutors based on your syllabus, grade level, and hourly rate constraints.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div 
                onClick={() => setActiveWhatsappFlow("homework")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${activeWhatsappFlow === "homework" ? "bg-white border-purple-500 shadow-md" : "border-slate-100 bg-slate-50 hover:bg-slate-100"}`}
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  📸
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Homework OCR Solver</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Take a photo of any mathematical or scientific problem and receive instant curriculum step-by-step solving steps.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div 
                onClick={() => setActiveWhatsappFlow("teacher")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${activeWhatsappFlow === "teacher" ? "bg-white border-purple-500 shadow-md" : "border-slate-100 bg-slate-50 hover:bg-slate-100"}`}
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  📝
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Teacher Prep assistant</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Educators can prompt formatting codes to quickly write curriculum-structured lesson plans and quizzes.</p>
                </div>
              </div>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl px-6 shadow-sm">
              Connect to Bot via WhatsApp
            </Button>
          </div>

          {/* Right WhatsApp Mobile Mockup (Interactive message box) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[360px] h-[580px] bg-slate-950 border-8 border-slate-900 rounded-[38px] shadow-2xl relative flex flex-col overflow-hidden">
              
              {/* Speaker & Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-800"></span>
                <span className="w-12 h-1 bg-slate-800 rounded-full"></span>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-[#075e54] text-white pt-8 pb-3 px-4 flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-9 w-9 border-2 border-white/20">
                    <AvatarFallback className="bg-emerald-600 text-white text-xs font-black">L</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold text-sm">Leaner AI bot</span>
                    <span className="text-[10px] text-emerald-100">online</span>
                  </div>
                </div>
                <div className="flex gap-3 text-slate-100 text-xs font-bold">
                  <span>📞</span>
                  <span>⋮</span>
                </div>
              </div>

              {/* WhatsApp Chat Area */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#efeae2] flex flex-col justify-end text-xs">
                {WHATSAPP_FLOWS[activeWhatsappFlow].map((msg, index) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div 
                      key={index} 
                      className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-left ${isUser ? "bg-[#d9fdd3] text-slate-800 ml-auto rounded-tr-none" : "bg-white text-slate-800 mr-auto rounded-tl-none"}`}
                    >
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      <span className="text-[8px] text-slate-400 block text-right mt-1 font-semibold">12:34</span>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp Input box */}
              <div className="bg-[#f0f0f0] p-2.5 flex items-center gap-2 border-t border-slate-200 shrink-0">
                <div className="flex-grow bg-white rounded-full px-4 py-2 text-left text-xs text-slate-400 border border-slate-200 flex justify-between items-center">
                  <span>Type a message...</span>
                  <span>📎</span>
                </div>
                <span className="h-8 w-8 shrink-0 rounded-full bg-[#00a884] text-white flex items-center justify-center text-sm shadow">
                  🎤
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Banner (Teachers Pay Teachers Style CTAs) */}
      <section id="creator-portal" className="bg-slate-900 text-white py-20 px-6 border-b border-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-950/50 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-xs font-bold mb-6">
            <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
            EARNING OPPORTUNITY FOR EDUCATORS
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Turn Your Lesson Plans & Worked Exams Into Passive Income
          </h2>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Publish educational resources once and make them available to thousands of schools, students, and parents across Southern Africa. Retain up to 80% of sales commissions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-2xl mx-auto mb-10">
            <div className="bg-slate-800/50 border border-slate-800 p-5 rounded-2xl">
              <span className="text-2xl mb-2 block">🌍</span>
              <h5 className="font-extrabold text-sm mb-1 text-white">Massive Audience</h5>
              <p className="text-slate-400 text-xs">Reach classrooms and private candidates studying ZIMSEC/Cambridge.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-800 p-5 rounded-2xl">
              <span className="text-2xl mb-2 block">⚡</span>
              <h5 className="font-extrabold text-sm mb-1 text-white">Instant Upload</h5>
              <p className="text-slate-400 text-xs">Upload PDFs, PowerPoint slides, or exam answer guides in 2 minutes.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-800 p-5 rounded-2xl">
              <span className="text-2xl mb-2 block">💳</span>
              <h5 className="font-extrabold text-sm mb-1 text-white">Payout Flexibility</h5>
              <p className="text-slate-400 text-xs">Get paid directly via EcoCash, InnBucks, Mukuru, or Bank Transfer.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-8 rounded-xl shadow-lg shadow-indigo-600/20">
              Apply as a Creator
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white bg-slate-800 hover:bg-slate-700 font-extrabold px-8 rounded-xl">
              Creator Dashboard Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3">
          TRUSTED NATIONWIDE
        </h2>
        <h3 className="text-3xl font-black text-slate-950 tracking-tight mb-12">
          What Parents & Teachers Say
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Testimonial 1 */}
          <Card className="border-slate-200/80 bg-white p-8 rounded-2xl relative">
            <div className="flex items-center gap-0.5 text-amber-500 mb-4">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
              "We struggled to find a qualified tutor for Cambridge Physics in Bulawayo. Through Leaner, my son matched with Mrs. Ndlovu. The interactive live classes helped him secure an A*."
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-indigo-50 text-indigo-700 text-[10px] font-bold">PM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs">
                <span className="font-extrabold text-slate-900">Patricia Musonza</span>
                <span className="text-[10px] text-slate-400">Parent, Bulawayo</span>
              </div>
            </div>
          </Card>

          {/* Testimonial 2 */}
          <Card className="border-slate-200/80 bg-white p-8 rounded-2xl relative">
            <div className="flex items-center gap-0.5 text-amber-500 mb-4">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
              "Uploading my past-paper worksheets to the Leaner Resource library has been a game-changer. I earn extra income monthly to supplement my teaching salary, and the payouts are instant."
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-emerald-50 text-emerald-700 text-[10px] font-bold">TM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs">
                <span className="font-extrabold text-slate-900">Tendai Mutasa</span>
                <span className="text-[10px] text-slate-400">Math Teacher, Harare</span>
              </div>
            </div>
          </Card>

          {/* Testimonial 3 */}
          <Card className="border-slate-200/80 bg-white p-8 rounded-2xl relative">
            <div className="flex items-center gap-0.5 text-amber-500 mb-4">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
              "Living in a low-reception area in Matebeleland, my daughter uses the WhatsApp OCR bot. She takes photos of biology textbook questions and gets detailed syllabus explanations instantly without internet lag."
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-50 text-purple-700 text-[10px] font-bold">DK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs">
                <span className="font-extrabold text-slate-900">Dumiso Khumalo</span>
                <span className="text-[10px] text-slate-400">Parent, Gwanda</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/85 bg-slate-100 py-12 text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          
          {/* Logo col */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-base">
                L
              </span>
              <span className="text-lg font-black text-slate-900 tracking-tight">Leaner</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Southern Africa's unified marketplace for live educational cohorts and digital study resources. Built by teachers, for classrooms.
            </p>
          </div>

          {/* Markets col */}
          <div>
            <h5 className="font-bold text-xs text-slate-800 uppercase tracking-widest mb-3">Resources & Marketplace</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#resources" className="hover:underline hover:text-slate-800">Browse Study Notes</a></li>
              <li><a href="#resources" className="hover:underline hover:text-slate-800">Worked Exam Papers</a></li>
              <li><a href="#resources" className="hover:underline hover:text-slate-800">PPT Lesson Slides</a></li>
              <li><a href="#creator-portal" className="hover:underline hover:text-slate-800">Become a Creator Seller</a></li>
            </ul>
          </div>

          {/* Live Classes col */}
          <div>
            <h5 className="font-bold text-xs text-slate-800 uppercase tracking-widest mb-3">Live Cohort Tutoring</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#tutors" className="hover:underline hover:text-slate-800">Cambridge Syllabus Prep</a></li>
              <li><a href="#tutors" className="hover:underline hover:text-slate-800">ZIMSEC Syllabus Bootcamps</a></li>
              <li><a href="#tutors" className="hover:underline hover:text-slate-800">Matric/IEB Intensive Class</a></li>
              <li><a href="#tutors" className="hover:underline hover:text-slate-800">Schedule Demo / Consultation</a></li>
            </ul>
          </div>

          {/* Low data col */}
          <div>
            <h5 className="font-bold text-xs text-slate-800 uppercase tracking-widest mb-3">WhatsApp & AI Services</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#whatsapp" className="hover:underline hover:text-slate-800">OCR Homework Assistant</a></li>
              <li><a href="#whatsapp" className="hover:underline hover:text-slate-800">Tutor Matchmaker Agent</a></li>
              <li><a href="#whatsapp" className="hover:underline hover:text-slate-800">Teacher Lesson planner Bot</a></li>
              <li><a href="#" className="hover:underline hover:text-slate-800">Data Optimization Tips</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Leaner. Built for modern African classrooms.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
