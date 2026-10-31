"use client";

import { useState, useEffect } from "react";
import { Asset, AssetCategory, Transaction } from "@/types/investmentsTypes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState<AssetCategory | "ALL">(
    "ALL",
  );
  const [assetFilter, setAssetFilter] = useState<string | null>("ALL");
  const [sortBy, setSortBy] = useState<
    "DATE_DESC" | "DATE_ASC" | "AMOUNT_DESC"
  >("DATE_DESC");

  useEffect(() => {
    const fetchHistoryData = async () => {
      const token = localStorage.getItem("valar_token");
      if (!token) return;

      try {
        const [assetsRes, txRes] = await Promise.all([
          fetch("http://127.0.0.1:3001/assets", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://127.0.0.1:3001/transactions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (assetsRes.ok) setAssets(await assetsRes.json());
        if (txRes.ok) setTransactions(await txRes.json());
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  const getAssetDetails = (assetId: string) =>
    assets.find((a) => a.id === assetId);

  const filteredTxs = transactions
    .filter((tx) => {
      const asset = getAssetDetails(tx.assetId);
      if (!asset) return false;

      const matchesCategory =
        categoryFilter === "ALL" || asset.category === categoryFilter;
      const matchesAsset = assetFilter === "ALL" || asset.id === assetFilter;

      return matchesCategory && matchesAsset;
    })
    .sort((a, b) => {
      if (sortBy === "DATE_DESC")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "DATE_ASC")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "AMOUNT_DESC")
        return b.amount * b.price - a.amount * a.price;
      return 0;
    });

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDeleteTx = async (txId: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== txId));
    console.log(`Need to delete tx ${txId} from database!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-first">
        <Loader2 className="h-8 w-8 animate-spin text-third" />
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-first text-second p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/investments">
            <Button
              variant="ghost"
              className="text-fourth hover:text-second hover:bg-fourth/10 px-3"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-black text-second">Ledger History</h1>
        </div>

        {/* Filters & Sort Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-first border border-fourth/20 p-4 rounded-xl">
          <Select
            value={categoryFilter}
            onValueChange={(val: any) => setCategoryFilter(val)}
          >
            <SelectTrigger className="bg-first border-fourth/20 text-second focus:ring-third/50 h-11 rounded-lg">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-first border-fourth/20 text-second">
              <SelectItem
                value="ALL"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                All Categories
              </SelectItem>
              <SelectItem
                value="STOCKS"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Stocks
              </SelectItem>
              <SelectItem
                value="CRYPTO"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Crypto
              </SelectItem>
              <SelectItem
                value="CASH"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Cash
              </SelectItem>
              <SelectItem
                value="CASH_PILLOW"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Cash Pillow
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={assetFilter || "ALL"} onValueChange={setAssetFilter}>
            <SelectTrigger className="bg-first border-fourth/20 text-second focus:ring-third/50 h-11 rounded-lg">
              <SelectValue placeholder="All Assets" />
            </SelectTrigger>
            <SelectContent className="bg-first border-fourth/20 text-second">
              <SelectItem
                value="ALL"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                All Assets
              </SelectItem>
              {assets.map((a) => (
                <SelectItem
                  key={a.id}
                  value={a.id}
                  className="cursor-pointer focus:bg-fourth/10 focus:text-second"
                >
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
            <SelectTrigger className="bg-first border-fourth/20 text-second focus:ring-third/50 h-11 rounded-lg">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-first border-fourth/20 text-second">
              <SelectItem
                value="DATE_DESC"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Date (Newest First)
              </SelectItem>
              <SelectItem
                value="DATE_ASC"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Date (Oldest First)
              </SelectItem>
              <SelectItem
                value="AMOUNT_DESC"
                className="cursor-pointer focus:bg-fourth/10 focus:text-second"
              >
                Total Value (Highest)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions List */}
        <div className="bg-first border border-fourth/20 rounded-2xl overflow-hidden shadow-xl">
          {filteredTxs.length === 0 ? (
            <div className="p-16 text-center text-fourth font-medium flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-fourth/10 flex items-center justify-center mb-4">
                <ArrowLeft className="h-6 w-6 opacity-50" />
              </div>
              No transactions found matching your filters.
            </div>
          ) : (
            <div className="divide-y divide-fourth/10">
              {filteredTxs.map((tx) => {
                const asset = getAssetDetails(tx.assetId);
                const isBuy = tx.type === "BUY";
                if (!asset) return null;

                return (
                  <div
                    key={tx.id} // ✅ Using real DB ID
                    className="p-5 flex items-center justify-between hover:bg-fourth/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-black tracking-wider px-2 py-1 rounded w-14 text-center ${isBuy ? "bg-third/10 text-third" : "bg-fourth/10 text-fourth"}`}
                      >
                        {tx.type}
                      </span>
                      <div>
                        <p className="text-second font-bold">
                          {asset.name}{" "}
                          <span className="text-fourth text-xs font-medium ml-1">
                            ({asset.ticker})
                          </span>
                        </p>
                        <p className="text-fourth text-xs mt-0.5">
                          {formatDate(tx.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-second font-bold">
                          {isBuy ? "+" : "-"}
                          {tx.amount} {asset.ticker}
                        </p>
                        <p className="text-fourth text-xs mt-0.5">
                          @ €
                          {tx.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          = €
                          {(tx.amount * tx.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteTx(tx.id)}
                        className="p-2 text-fourth hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Transaction"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
