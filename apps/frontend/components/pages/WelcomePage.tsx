"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("valar_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-first flex flex-col justify-between">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8 my-auto">
        {/* Badge */}
        <div className="inline-flex items-center capitalize gap-2 px-3.5 py-1.5 rounded-full bg-third text-first text-xs font-bold tracking-wide">
          <Sparkles className="h-3.5 w-3.5" />
          All men must serve
          <Sparkles className="h-3.5 w-3.5" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-second max-w-4xl mx-auto leading-tight">
          Master your wealth, health, and{" "}
          <span className="text-third">memories</span> in one place.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-fourth max-w-2xl mx-auto font-normal">
          Valar is your private digital command center. Track investments,
          monitor daily caloric intake, and archive life's milestones with zero
          bloat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto cursor-pointer bg-third hover:bg-third/90 text-first font-bold px-8 py-6 text-base shadow-[0_0_25px] shadow-third/30 flex items-center gap-2"
            >
              Enter Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto cursor-pointer border-fourth bg-first text-second font-medium px-8 py-6 text-base hover:bg-fourth hover:text-first transition-colors"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left"
        >
          <div className="p-6 rounded-2xl bg-first border border-fourth/30 hover:border-third transition-colors">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-third text-first mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-second">
              Financial Tracking
            </h3>
            <p className="text-sm text-fourth mt-1">
              Monitor net worth, assets, and investments with real-time
              portfolio data visualization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-first border border-fourth/30 hover:border-third transition-colors">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-third text-first mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-second">
              Health & Routine
            </h3>
            <p className="text-sm text-fourth mt-1">
              Log daily calories, workout streaks, and meals with instant macro
              progress bars.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-first border border-fourth/30 hover:border-third transition-colors">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-third text-first mb-4">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-second">
              Milestone Counters
            </h3>
            <p className="text-sm text-fourth mt-1">
              Keep tabs on sporadic life events—like how many times you hit the
              beach this year.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-6 border-t border-fourth/20 text-center text-xs text-fourth">
        Valar Life Dashboard © 2026 • Built with Next.js, Shadcn & Tailwind
      </footer>
    </main>
  );
}
