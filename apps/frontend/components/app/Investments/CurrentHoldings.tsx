import { useState } from "react";
import { Asset, AssetCategory } from "@/types/investmentsTypes";
import { Button } from "@/components/ui/button";
import { Coins, Database, Plus, Trash2 } from "lucide-react";

export type CalculatedHolding = Asset & {
  totalUnits: number;
  currentValue: number;
  avgBuyPrice: number;
  totalInvested: number;
};

interface CurrentHoldingsProps {
  holdings: CalculatedHolding[];
  onOpenAdd: () => void;
  onRemove: (id: string) => void;
}

const CATEGORIES: { label: string; value: AssetCategory | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Stocks", value: "STOCKS" },
  { label: "Crypto", value: "CRYPTO" },
  { label: "Cash", value: "CASH" },
  { label: "Pillow", value: "CASH_PILLOW" },
];

const CurrentHoldings = ({
  holdings,
  onOpenAdd,
  onRemove,
}: CurrentHoldingsProps) => {
  const [activeFilter, setActiveFilter] = useState<AssetCategory | "ALL">(
    "ALL",
  );

  const filteredHoldings = holdings
    .filter((asset) =>
      activeFilter === "ALL" ? true : asset.category === activeFilter,
    )
    .sort((a, b) => b.currentValue - a.currentValue);

  return (
    <div className="lg:col-span-2 bg-first border border-fourth/20 p-6 rounded-2xl flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-black text-second">Current Holdings</h3>

        {holdings.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === cat.value
                    ? "bg-third text-first"
                    : "bg-fourth/10 text-fourth hover:text-second hover:bg-fourth/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredHoldings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-fourth/20 rounded-xl bg-fourth/5 flex-1">
          <div className="h-14 w-14 rounded-2xl bg-fourth/10 flex items-center justify-center text-fourth mb-5">
            <Database className="h-6 w-6" />
          </div>
          <h4 className="text-second text-lg font-black mb-2">
            No Assets Tracked
          </h4>
          <p className="text-fourth text-sm mb-6 max-w-sm">
            {activeFilter !== "ALL"
              ? `No assets found in this category.`
              : `You have no assets in your list. Add one here to start logging transactions.`}
          </p>
          <Button
            onClick={onOpenAdd}
            className="bg-first border border-third text-third hover:bg-third/10 font-bold"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Your First Asset
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHoldings.map((asset) => (
            <div
              key={asset.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-fourth/10 hover:border-third/50 transition-colors group gap-4"
            >
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="h-10 w-10 rounded-xl bg-second flex items-center justify-center text-first group-hover:bg-third transition-colors">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-second flex items-center gap-2">
                    {asset.name}{" "}
                    <span className="text-xs text-fourth font-medium px-1.5 py-0.5 rounded bg-fourth/10 border border-fourth/20">
                      {asset.ticker}
                    </span>
                  </p>
                  {/* Clean text indicating average buy cost without the edit button */}
                  <span className="text-xs text-fourth font-medium mt-1 block">
                    Avg Cost: €
                    {asset.avgBuyPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end min-w-[120px]">
                  <span className="text-[10px] font-bold text-fourth uppercase tracking-wider mb-0.5">
                    Total Value
                  </span>
                  <p className="text-base font-black text-second">
                    €
                    {asset.currentValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-fourth font-medium">
                      {asset.totalUnits} {asset.ticker}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(asset.id)}
                  className="p-2 text-fourth hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove Asset"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentHoldings;
