import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  image: string;
  href: string;
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={category.image}
          alt={category.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-700">
          <Link href={category.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {category.name}
          </Link>
        </h3>
      </div>
    </div>
  );
} 