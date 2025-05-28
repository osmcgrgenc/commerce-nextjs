'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { ProductReviews } from '@/components/product-reviews'

// Bu veri normalde bir API'den gelecek
const product = {
  id: 1,
  name: 'Modern Köşe Koltuk',
  price: 24999,
  description:
    'Modern tasarımı ve yüksek konforu bir arada sunan köşe koltuk. Premium kumaş ve kaliteli malzemelerden üretilmiştir. Evinizin her köşesine şıklık katacak bu koltuk, uzun yıllar kullanım için tasarlanmıştır.',
  images: [
    '/images/products/kose-koltuk-1.jpg',
    '/images/products/kose-koltuk-2.jpg',
    '/images/products/kose-koltuk-3.jpg',
    '/images/products/kose-koltuk-4.jpg',
  ],
  features: [
    'Premium kumaş',
    'Yüksek konfor',
    'Kolay temizlenebilir',
    'Montaj dahil',
    '2 yıl garanti',
  ],
  dimensions: {
    width: '280 cm',
    depth: '180 cm',
    height: '85 cm',
  },
  colors: [
    { name: 'Bej', value: '#F5F5DC' },
    { name: 'Gri', value: '#808080' },
    { name: 'Lacivert', value: '#000080' },
  ],
  stock: 5,
  reviews: {
    averageRating: 4.5,
    totalReviews: 128,
    items: [
      {
        id: 1,
        user: {
          name: 'Ahmet Yılmaz',
          avatar: '/images/avatars/user-1.jpg',
        },
        rating: 5,
        date: '15 Şubat 2024',
        title: 'Harika bir ürün',
        comment: 'Çok rahat ve kaliteli bir koltuk. Beklentilerimin üzerinde bir ürün.',
        likes: 12,
        dislikes: 0,
        verified: true,
      },
      {
        id: 2,
        user: {
          name: 'Ayşe Demir',
          avatar: '/images/avatars/user-2.jpg',
        },
        rating: 4,
        date: '10 Şubat 2024',
        title: 'Güzel ama biraz pahalı',
        comment: 'Kalitesi çok iyi ama fiyatı biraz yüksek. Yine de memnunum.',
        likes: 8,
        dislikes: 2,
        verified: true,
      },
    ],
  },
}

export default function ProductPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // Sepete ekleme işlemi burada yapılacak
    toast.success('Ürün sepete eklendi')
  }

  const handleAddToFavorites = () => {
    // Favorilere ekleme işlemi burada yapılacak
    toast.success('Ürün favorilere eklendi')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      toast.info('Paylaşım özelliği bu tarayıcıda desteklenmiyor')
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Ürün Görselleri */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <Image
                src={selectedImage}
                alt={product.name}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-h-1 aspect-w-1 overflow-hidden rounded-lg ${
                    selectedImage === image ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Ürün bilgileri</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                }).format(product.price)}
              </p>
            </div>

            {/* Renk Seçimi */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Renk</h3>
              <div className="mt-2 flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-8 w-8 rounded-full border ${
                      selectedColor.name === color.name ? 'ring-2 ring-indigo-500' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Adet Seçimi */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Adet</h3>
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md border p-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="rounded-md border p-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Açıklama */}
            <div className="mt-6">
              <h3 className="sr-only">Açıklama</h3>
              <div className="space-y-6 text-base text-gray-700">{product.description}</div>
            </div>

            {/* Özellikler */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Özellikler</h3>
              <div className="mt-2">
                <ul className="list-disc space-y-2 pl-4 text-sm text-gray-600">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Boyutlar */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Boyutlar</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Genişlik: {product.dimensions.width}</p>
                <p>Derinlik: {product.dimensions.depth}</p>
                <p>Yükseklik: {product.dimensions.height}</p>
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="mt-10 flex flex-col space-y-4">
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sepete Ekle
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToFavorites}
                  className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Heart className="h-5 w-5" />
                  <span className="ml-2">Favorilere Ekle</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="ml-2">Paylaş</span>
                </button>
              </div>
            </div>

            {/* Teslimat ve Garanti Bilgileri */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Ücretsiz Teslimat</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">2 Yıl Garanti</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">14 Gün İade</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yorumlar Bölümü */}
        <div className="mt-16">
          <ProductReviews
            productId={product.id}
            averageRating={product.reviews.averageRating}
            totalReviews={product.reviews.totalReviews}
            reviews={product.reviews.items}
          />
        </div>
      </div>
    </div>
  )
} 