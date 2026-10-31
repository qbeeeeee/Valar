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
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAssetSchema,
  AddAssetFormValues,
} from "@/lib/validation/investmentValidation";

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const AddAssetModal = ({ isOpen, onClose, onAdd }: AddAssetModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddAssetFormValues>({
    resolver: zodResolver(addAssetSchema),
    mode: "onChange",
  });

  const currentCategory = watch("category");

  const onSubmit = async (data: AddAssetFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("valar_token");

      const response = await fetch("http://127.0.0.1:3001/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save asset to the database");
      }

      const newAsset = await response.json();

      onAdd(newAsset);

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
            <Plus className="h-5 w-5 text-third" /> Track New Asset
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <p className="text-sm text-fourth mb-2">
              Add a new stock, crypto, or property to your master list so you
              can start logging transactions.
            </p>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-bold">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                Asset Name
              </label>
              <Input
                placeholder="e.g. Apple Inc."
                {...register("name")}
                className="h-12 bg-first border-fourth/20 text-second placeholder:text-fourth/50 focus-visible:ring-third/50 rounded-xl"
              />
              {errors.name && (
                <p className="text-xs text-red-400 font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                Ticker / Symbol
              </label>
              <Input
                placeholder="e.g. AAPL"
                {...register("ticker")}
                className="h-12 bg-first border-fourth/20 text-second placeholder:text-fourth/50 focus-visible:ring-third/50 rounded-xl uppercase"
              />
              {errors.ticker && (
                <p className="text-xs text-red-400 font-medium mt-1">
                  {errors.ticker.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                Asset Category
              </label>
              <Select
                value={currentCategory}
                onValueChange={(val) =>
                  setValue("category", val as any, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full bg-first border-fourth/20 text-second focus:ring-third/50 h-12 rounded-xl">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent className="bg-first border-fourth/20 text-second rounded-xl border">
                  <SelectItem value="STOCKS" className="cursor-pointer">
                    Stocks & ETFs
                  </SelectItem>
                  <SelectItem value="CRYPTO" className="cursor-pointer">
                    Cryptocurrency
                  </SelectItem>
                  <SelectItem value="CASH" className="cursor-pointer">
                    Liquid Cash
                  </SelectItem>
                  <SelectItem value="CASH_PILLOW" className="cursor-pointer">
                    Cash Pillow (Safeguard)
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-400 font-medium mt-1">
                  {errors.category.message}
                </p>
              )}
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
                "Add to List"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetModal;
