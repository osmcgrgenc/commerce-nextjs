'use client';

import { useState, memo, useCallback } from 'react';
import { toast } from 'sonner';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductActions } from './ProductActions';
import { ProductVariants } from './ProductVariants';

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

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  href: string;
  category: string;
  arrivalDate: string;
  isNew?: boolean;
  stock: number;
  variants?: ProductVariant[];
}

export const ProductCard = memo(function ProductCard({
  name,
  price,
  image,
  href,
  category,
  arrivalDate,
  isNew,
  stock,
  variants,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImage, setCurrentImage] = useState(image);

  const handleAddToCart = useCallback(() => {
    if (stock === 0) {
      toast.error('Ürün stokta bulunmamaktadır');
      return;
    }
    if (variants && !selectedVariant) {
      toast.error('Lütfen bir varyant seçin');
      return;
    }
    if (selectedVariant && selectedVariant.stock === 0) {
      toast.error('Seçilen varyant stokta bulunmamaktadır');
      return;
    }
    toast.success('Ürün sepete eklendi');
  }, [stock, variants, selectedVariant]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        title: name,
        text: `${name} - ${category}`,
        url: window.location.origin + href,
      });
    } catch {
      toast.error('Paylaşım başarısız oldu');
    }
  }, [name, category, href]);

  const handleVariantSelect = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.image) {
      setCurrentImage(variant.image);
    }
  }, []);

  const currentStock = selectedVariant?.stock ?? stock;

  return (
    <div
      className="group relative rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:shadow-lg"
      role="article"
      aria-label={`${name} ürün kartı`}
    >
      <ProductImage image={currentImage} name={name} isNew={isNew} />

      <ProductInfo
        name={name}
        price={price}
        href={href}
        category={category}
        arrivalDate={arrivalDate}
        stock={currentStock}
      />

      <ProductVariants
        variants={variants}
        selectedVariant={selectedVariant}
        onVariantSelect={handleVariantSelect}
      />

      <ProductActions stock={currentStock} onAddToCart={handleAddToCart} onShare={handleShare} />
    </div>
  );
});
