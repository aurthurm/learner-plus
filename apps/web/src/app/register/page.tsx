"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ArrowLeft, ArrowRight, Check, ShieldCheck, GraduationCap, Users, User, Landmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// User roles
type UserRole = "learner" | "parent" | "teacher" | "school";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setRole] = useState<UserRole>("learner");
  
  // Form States
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  
  // Contextual Role States
  // Learner
  const [curriculum, setCurriculum] = useState("zimsec");
  const [gradeLevel, setGradeLevel] = useState("o-level");
  // Parent
  const [numStudents, setNumStudents] = useState("1");
  const [studentLinkCode, setStudentLinkCode] = useState("");
  // Teacher
  const [subjects, setSubjects] = useState("");
  const [hourlyRate, setHourlyRate] = useState("10.00");
  const [payoutMethod, setPayoutMethod] = useState("ecocash");
  // School
  const [schoolName, setSchoolName] = useState("");
  const [schoolSize, setSchoolSize] = useState("50-200");
  const [schoolCurriculum, setSchoolCurriculum] = useState("mixed");

  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else if (step === 3) {
      // Simulate API submit
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(4);
      }, 1000);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    handleNextStep();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center items-center p-6 md:p-12 font-sans">
      
      {/* Back button */}
      <Link href="/" className="self-start md:absolute md:top-12 md:left-12 text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-6 md:mb-0">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="w-full max-w-xl">
        
        {/* Progress Bar (except success step) */}
        {step < 4 && (
          <div className="flex justify-between items-center mb-8 px-2 max-w-sm mx-auto">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              1
            </div>
            <div className={`h-1 flex-grow mx-2 rounded-full ${step >= 2 ? "bg-indigo-600" : "bg-slate-200"}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              2
            </div>
            <div className={`h-1 flex-grow mx-2 rounded-full ${step >= 3 ? "bg-indigo-600" : "bg-slate-200"}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              3
            </div>
          </div>
        )}

        <Card className="border-slate-200/80 shadow-xl rounded-2xl bg-white w-full overflow-hidden">
          
          {/* STEP 1: Role Selection ( Vibe Outschool style role selector cards) */}
          {step === 1 && (
            <>
              <CardHeader className="space-y-1.5 p-6 md:p-8 text-center">
                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Create Your Account</CardTitle>
                <CardDescription className="text-xs text-slate-500 font-medium">
                  Welcome to Leaner! Choose your primary account role to get started.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Learner Card */}
                <div 
                  onClick={() => handleRoleSelect("learner")}
                  className="group border border-slate-100 hover:border-indigo-500 bg-slate-50/50 hover:bg-white p-5 rounded-2xl cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Student / Learner</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Book live tutoring cohorts and access study guides.</p>
                  </div>
                </div>

                {/* Parent Card */}
                <div 
                  onClick={() => handleRoleSelect("parent")}
                  className="group border border-slate-100 hover:border-indigo-500 bg-slate-50/50 hover:bg-white p-5 rounded-2xl cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Parent / Guardian</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Oversee schedules, payments, and linking to child profiles.</p>
                  </div>
                </div>

                {/* Teacher Card */}
                <div 
                  onClick={() => handleRoleSelect("teacher")}
                  className="group border border-slate-100 hover:border-indigo-500 bg-slate-50/50 hover:bg-white p-5 rounded-2xl cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Teacher / Tutor</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Launch cohorts, sell syllabus files, and manage lessons.</p>
                  </div>
                </div>

                {/* School Card */}
                <div 
                  onClick={() => handleRoleSelect("school")}
                  className="group border border-slate-100 hover:border-indigo-500 bg-slate-50/50 hover:bg-white p-5 rounded-2xl cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">School / Academy</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Multi-tenant management for teachers, curriculum and reports.</p>
                  </div>
                </div>

              </CardContent>
              
              <CardFooter className="p-6 md:p-8 pt-0 justify-center text-xs text-slate-400 border-t border-slate-50/80 bg-slate-50/30">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:underline font-bold ml-1">
                  Log In
                </Link>
              </CardFooter>
            </>
          )}

          {/* STEP 2: Basic Account Details */}
          {step === 2 && (
            <>
              <CardHeader className="space-y-1.5 p-6 md:p-8">
                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Account details</CardTitle>
                <CardDescription className="text-xs text-slate-500 font-medium">
                  Enter your core contact information. You selected **{role.toUpperCase()}** account.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8 pt-0 space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-bold text-slate-700">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="First and last name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                {/* Email or Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="emailOrPhone" className="text-xs font-bold text-slate-700">Email Address / Phone Number</Label>
                  <Input 
                    id="emailOrPhone" 
                    type="text" 
                    placeholder="email@address.com or +26377..." 
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="pass" className="text-xs font-bold text-slate-700">Password</Label>
                  <Input 
                    id="pass" 
                    type="password" 
                    placeholder="Choose a secure password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-200 rounded-xl"
                  />
                </div>

              </CardContent>

              <CardFooter className="p-6 md:p-8 pt-0 border-t border-slate-50/80 bg-slate-50/30 flex justify-between gap-3">
                <Button variant="ghost" onClick={handlePrevStep} className="font-bold text-slate-600">
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep} 
                  disabled={!fullName || !emailOrPhone || !password}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 rounded-xl flex items-center gap-1 shadow-sm"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 3: Contextual / Role-Specific details */}
          {step === 3 && (
            <>
              <CardHeader className="space-y-1.5 p-6 md:p-8">
                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
                  {role === "learner" && "Learner Syllabus Selection"}
                  {role === "parent" && "Guardian Linkage details"}
                  {role === "teacher" && "Educator Subjects & Payouts"}
                  {role === "school" && "Academy Institutional Scope"}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 font-medium">
                  Provide details to configure your dashboard workspace correctly.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8 pt-0 space-y-4">
                
                {/* 3A: Learner Specific */}
                {role === "learner" && (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Curriculum Target</Label>
                      <Select value={curriculum} onValueChange={(val) => val && setCurriculum(val)}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select curriculum" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="zimsec">ZIMSEC (Zimbabwe Local Board)</SelectItem>
                          <SelectItem value="cambridge">Cambridge (IGCSE & A-Level)</SelectItem>
                          <SelectItem value="ieb">IEB (CAPS Matriculation)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Grade Level / Form</Label>
                      <Select value={gradeLevel} onValueChange={(val) => val && setGradeLevel(val)}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select Grade" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="form-1-2">Form 1 & 2 (Ages 12-14)</SelectItem>
                          <SelectItem value="o-level">Form 3 & 4 (O-Level, Ages 14-16)</SelectItem>
                          <SelectItem value="a-level">Form 5 & 6 (A-Level, Ages 16-18)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* 3B: Parent Specific */}
                {role === "parent" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="numStudents" className="text-xs font-bold text-slate-700">Number of Children Registered</Label>
                      <Input 
                        id="numStudents"
                        type="number" 
                        value={numStudents}
                        onChange={(e) => setNumStudents(e.target.value)}
                        className="border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="linkCode" className="text-xs font-bold text-slate-700">Student Profile Link Code (Optional)</Label>
                      <Input 
                        id="linkCode"
                        type="text" 
                        placeholder="e.g. L-548-STU"
                        value={studentLinkCode}
                        onChange={(e) => setStudentLinkCode(e.target.value)}
                        className="border-slate-200 rounded-xl"
                      />
                      <p className="text-[10px] text-slate-400">Used to link reports directly to your child's profile workspace.</p>
                    </div>
                  </>
                )}

                {/* 3C: Teacher Specific */}
                {role === "teacher" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="subj" className="text-xs font-bold text-slate-700">Primary Teaching Subject(s)</Label>
                      <Input 
                        id="subj"
                        type="text" 
                        placeholder="e.g. Mathematics, Physics"
                        value={subjects}
                        onChange={(e) => setSubjects(e.target.value)}
                        className="border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="rate" className="text-xs font-bold text-slate-700">Hourly Tutoring rate ($ USD)</Label>
                      <Input 
                        id="rate"
                        type="number" 
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Preferred Payout Channel</Label>
                      <Select value={payoutMethod} onValueChange={(val) => val && setPayoutMethod(val)}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select payout type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="ecocash">EcoCash Mobile Money</SelectItem>
                          <SelectItem value="innbucks">InnBucks Wallet</SelectItem>
                          <SelectItem value="bank">Bank Transfer (FCA / RTGS)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* 3D: School Specific */}
                {role === "school" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="schName" className="text-xs font-bold text-slate-700">School / Academy Name</Label>
                      <Input 
                        id="schName"
                        type="text" 
                        placeholder="e.g. Churchill High School"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Enrollment / School Size</Label>
                      <Select value={schoolSize} onValueChange={(val) => val && setSchoolSize(val)}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select School Size" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="under-50">Under 50 students</SelectItem>
                          <SelectItem value="50-200">50 - 200 students</SelectItem>
                          <SelectItem value="over-200">Over 200 students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">School Curriculum Type</Label>
                      <Select value={schoolCurriculum} onValueChange={(val) => val && setSchoolCurriculum(val)}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select Curriculum" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="zimsec">ZIMSEC-Only</SelectItem>
                          <SelectItem value="cambridge">Cambridge-Only</SelectItem>
                          <SelectItem value="mixed">Mixed Syllabus offerings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

              </CardContent>

              <CardFooter className="p-6 md:p-8 pt-0 border-t border-slate-50/80 bg-slate-50/30 flex justify-between gap-3">
                <Button variant="ghost" onClick={handlePrevStep} className="font-bold text-slate-600">
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep} 
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 rounded-xl flex items-center gap-1 shadow-sm"
                >
                  {isLoading ? "Submitting..." : "Complete Setup"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && (
            <div className="p-8 md:p-12 text-center flex flex-col items-center gap-6">
              <div className="h-16 w-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-600 shadow-sm animate-bounce">
                <ShieldCheck className="h-10 w-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Account Created Successfully!</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                  Your Leaner account has been successfully configured. You can now launch your dynamic portal dashboard.
                </p>
              </div>

              <Button 
                onClick={() => {
                  // Route to dashboard with active state role passed as query
                  router.push(`/dashboard?role=${role}`);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-8 py-5 rounded-xl shadow-md flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
}
