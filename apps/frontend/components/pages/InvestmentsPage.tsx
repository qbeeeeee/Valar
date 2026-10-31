"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRightLeft, Sparkles, Loader2 } from "lucide-react";
import AddAssetModal from "../app/Investments/AddAssetModal";
import AssetOverview from "../app/Investments/AssetOverview";
import CurrentHoldings from "../app/Investments/CurrentHoldings";
import NewTransactionModal from "../app/Investments/NewTransactionModal";
import RecentTransactions from "../app/Investments/RecentTransactions";
import { Asset, Transaction } from "@/types/investmentsTypes";

export default function InvestmentsPage() {
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [customAssetList, setCustomAssetList] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
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

        if (assetsRes.ok) {
          const assetsData = await assetsRes.json();
          setCustomAssetList(assetsData);
        }

        if (txRes.ok) {
          const txData = await txRes.json();
          setTransactions(txData);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const { holdings, totalNetWorth } = useMemo(() => {
    let netWorth = 0;

    const calculatedHoldings = customAssetList.map((asset) => {
      const assetTxs = transactions.filter((tx) => tx.assetId === asset.id);

      let totalUnits = 0;
      let netCashInvested = 0;

      assetTxs.forEach((tx) => {
        if (tx.type === "BUY") {
          totalUnits += tx.amount;
          netCashInvested += tx.amount * tx.price;
        }
        if (tx.type === "SELL") {
          totalUnits -= tx.amount;
          netCashInvested -= tx.amount * tx.price;
        }
      });

      const breakEvenPrice = totalUnits > 0 ? netCashInvested / totalUnits : 0;
      const currentValue = totalUnits > 0 ? netCashInvested : 0;

      netWorth += currentValue;

      return {
        ...asset,
        totalUnits,
        currentValue,
        avgBuyPrice: breakEvenPrice,
        totalInvested: netCashInvested,
      };
    });

    return { holdings: calculatedHoldings, totalNetWorth: netWorth };
  }, [customAssetList, transactions]);

  const handleAddNewAsset = (newAsset: Asset) => {
    setCustomAssetList((prev) => [newAsset, ...prev]);
    setIsAssetModalOpen(false);
  };

  const handleRemoveAsset = (id: string) => {
    setCustomAssetList((prev) => prev.filter((asset) => asset.id !== id));
  };

  const handleAddNewTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
    setIsTxModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-first">
        <Loader2 className="h-8 w-8 animate-spin text-third" />
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-first text-second p-6 md:p-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-first border border-fourth/20 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 text-third text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" /> Wealth Command
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-second">
              Portfolio & Transactions
            </h1>
            <p className="text-fourth text-sm mt-1">
              Track your net worth, cash reserves, and calculate average asset
              pricing automatically.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsTxModalOpen(true)}
              disabled={customAssetList.length === 0}
              className="bg-third hover:bg-third/80 text-first font-bold shadow-[0_0_15px_rgba(255,51,102,0.3)] transition-all"
            >
              <ArrowRightLeft className="h-4 w-4 mr-2" /> Log Transaction
            </Button>
          </div>
        </div>

        <AssetOverview totalNetWorth={totalNetWorth} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CurrentHoldings
            holdings={holdings}
            onOpenAdd={() => setIsAssetModalOpen(true)}
            onRemove={handleRemoveAsset}
          />

          <div className="space-y-6">
            <div className="bg-first border border-fourth/20 p-6 rounded-2xl">
              <h3 className="text-lg font-black text-second mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => setIsTxModalOpen(true)}
                  disabled={customAssetList.length === 0}
                  className="w-full text-left px-4 py-3 rounded-xl bg-first hover:bg-third/10 border border-fourth/20 hover:border-third transition-all text-sm font-bold text-second flex items-center justify-between group disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <ArrowRightLeft className="h-4 w-4 text-third" /> Log Buy /
                    Sell
                  </span>
                  <span className="text-fourth group-hover:text-third group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </button>
                <button
                  onClick={() => setIsAssetModalOpen(true)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-first hover:bg-third/10 border border-fourth/20 hover:border-third transition-all text-sm font-bold text-second flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-third" /> Add Asset to List
                  </span>
                  <span className="text-fourth group-hover:text-third group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </button>
              </div>
            </div>

            <RecentTransactions
              transactions={transactions}
              assets={customAssetList}
            />
          </div>
        </div>
      </div>

      <AddAssetModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onAdd={handleAddNewAsset}
      />
      <NewTransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        holdings={holdings}
        onSubmitTx={handleAddNewTransaction}
      />
    </main>
  );
}
