import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Asset } from "@/types/investmentsTypes";
import { LineChart } from "lucide-react";

interface UpdatePriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onUpdate: (id: string, newPrice: number) => void;
}

export default function UpdatePriceModal({
  isOpen,
  onClose,
  asset,
  onUpdate,
}: UpdatePriceModalProps) {
  const [price, setPrice] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (asset && price) {
      onUpdate(asset.id, parseFloat(price));
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-first border border-fourth/20 text-second p-0 overflow-hidden rounded-2xl shadow-2xl">
        <DialogHeader className="p-6 border-b border-fourth/20">
          <DialogTitle className="text-xl font-black flex items-center gap-2 text-second">
            <LineChart className="h-5 w-5 text-third" /> Update Market Price
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <p className="text-sm text-fourth">
              Set the current trading price for{" "}
              <strong>
                {asset?.name} ({asset?.ticker})
              </strong>
              .
            </p>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-fourth uppercase tracking-wider">
                Current Price (€)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-fourth font-medium">
                  €
                </span>
                <Input
                  type="number"
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="h-12 pl-7 bg-first border-fourth/20 text-second focus-visible:ring-third/50 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter className="p-6 border-t border-fourth/20 flex gap-3 bg-first">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-first hover:bg-fourth/10 text-fourth border border-fourth/20 font-bold h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-third hover:bg-third/80 text-first font-bold h-11"
            >
              Save Price
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
