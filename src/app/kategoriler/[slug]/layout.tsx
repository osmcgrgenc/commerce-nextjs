import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: 'Kategoriler',
  description:
    'Liman Design ürün kategorileri. Mobilya, dekorasyon, aydınlatma ve daha fazlası. Her tarza uygun ürünler ve çözümler.',
  image: '/images/categories-og.jpg',
});

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 