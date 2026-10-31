import { Asset, Transaction } from "@/types/investmentsTypes";
import { ReceiptText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RecentTransactionsProps {
  transactions: Transaction[];
  assets: Asset[];
}

const RecentTransactions = ({
  transactions,
  assets,
}: RecentTransactionsProps) => {
  const getAssetDetails = (assetId: string) => {
    return (
      assets.find((a) => a.id === assetId) || {
        name: "Unknown Asset",
        ticker: "???",
      }
    );
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const displayedTransactions = sortedTransactions.slice(0, 4);

  const formatDate = (dateValue: string | Date) => {
    return new Date(dateValue).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-first border border-fourth/20 p-6 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-black text-second">Recent Ledger</h3>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center flex-1">
          <div className="h-10 w-10 rounded-full bg-fourth/10 flex items-center justify-center text-fourth mb-3">
            <ReceiptText className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold text-second">No transactions yet</p>
          <p className="text-xs text-fourth mt-1">
            Your logged trades will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-between">
          <div className="space-y-4">
            {displayedTransactions.map((tx) => {
              const asset = getAssetDetails(tx.assetId);
              const isBuy = tx.type === "BUY";

              return (
                <div
                  key={tx.id} // <-- 3. Using the real DB ID instead of array index!
                  className="flex items-start justify-between border-b border-fourth/10 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded ${isBuy ? "bg-third/10 text-third border border-third/20" : "bg-fourth/10 text-fourth border border-fourth/20"}`}
                      >
                        {tx.type}
                      </span>
                      <span className="text-sm font-bold text-second">
                        {asset.name} ({asset.ticker})
                      </span>
                    </div>
                    <span className="text-xs text-fourth font-medium">
                      {formatDate(tx.date)}
                    </span>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${!isBuy ? "text-fourth" : "text-second"}`}
                    >
                      {isBuy ? "+" : "-"} {tx.amount} {asset.ticker}
                    </p>
                    <p className="text-xs text-fourth font-medium mt-0.5">
                      @ €
                      {tx?.price?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {transactions.length > 0 && (
            <Link href="/investments/history" className="block mt-6">
              <Button
                variant="ghost"
                className="w-full text-third hover:text-third hover:bg-third/10 font-bold text-xs"
              >
                View Full History <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
