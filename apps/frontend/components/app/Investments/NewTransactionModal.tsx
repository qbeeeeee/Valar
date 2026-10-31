"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  TransactionFormValues,
} from "@/lib/validation/investmentValidation";
import { CalculatedHolding } from "./CurrentHoldings";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  holdings: CalculatedHolding[];
  onSubmitTx: (data: any) => void;
}

const NewTransactionModal = ({
  isOpen,
  onClose,
  holdings,
  onSubmitTx,
}: NewTransactionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
    defaultValues: {
      type: "BUY",
      assetId: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const currentType = watch("type");
  const currentAssetId = watch("assetId");

  const selectedHolding = holdings.find((h) => h.id === currentAssetId);
  const availableUnits = selectedHolding ? selectedHolding.totalUnits : 0;

  const onSubmit = async (data: TransactionFormValues) => {
    // SECURITY CHECK: Block selling more than you own!
    if (data.type === "SELL" && data.amount > availableUnits) {
      setError("amount", {
        type: "manual",
        message: `You only own ${availableUnits} units.`,
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("valar_token");

      const response = await fetch("http://127.0.0.1:3001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction to the database");
      }

      const newTx = await response.json();

      if (onSubmitTx) onSubmitTx(newTx);
      reset();
      onClose();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setErrorMsg("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-first border border-fourth/20 text-second p-0 overflow-hidden rounded-2xl shadow-2xl gap-0">
        <DialogHeader className="p-6 border-b border-fourth/20">
          <DialogTitle className="text-xl font-black flex items-center gap-2 text-second">
            <ArrowRightLeft className="h-5 w-5 text-third" /> Record Transaction
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-bold">
                {errorMsg}
              </div>
            )}

            <div className="flex p-1 bg-first border border-fourth/20 rounded-lg">
              <button
                type="button"
                onClick={() =>
                  setValue("type", "BUY", { shouldValidate: true })
                }
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                  currentType === "BUY"
                    ? "bg-third/10 text-third border border-third/20 shadow-sm"
                    : "text-fourth hover:text-second"
                }`}
              >
                Buy Asset
              </button>
              <button
                type="button"
                onClick={() =>
                  setValue("type", "SELL", { shouldValidate: true })
                }
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                  currentType === "SELL"
                    ? "bg-fourth/10 text-second border border-fourth/20 shadow-sm"
                    : "text-fourth hover:text-second"
                }`}
              >
                Sell Asset
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                  Select Asset
                </label>
                <Select
                  value={currentAssetId}
                  onValueChange={(val) =>
                    setValue("assetId", val as string, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full bg-first border-fourth/20 text-second focus:ring-third/50 h-12 rounded-xl">
                    <SelectValue placeholder="Select from your list...">
                      {currentAssetId
                        ? holdings.find((a) => a.id === currentAssetId)?.name
                        : "Select from your list..."}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-first border-fourth/20 text-second rounded-xl border">
                    {holdings.map((asset) => (
                      <SelectItem
                        key={asset.id}
                        value={asset.id}
                        className="cursor-pointer"
                      >
                        {asset.name} ({asset.ticker})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assetId && (
                  <p className="text-xs text-red-400 font-medium mt-1">
                    {errors.assetId.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                      Units / Amount
                    </label>
                    {currentType === "SELL" && currentAssetId && (
                      <span className="text-[10px] text-third font-bold tracking-wider">
                        Max: {availableUnits}
                      </span>
                    )}
                  </div>
                  <Input
                    type="number"
                    step="any"
                    placeholder="0.5"
                    {...register("amount", { valueAsNumber: true })}
                    className="h-12 bg-first border-fourth/20 text-second placeholder:text-fourth/50 focus-visible:ring-third/50 rounded-xl"
                  />
                  {errors.amount && (
                    <p className="text-xs text-red-400 font-medium mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                    Price per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-fourth font-medium">
                      €
                    </span>
                    <Input
                      type="number"
                      step="any"
                      placeholder="0.00"
                      {...register("price", { valueAsNumber: true })}
                      className="h-12 pl-7 bg-first border-fourth/20 text-second placeholder:text-fourth/50 focus-visible:ring-third/50 rounded-xl"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-xs text-red-400 font-medium mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                  Transaction Date
                </label>
                <Input
                  type="date"
                  {...register("date")}
                  className="h-12 bg-first border-fourth/20 text-second focus-visible:ring-third/50 rounded-xl"
                />
                {errors.date && (
                  <p className="text-xs text-red-400 font-medium mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 border-t border-fourth/20 flex sm:justify-between gap-3 bg-first">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-first hover:bg-fourth/10 text-fourth border border-fourth/20 font-bold h-11 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1 bg-third hover:bg-third/80 text-first font-bold h-11 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                `Confirm ${currentType === "BUY" ? "Purchase" : "Sale"}`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionModal;
