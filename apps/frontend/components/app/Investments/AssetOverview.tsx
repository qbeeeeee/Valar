import { Landmark, LineChart, TrendingUp, Wallet } from "lucide-react";

const AssetOverview = ({ totalNetWorth }: { totalNetWorth: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-first border border-fourth/20 p-6 rounded-2xl relative overflow-hidden group hover:border-third transition-all">
        <div className="absolute top-0 right-0 p-6 text-fourth/10 group-hover:text-third/20 transition-colors">
          <Wallet className="h-12 w-12" />
        </div>
        <div className="flex items-center gap-2 text-second text-sm font-bold">
          <TrendingUp className="h-4 w-4 text-third" /> Total Net Worth
        </div>
        <div className="text-3xl font-black tracking-tight text-second mt-3">
          €
          {totalNetWorth.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs">
          <span className="text-third font-bold bg-third/10 px-2 py-0.5 rounded border border-third/20">
            Live
          </span>
          <span className="text-fourth font-medium">Updated Value</span>
        </div>
      </div>

      <div className="bg-first border border-fourth/20 p-6 rounded-2xl relative overflow-hidden group hover:border-third transition-all">
        <div className="absolute top-0 right-0 p-6 text-fourth/10 group-hover:text-third/20 transition-colors">
          <Landmark className="h-12 w-12" />
        </div>
        <div className="flex items-center gap-2 text-second text-sm font-bold">
          <Landmark className="h-4 w-4 text-third" /> Bank & Cash Reserves
        </div>
        <div className="text-3xl font-black tracking-tight text-second mt-3">
          €15,350.<span className="text-fourth text-xl">00</span>
        </div>
        <div className="w-full bg-fourth/20 rounded-full h-2 mt-4 overflow-hidden border border-first">
          <div
            className="bg-third h-full rounded-full shadow-[0_0_10px_rgba(255,51,102,0.8)]"
            style={{ width: "25%" }}
          />
        </div>
      </div>

      <div className="bg-first border border-fourth/20 p-6 rounded-2xl relative overflow-hidden group hover:border-third transition-all">
        <div className="absolute top-0 right-0 p-6 text-fourth/10 group-hover:text-third/20 transition-colors">
          <TrendingUp className="h-12 w-12" />
        </div>
        <div className="flex items-center gap-2 text-second text-sm font-bold">
          <LineChart className="h-4 w-4 text-third" /> Best Performing Asset
        </div>
        <div className="text-3xl font-black tracking-tight text-third mt-3">
          Bitcoin <span className="text-second text-xl font-normal">(BTC)</span>
        </div>
        <span className="text-xs text-fourth font-medium mt-4 block">
          Avg Buy: €42k • Current: €61k
        </span>
      </div>
    </div>
  );
};

export default AssetOverview;
