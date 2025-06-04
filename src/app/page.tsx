'use client';

import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { usePosts } from '@/hooks/use-posts';
import { ProductCard } from '@/components/products/product-card';
import { CategoryCard } from '@/components/categories/category-card';
import { PostCard } from '@/components/blog/post-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const { data: posts } = usePosts();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Modern ve Şık Mobilya Tasarımları
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Eviniz için en kaliteli ve şık mobilyaları keşfedin. Modern tasarımlar ve
              konforlu yaşam alanları için doğru adres.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild>
                <Link href="/urunler">
                  Ürünleri Keşfet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/iletisim">İletişime Geç</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Öne Çıkan Ürünler
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/urunler">
              Tümünü Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Kategoriler
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/kategoriler">
              Tümünü Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Blog Yazıları
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              Tümünü Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bizimle İletişime Geçin
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Modern ve şık mobilyalar için doğru adres. Size en uygun çözümü sunmak için
            buradayız.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href="/iletisim">İletişime Geç</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/hakkimizda">Hakkımızda</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
