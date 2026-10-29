"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Login authentication
    setTimeout(() => {
      setIsLoading(false);
      // Route directly to unified dashboard
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 grid grid-cols-1 lg:grid-cols-12 font-sans">
      
      {/* Left Column - Decorative & Social Proof (Coral Academy style visual side pane) */}
      <div className="hidden lg:flex lg:col-span-5 bg-indigo-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-950/80 via-indigo-900 to-indigo-950"></div>
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg">
              L
            </span>
            <span className="text-xl font-bold tracking-tight">Leaner</span>
          </Link>
        </div>

        <div className="relative z-10 my-auto max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800 border border-indigo-700 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="h-3 w-3 text-amber-300" />
            Digital Infrastructure for African Educators
          </div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-6">
            Log In to Your Classroom & Marketplace Dashboard
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed mb-8">
            Access your live cohort lessons, download revision guides, manage student assignments, and track digital resources earnings.
          </p>

          <div className="bg-indigo-850/50 border border-indigo-800 p-6 rounded-2xl">
            <p className="text-xs italic text-indigo-200 leading-relaxed mb-4">
              "Being able to sell my lesson plans and physics revision resources has helped me earn three times my teaching salary from my home country. Leaner handles the billing and pays me out instantly via EcoCash."
            </p>
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-indigo-700 text-xs font-bold flex items-center justify-center">
                AS
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white">Dr. Albert Sibanda</span>
                <span className="text-[10px] text-indigo-300">A-Level Physics Teacher, Bulawayo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-indigo-300 flex justify-between">
          <span>© {new Date().getFullYear()} Leaner</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>

      {/* Right Column - Unified Login Form */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md flex flex-col gap-6">
          
          {/* Back button */}
          <Link href="/" className="self-start text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>

          <Card className="border-slate-200/80 shadow-lg rounded-2xl bg-white w-full">
            <CardHeader className="space-y-1.5 p-6 md:p-8">
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</CardTitle>
              <CardDescription className="text-xs text-slate-500 font-medium">
                Enter your details below to log in to your account.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 p-6 md:p-8 pt-0">
                
                {/* Email Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address / Phone Number</Label>
                  <Input 
                    id="email" 
                    type="text" 
                    placeholder="name@domain.com or +26377..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-slate-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-xs font-bold text-slate-700">Password</Label>
                    <a href="#" className="text-[10px] font-bold text-indigo-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-slate-200 focus:border-indigo-500 rounded-xl pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

              </CardContent>

              <CardFooter className="flex flex-col gap-4 p-6 md:p-8 pt-0">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-5 rounded-xl shadow-md transition-transform duration-100 active:scale-95 shrink-0"
                >
                  {isLoading ? "Signing In..." : "Log In"}
                </Button>

                <div className="text-xs text-slate-500 text-center font-medium">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-indigo-600 hover:underline font-bold">
                    Create account
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
