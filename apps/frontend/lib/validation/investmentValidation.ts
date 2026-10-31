import { z } from "zod";

export const addAssetSchema = z.object({
  name: z.string().min(2, "Asset name must be at least 2 characters."),
  ticker: z
    .string()
    .min(1, "Ticker is required.")
    .max(10, "Ticker is too long."),
  category: z.enum(["STOCKS", "CRYPTO", "CASH", "CASH_PILLOW"]),
});

export const transactionSchema = z.object({
  type: z.enum(["BUY", "SELL"]),
  assetId: z.string().min(1, "Please select an asset."),
  amount: z.number().positive("Amount must be greater than 0."),
  price: z.number().positive("Price must be greater than 0."),
  date: z.string().min(1, "Date is required."),
});

export type AddAssetFormValues = z.infer<typeof addAssetSchema>;
export type TransactionFormValues = z.infer<typeof transactionSchema>;
