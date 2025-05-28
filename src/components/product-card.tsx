import Image from 'next/image';
import Link from 'next/link';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  href: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          {product.category && (
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          )}
        </div>
        <p className="text-sm font-medium text-gray-900">
          {new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
          }).format(product.price)}
        </p>
      </div>
    </div>
  );
} 