import { ProductCard } from '@/components/product-card';
import { CategoryCard } from '@/components/category-card';
import { HeroSlider } from '@/components/hero-slider';

const categories = [
  {
    id: 1,
    name: 'Oturma Grupları',
    image: '/images/categories/oturma-gruplari.jpg',
    href: '/kategoriler/oturma-gruplari',
  },
  {
    id: 2,
    name: 'Yatak Odası',
    image: '/images/categories/yatak-odasi.jpg',
    href: '/kategoriler/yatak-odasi',
  },
  {
    id: 3,
    name: 'Yemek Odası',
    image: '/images/categories/yemek-odasi.jpg',
    href: '/kategoriler/yemek-odasi',
  },
  {
    id: 4,
    name: 'Çalışma Odası',
    image: '/images/categories/calisma-odasi.jpg',
    href: '/kategoriler/calisma-odasi',
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    image: '/images/products/kose-koltuk.jpg',
    href: '/urunler/modern-kose-koltuk',
    category: 'Oturma Grupları',
    arrivalDate: '2025-01-01',
    stock: 10,
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 34999,
    image: '/images/products/yatak-odasi.jpg',
    href: '/urunler/yatak-odasi-takimi',
    category: 'Yatak Odası',
    arrivalDate: '2025-01-01',
    stock: 10,
  },
  {
    id: 3,
    name: 'Yemek Odası Takımı',
    price: 29999,
    image: '/images/products/yemek-odasi.jpg',
    href: '/urunler/yemek-odasi-takimi',
    category: 'Yemek Odası',
    arrivalDate: '2025-01-01',
    stock: 10,
  },
  {
    id: 4,
    name: 'Çalışma Masası',
    price: 8999,
    image: '/images/products/calisma-masasi.jpg',
    href: '/urunler/calisma-masasi',
    category: 'Çalışma Odası',
    arrivalDate: '2025-01-01',
    stock: 10,
  },
];

const banners = [
  {
    id: 1,
    title: 'Modern ve Şık Mobilyalar',
    description: 'Evinizi güzelleştirmek için en kaliteli ve şık mobilyalar',
    image: '/images/hero.jpg',
    buttonText: 'Koleksiyonu Keşfet',
    buttonLink: '/kategoriler',
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Yeni Sezon Ürünleri',
    description: 'En yeni tasarımlar ve koleksiyonlar',
    image: '/images/hero-2.jpg',
    buttonText: 'Yeni Gelenler',
    buttonLink: '/yeni-gelenler',
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Özel İndirimler',
    description: 'Seçili ürünlerde %50\'ye varan indirimler',
    image: '/images/hero-3.jpg',
    buttonText: 'İndirimleri Gör',
    buttonLink: '/indirimler',
    isActive: true,
    order: 3,
  },
]

export default function HomePage() {
  return (
    <main>
      <HeroSlider banners={banners} />
      <div className="space-y-16 py-8">
        {/* Categories Section */}
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Kategoriler</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Öne Çıkan Ürünler</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
