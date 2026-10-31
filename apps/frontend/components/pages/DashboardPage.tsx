import React from "react";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Flame,
  Palmtree,
  ArrowUpRight,
  Plus,
  Wallet,
  Activity,
  Calendar,
  Sparkles,
} from "lucide-react";

const DashboardPage = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-first text-second p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-first border border-fourth/20 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 text-third text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              Life Command Center
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-second">
              Welcome back.
            </h1>
            <p className="text-fourth text-sm mt-1">
              Here is your overview for today. Your investments are steady, and
              your routines are awaiting your log.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-third hover:bg-third/80 text-first font-bold shadow-[0_0_15px_rgba(255,51,102,0.3)] transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Quick Log
            </Button>
          </div>
        </div>

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Investments / Net Worth */}
          <div className="bg-first border border-fourth/20 p-6 rounded-2xl relative overflow-hidden group hover:border-third transition-all">
            <div className="absolute top-0 right-0 p-6 text-fourth/10 group-hover:text-third/20 transition-colors">
              <Wallet className="h-12 w-12" />
            </div>
            <div className="flex items-center gap-2 text-second text-sm font-bold">
              <TrendingUp className="h-4 w-4 text-third" />
              Total Net Worth
            </div>
            <div className="text-3xl font-black tracking-tight text-second mt-3">
              $142,850.<span className="text-fourth text-xl">00</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs">
              <span className="text-third font-bold bg-third/10 px-2 py-0.5 rounded border border-third/20">
                +4.2%
              </span>
              <span className="text-fourth font-medium">vs. last month</span>
            </div>
          </div>

          {/* Card 2: Health & Calories */}
          <div className="bg-first border border-fourth/20 p-6 rounded-2xl relative overflow-hidden group hover:border-third transition-all">
            <div className="absolute top-0 right-0 p-6 text-fourth/10 group-hover:text-third/20 transition-colors">
              <Flame className="h-12 w-12" />
            </div>
            <div className="flex items-center gap-2 text-second text-sm font-bold">
              <Activity className="h-4 w-4 text-third" />
              Today's Calories
            </div>
            <div className="text-3xl font-black tracking-tight text-second mt-3">
              1,850 <span className="text-fourth text-xl">/ 2,400 kcal</span>
            </div>
            <div className="w-full bg-fourth/20 rounded-full h-2 mt-4 overflow-hidden border border-first">
              <div
                className="bg-third h-full rounded-full shadow-[0_0_10px_rgba(255,51,102,0.8)]"
                style={{ width: "77%" }}
              ></div>
            </div>
          </div>

          {/* Card 3: Milestone Tracker (Beach Counter) */}
          <div className="bg-first border border-fourth/20 p-6 rounded-2xl relative overflow-hidden group hover:border-third transition-all">
            <div className="absolute top-0 right-0 p-6 text-fourth/10 group-hover:text-third/20 transition-colors">
              <Palmtree className="h-12 w-12" />
            </div>
            <div className="flex items-center gap-2 text-second text-sm font-bold">
              <Calendar className="h-4 w-4 text-third" />
              Beach Trips (This Year)
            </div>
            <div className="text-3xl font-black tracking-tight text-third mt-3">
              12 <span className="text-second text-xl font-normal">times</span>
            </div>
            <span className="text-xs text-fourth font-medium mt-4 block">
              Last visit: 3 days ago 🌊
            </span>
          </div>
        </div>

        {/* Secondary Section / Quick Activity Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Logs Feed */}
          <div className="lg:col-span-2 bg-first border border-fourth/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-second">
                Recent Activity Log
              </h3>
              <button className="text-xs text-fourth hover:text-third font-bold flex items-center gap-1 transition-colors">
                View all history <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Feed Item 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-fourth/10 hover:border-third/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-second flex items-center justify-center text-first group-hover:bg-third transition-colors">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-second">
                      Logged Meal: Post-Workout Dinner
                    </p>
                    <span className="text-xs text-fourth font-medium">
                      650 kcal • Protein: 45g
                    </span>
                  </div>
                </div>
                <span className="text-xs text-fourth">2 hours ago</span>
              </div>

              {/* Feed Item 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-fourth/10 hover:border-third/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-second flex items-center justify-center text-first group-hover:bg-third transition-colors">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-second">
                      Portfolio Update: S&P 500 Dividend
                    </p>
                    <span className="text-xs text-third font-bold">
                      +$142.50 added to assets
                    </span>
                  </div>
                </div>
                <span className="text-xs text-fourth">Today</span>
              </div>

              {/* Feed Item 3 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-fourth/10 hover:border-third/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-second flex items-center justify-center text-first group-hover:bg-third transition-colors">
                    <Palmtree className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-second">
                      Milestone Tag: Sunset at the Beach
                    </p>
                    <span className="text-xs text-fourth font-medium">
                      Beach trip #12 logged for the year
                    </span>
                  </div>
                </div>
                <span className="text-xs text-fourth">3 days ago</span>
              </div>
            </div>
          </div>

          {/* Quick Stats / Quick Actions Sidebar */}
          <div className="bg-first border border-fourth/20 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-second mb-4">
                Quick Shortcuts
              </h3>
              <div className="space-y-2.5">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-first hover:bg-third/10 border border-fourth/20 hover:border-third transition-all text-sm font-bold text-second flex items-center justify-between group">
                  <span>+ Record Meal & Calories</span>
                  <span className="text-fourth group-hover:text-third group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-first hover:bg-third/10 border border-fourth/20 hover:border-third transition-all text-sm font-bold text-second flex items-center justify-between group">
                  <span>+ Log Investment Buy</span>
                  <span className="text-fourth group-hover:text-third group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-first hover:bg-third/10 border border-fourth/20 hover:border-third transition-all text-sm font-bold text-second flex items-center justify-between group">
                  <span>+ Add Life Milestone</span>
                  <span className="text-fourth group-hover:text-third group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-fourth/20 text-center">
              <p className="text-xs font-medium text-fourth">
                Valar Dashboard v1.0 • Connected to Local State
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
