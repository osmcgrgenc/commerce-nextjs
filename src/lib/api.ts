import { cache } from 'react'

export interface Category {
  id: number
  name: string
  image: string
  href: string
  description: string
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  href: string
  category: string
  arrivalDate: string
  stock: number
  isNew?: boolean
  variants?: ProductVariant[]
  discount?: number
}

export interface ProductVariant {
  id: number
  name: string
  stock: number
  color?: string
  size?: string
  material?: string
  image?: string
  priceDifference?: number
}

export interface Banner {
  id: number
  title: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  isActive: boolean
  order: number
}

// Veri önbelleğe alınır ve her istek için yeniden oluşturulmaz
export const getCategories = cache(async (): Promise<Category[]> => {
  // Gerçek API çağrısı burada yapılacak
  return [
    {
      id: 1,
      name: 'Oturma Grupları',
      image: '/images/categories/oturma-gruplari.jpg',
      href: '/kategoriler/oturma-gruplari',
      description: 'Modern ve konforlu oturma grupları koleksiyonu',
    },
    {
      id: 2,
      name: 'Yatak Odası',
      image: '/images/categories/yatak-odasi.jpg',
      href: '/kategoriler/yatak-odasi',
      description: 'Yatak odası mobilyaları ve eşyaları',
    },
    {
      id: 3,
      name: 'Yemek Odası',
      image: '/images/categories/yemek-odasi.jpg',
      href: '/kategoriler/yemek-odasi',
      description: 'Yemek odası mobilyaları ve eşyaları',
    },
    {
      id: 4,
      name: 'Çalışma Odası',
      image: '/images/categories/calisma-odasi.jpg',
      href: '/kategoriler/calisma-odasi',
      description: 'Çalışma odası mobilyaları ve eşyaları',
    },
  ]
})

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  // Gerçek API çağrısı burada yapılacak
  return [
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
  ]
})

export const getBanners = cache(async (): Promise<Banner[]> => {
  // Gerçek API çağrısı burada yapılacak
  return [
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
})

// Yeni gelen ürünler için fonksiyon
export const getNewArrivals = cache(async (): Promise<Product[]> => {
  // Gerçek API çağrısı burada yapılacak
  return [
    {
      id: 5,
      name: 'Modern Yemek Masası',
      price: 18999,
      image: '/images/products/yemek-masasi.jpg',
      href: '/urunler/modern-yemek-masasi',
      category: 'Yemek Odası',
      arrivalDate: '2024-03-15',
      stock: 5,
      isNew: true,
    },
    {
      id: 6,
      name: 'Şık Yatak Başlığı',
      price: 7999,
      image: '/images/products/yatak-basligi.jpg',
      href: '/urunler/sik-yatak-basligi',
      category: 'Yatak Odası',
      arrivalDate: '2024-03-14',
      stock: 8,
      isNew: true,
    },
    // ... diğer yeni ürünler
  ]
})

// İndirimli ürünler için fonksiyon
export const getDiscountedProducts = cache(async (): Promise<Product[]> => {
  // Gerçek API çağrısı burada yapılacak
  return [
    {
      id: 7,
      name: 'Klasik Koltuk',
      price: 14999,
      image: '/images/products/klasik-koltuk.jpg',
      href: '/urunler/klasik-koltuk',
      category: 'Oturma Grupları',
      arrivalDate: '2024-02-01',
      stock: 3,
      discount: 30, // %30 indirim
    },
    {
      id: 8,
      name: 'Antika Masa',
      price: 12999,
      image: '/images/products/antika-masa.jpg',
      href: '/urunler/antika-masa',
      category: 'Yemek Odası',
      arrivalDate: '2024-02-15',
      stock: 2,
      discount: 25, // %25 indirim
    },
    // ... diğer indirimli ürünler
  ]
})

// Kategori detayları için fonksiyon
export const getCategoryDetails = cache(async (slug: string): Promise<{
  category: Category
  products: Product[]
}> => {
  // Gerçek API çağrısı burada yapılacak
  const category = {
    id: 1,
    name: 'Oturma Grupları',
    image: '/images/categories/oturma-gruplari.jpg',
    href: `/kategoriler/${slug}`,
    description: 'Modern ve konforlu oturma grupları koleksiyonu',
  }

  const products = [
    {
      id: 1,
      name: 'Modern Köşe Koltuk',
      price: 24999,
      image: '/images/products/kose-koltuk.jpg',
      href: '/urunler/modern-kose-koltuk',
      category: 'Oturma Grupları',
      arrivalDate: '2024-03-01',
      stock: 10,
    },
    // ... diğer ürünler
  ]

  return { category, products }
}) 