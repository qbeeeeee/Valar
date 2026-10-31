// mockData.ts

// ==========================================
// 1. INVESTMENT PORTFOLIO (Ledger System)
// ==========================================

// Define the assets you track
export const assets = [
  { id: "ast_btc", ticker: "BTC", name: "Bitcoin", category: "Crypto" },
  { id: "ast_voo", ticker: "VOO", name: "S&P 500", category: "Stocks" },
  { id: "ast_cash", ticker: "EUR", name: "Emergency Fund", category: "Cash" },
  { id: "ast_re", ticker: "RE", name: "Apartment", category: "Real Estate" },
];

// Instead of hardcoding net worth, you log buys and sells.
// The dashboard will loop through these to calculate:
// - Total holdings (Sum of BUY amounts minus SELL amounts)
// - Average Buy Price (Total money spent / Total units bought)
export const portfolioTransactions = [
  {
    id: "tx_001",
    assetId: "ast_btc",
    type: "BUY",
    date: "2024-01-15T10:00:00Z",
    units: 0.5,
    pricePerUnit: 40000,
    totalValue: 20000, // 0.5 * 40000
  },
  {
    id: "tx_002",
    assetId: "ast_btc",
    type: "BUY",
    date: "2024-06-01T12:00:00Z",
    units: 0.25,
    pricePerUnit: 60000,
    totalValue: 15000,
  },
  {
    id: "tx_003",
    assetId: "ast_btc",
    type: "SELL",
    date: "2025-02-10T14:30:00Z",
    units: 0.1,
    pricePerUnit: 80000,
    totalValue: 8000, // Sold for profit. This helps calculate realized gains.
  },
];

// ==========================================
// 2. HEALTH, NUTRITION & WORKOUTS
// ==========================================

// Keyed by the date (YYYY-MM-DD). One single entry per day.
export const dailyHealthLogs = [
  {
    date: "2026-10-16",
    nutrition: {
      calories: 1750,
      protein: 165,
      carbs: 120,
      fats: 65,
    },
    // Can be a string, or an array if you did multiple things (e.g., ["Weights", "Walking"])
    workout: ["Weights", "Walking"],
    steps: 12450,
    // Just dump the strings in an array.
    // To find out 200/365, the app just counts how many days have "Creatine" in this array.
    supplements: ["Protein", "Creatine", "D2", "Magnesium"],
  },
  {
    date: "2026-10-15",
    nutrition: { calories: 2100, protein: 150, carbs: 200, fats: 80 },
    workout: ["Rest"],
    steps: 4200,
    supplements: ["D2", "Magnesium"], // Forgot protein and creatine this day
  },
];

// ==========================================
// 3. LIFESTYLE MILESTONES
// ==========================================

export const milestoneCategories = [
  { id: "cat_snow", name: "Snowboarding", icon: "Snowflake" },
  { id: "cat_beach", name: "Beach Trip", icon: "Palmtree" },
  { id: "cat_travel", name: "City Travel", icon: "Plane" },
  { id: "cat_social", name: "Drinks / Beer", icon: "Beer" },
  { id: "cat_chill", name: "Movie / Board Games", icon: "Sofa" },
];

export const milestoneLogs = [
  {
    id: "ms_001",
    categoryId: "cat_snow",
    date: "2026-01-20T09:00:00Z",
    title: "Weekend in the Alps",
    location: "Chamonix",
  },
  {
    id: "ms_002",
    categoryId: "cat_chill",
    date: "2026-10-14T20:00:00Z",
    title: "Watched Dune Part 2",
    location: "Home",
  },
];

// ==========================================
// 4. WORK & PRODUCTIVITY
// ==========================================

// Also keyed by date. Allows tracking primary job status + flexible side projects.
export const dailyWorkLogs = [
  {
    date: "2026-10-16",
    primaryJob: {
      status: "Worked", // Options: "Worked", "Day Off", "Holiday", "Sick"
      hours: 8,
    },
    // Array handles 0 to infinite side projects per day
    sideProjects: [{ project: "Valar App", hours: 3 }],
  },
  {
    date: "2026-10-15",
    primaryJob: {
      status: "Day Off",
      hours: 0,
    },
    sideProjects: [
      { project: "Family Business", hours: 6 },
      { project: "Valar App", hours: 2 },
    ],
  },
];
