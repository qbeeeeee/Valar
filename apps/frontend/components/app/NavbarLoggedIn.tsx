"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LineChart, Activity, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const NavbarLoggedIn = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("valar_token");
    router.push("/sign-in");
  };

  return (
    <header className="sticky top-0 z-50 h-20 bg-third border-b border-first">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            {/* Logo Icon - Black background, Pink letter */}
            <div className="h-9 w-9 rounded-xl bg-first flex items-center justify-center text-third font-black shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105">
              V
            </div>
            <span className="text-lg font-bold tracking-wider text-first">
              Valar
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm text-first">
          {/* Active Link (Dashboard) */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Dashboard
          </Link>

          {/* Inactive Links */}
          <Link
            href="/investments"
            className="flex items-center gap-2 font-medium opacity-70 hover:opacity-100 transition-opacity"
          >
            <LineChart className="h-4.5 w-4.5" />
            Investments
          </Link>
          <Link
            href="/health"
            className="flex items-center gap-2 font-medium opacity-70 hover:opacity-100 transition-opacity"
          >
            <Activity className="h-4.5 w-4.5" />
            Health & Routine
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleLogout}
            size="lg"
            className="bg-first hover:bg-first/80 text-third font-bold cursor-pointer flex items-center gap-2 shadow-md transition-all"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavbarLoggedIn;
