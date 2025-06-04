"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { ProductReviews } from '@/components/product-reviews';

// Gerekli tipleri props olarak alacak şekilde tanımla
interface ProductDetailClientProps {
  product: any;
  reviews: any[];
}

export default function ProductDetailClient({ product, reviews }: ProductDetailClientProps) {
  // Client-side state ve etkileşimler burada
  // ...
  return (
    <div>
      {/* Ürün detayları ve etkileşimli alanlar buraya gelecek */}
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
    </div>
  );
} 