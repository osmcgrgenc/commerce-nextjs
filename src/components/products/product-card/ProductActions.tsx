'use client';

import { useState, memo, useCallback } from 'react';
import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductActionsProps {
  stock: number;
  onAddToCart: () => void;
  onShare: () => void;
}

export const ProductActions = memo(function ProductActions({
  stock,
  onAddToCart,
  onShare,
}: ProductActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast.success(isFavorite ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi');
  }, [isFavorite]);

  const buttonText = stock === 0 ? 'Stokta Yok' : 'Sepete Ekle';

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={handleAddToFavorites}
        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
        aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      <button
        onClick={onShare}
        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-500"
        aria-label="Ürünü paylaş"
      >
        <Share2 className="h-5 w-5" />
      </button>

      <button
        onClick={onAddToCart}
        disabled={stock === 0}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={buttonText}
      >
        <ShoppingCart className="h-5 w-5" />
        {buttonText}
      </button>
    </div>
  );
});
