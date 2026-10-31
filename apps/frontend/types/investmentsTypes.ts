export type AssetCategory = "STOCKS" | "CRYPTO" | "CASH" | "CASH_PILLOW";

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  category: AssetCategory;
};

export type TransactionType = "BUY" | "SELL";

export type Transaction = {
  id: string;
  assetId: string;
  type: TransactionType;
  amount: number;
  price: number;
  date: string;
};
