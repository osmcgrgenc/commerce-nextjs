'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface ProductVariant {
  id: number;
  name: string;
  stock: number;
  color?: string;
  size?: string;
  material?: string;
  image?: string;
  priceDifference?: number;
}

interface ProductVariantsProps {
  variants?: ProductVariant[];
  onVariantSelect: (variant: ProductVariant) => void;
  selectedVariant: ProductVariant | null;
}

export const ProductVariants = memo(function ProductVariants({
  variants,
  onVariantSelect,
  selectedVariant,
}: ProductVariantsProps) {
  const [showVariants, setShowVariants] = useState(false);

  const handleVariantClick = useCallback(
    (variant: ProductVariant) => {
      if (variant.stock === 0) {
        toast.error('Bu varyant stokta bulunmamaktadır');
        return;
      }
      onVariantSelect(variant);
      setShowVariants(false);
    },
    [onVariantSelect]
  );

  const toggleVariants = useCallback(() => {
    setShowVariants(prev => !prev);
  }, []);

  const selectedVariantName = useMemo(() => {
    return selectedVariant ? selectedVariant.name : 'Varyant Seçin';
  }, [selectedVariant]);

  if (!variants || variants.length === 0) return null;

  return (
    <div className="relative mt-4">
      <button
        onClick={toggleVariants}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        aria-expanded={showVariants}
        aria-controls="variants-menu"
      >
        <span>{selectedVariantName}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${showVariants ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {showVariants && (
        <div
          id="variants-menu"
          className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
          role="menu"
        >
          <div className="max-h-60 overflow-auto p-2">
            {variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => handleVariantClick(variant)}
                disabled={variant.stock === 0}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  {variant.color && (
                    <div
                      className="h-4 w-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: variant.color }}
                      aria-hidden="true"
                    />
                  )}
                  <span>{variant.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {variant.stock === 0 ? 'Stokta Yok' : `${variant.stock} Adet`}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
