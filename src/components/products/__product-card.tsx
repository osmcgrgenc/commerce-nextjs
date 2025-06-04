import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api';

export interface ProductCardProps extends Product {
  priority?: boolean;
}

export function ProductCard({
  name,
  price,
  image,
  href,
  category,
  isNew,
  stock,
  discount,
  priority = false,
}: ProductCardProps) {
  // Fiyat formatlamasını memoize et
  const formattedPrice = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(price);

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={priority ? 90 : 75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {isNew && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Yeni
            </span>
          </div>
        )}
        {discount && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              %{discount} İndirim
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={href} prefetch={priority}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
          {stock <= 5 && stock > 0 && (
            <p className="mt-1 text-xs text-orange-600">Son {stock} ürün</p>
          )}
          {stock === 0 && <p className="mt-1 text-xs text-red-600">Stokta yok</p>}
        </div>
      </div>
    </div>
  );
}
