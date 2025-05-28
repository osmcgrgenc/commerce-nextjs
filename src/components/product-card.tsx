'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Share2, ShoppingCart, Eye, ChevronDown, AlertCircle, Bell, History, TrendingUp, Clock, AlertTriangle, BarChart2, RefreshCw, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface StockHistory {
  date: string
  quantity: number
  type: 'in' | 'out'
}

interface StockPrediction {
  date: string
  predictedQuantity: number
  confidence: number
}

interface StockAlert {
  id: number
  type: 'low' | 'out' | 'high'
  threshold: number
  message: string
  isActive: boolean
}

interface StockReport {
  id: number
  type: 'daily' | 'weekly' | 'monthly'
  date: string
  data: {
    totalStock: number
    lowStock: number
    outOfStock: number
    sales: number
    revenue: number
  }
}

interface StockOptimization {
  id: number
  suggestion: string
  impact: 'high' | 'medium' | 'low'
  savings: number
}

interface ProductVariant {
  id: number
  name: string
  stock: number
  color?: string
  size?: string
  material?: string
  image?: string
  priceDifference?: number
  history?: StockHistory[]
  predictions?: StockPrediction[]
  reserved?: number
  alerts?: StockAlert[]
  reports?: StockReport[]
  optimizations?: StockOptimization[]
  lastSynced?: string
}

interface ProductCardProps {
  name: string
  price: number
  image: string
  href: string
  category: string
  arrivalDate: string
  isNew?: boolean
  stock: number
  variants?: ProductVariant[]
}

export function ProductCard({
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
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [showVariants, setShowVariants] = useState(false)
  const [currentImage, setCurrentImage] = useState(image)
  const [lowStockVariants, setLowStockVariants] = useState<ProductVariant[]>([])
  const [showStockHistory, setShowStockHistory] = useState(false)
  const [showStockPredictions, setShowStockPredictions] = useState(false)
  const [reservationQuantity, setReservationQuantity] = useState(1)
  const [showReservation, setShowReservation] = useState(false)
  const [previousStock, setPreviousStock] = useState<number | null>(null)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [showOptimizations, setShowOptimizations] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    if (variants) {
      const lowStock = variants.filter((variant) => variant.stock > 0 && variant.stock <= 3)
      setLowStockVariants(lowStock)
    }
  }, [variants])

  useEffect(() => {
    if (selectedVariant && previousStock !== null && selectedVariant.stock !== previousStock) {
      toast.info(`Stok güncellendi: ${selectedVariant.stock} adet`)
    }
    if (selectedVariant) {
      setPreviousStock(selectedVariant.stock)
    }
  }, [selectedVariant?.stock])

  const handleAddToCart = () => {
    if (stock === 0) {
      toast.error('Ürün stokta bulunmamaktadır')
      return
    }
    if (variants && !selectedVariant) {
      toast.error('Lütfen bir varyant seçin')
      return
    }
    if (selectedVariant && selectedVariant.stock === 0) {
      toast.error('Seçilen varyant stokta bulunmamaktadır')
      return
    }
    toast.success('Ürün sepete eklendi')
  }

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi')
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: name,
        text: `${name} - ${category}`,
        url: window.location.origin + href,
      })
    } catch {
      toast.error('Paylaşım başarısız oldu')
    }
  }

  const handleVariantSelect = (variant: ProductVariant) => {
    if (variant.stock === 0) {
      toast.error('Bu varyant stokta bulunmamaktadır')
      return
    }
    setSelectedVariant(variant)
    setShowVariants(false)
    if (variant.image) {
      setCurrentImage(variant.image)
    }
  }

  const handleStockNotification = () => {
    if (selectedVariant) {
      toast.success('Stok bildirimi aktif edildi')
    } else {
      toast.error('Lütfen önce bir varyant seçin')
    }
  }

  const handleReservation = () => {
    if (!selectedVariant) {
      toast.error('Lütfen önce bir varyant seçin')
      return
    }
    if (reservationQuantity > selectedVariant.stock) {
      toast.error('Rezervasyon miktarı stok miktarından fazla olamaz')
      return
    }
    toast.success(`${reservationQuantity} adet ürün rezerve edildi`)
    setShowReservation(false)
  }

  const handleSync = async () => {
    if (!selectedVariant) {
      toast.error('Lütfen önce bir varyant seçin')
      return
    }
    setIsSyncing(true)
    try {
      // Burada gerçek bir senkronizasyon API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Stok senkronizasyonu tamamlandı')
    } catch {
      toast.error('Senkronizasyon başarısız oldu')
    } finally {
      setIsSyncing(false)
    }
  }

  const getTotalPrice = () => {
    if (!selectedVariant) return price
    return price + (selectedVariant.priceDifference || 0)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Stokta yok', color: 'text-red-600' }
    if (stock <= 3) return { text: 'Son ürünler', color: 'text-orange-600' }
    return { text: `${stock} adet stokta`, color: 'text-green-600' }
  }

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={currentImage ?? 'https://placehold.co/500x500'}
          alt={name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        {isNew && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Yeni
            </span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <AnimatePresence>
            <motion.span
              key={selectedVariant?.stock || stock}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {getStockStatus(selectedVariant?.stock || stock).text}
            </motion.span>
          </AnimatePresence>
        </div>
        {lowStockVariants.length > 0 && (
          <div className="absolute bottom-2 left-2">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
              <AlertCircle className="mr-1 h-3 w-3" />
              {lowStockVariants.length} varyant az stokta
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-100"
            title="Sepete Ekle"
            disabled={stock === 0}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            onClick={handleAddToFavorites}
            className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-100"
            title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <Link
            href={href}
            className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-100"
            title="Ürün Detayı"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button
            onClick={handleShare}
            className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-100"
            title="Paylaş"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            }).format(getTotalPrice())}
          </p>
          {selectedVariant?.priceDifference && selectedVariant.priceDifference > 0 && (
            <p className="text-xs text-gray-500">
              +{new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              }).format(selectedVariant.priceDifference)}
            </p>
          )}
        </div>
      </div>
      {variants && variants.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowVariants(!showVariants)}
            className="flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>
              {selectedVariant
                ? `${selectedVariant.name}${selectedVariant.color ? ` - ${selectedVariant.color}` : ''}${
                    selectedVariant.size ? ` - ${selectedVariant.size}` : ''
                  }${selectedVariant.material ? ` - ${selectedVariant.material}` : ''}`
                : 'Varyant Seçin'}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {showVariants && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
              <ul className="max-h-60 overflow-auto py-1 text-sm">
                {variants.map((variant) => {
                  const stockStatus = getStockStatus(variant.stock)
                  return (
                    <li
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      className={`flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100 ${
                        variant.stock === 0 ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {variant.image && (
                          <div className="h-8 w-8 overflow-hidden rounded-md">
                            <Image
                              src={variant.image ?? 'https://placehold.co/32x32'}
                              alt={variant.name}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <span>
                          {variant.name}
                          {variant.color && ` - ${variant.color}`}
                          {variant.size && ` - ${variant.size}`}
                          {variant.material && ` - ${variant.material}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {variant.priceDifference && variant.priceDifference > 0 && (
                          <span className="text-xs text-green-600">
                            +{new Intl.NumberFormat('tr-TR', {
                              style: 'currency',
                              currency: 'TRY',
                            }).format(variant.priceDifference)}
                          </span>
                        )}
                        <span className={`text-xs ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      )}
      {selectedVariant && (
        <div className="mt-2 flex items-center justify-between space-x-2">
          <button
            onClick={handleStockNotification}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Bildirimi"
          >
            <Bell className="h-4 w-4" />
            <span>Bildirim</span>
          </button>
          <button
            onClick={() => setShowStockHistory(!showStockHistory)}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Geçmişi"
          >
            <History className="h-4 w-4" />
            <span>Geçmiş</span>
          </button>
          <button
            onClick={() => setShowStockPredictions(!showStockPredictions)}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Tahminleri"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Tahmin</span>
          </button>
          <button
            onClick={() => setShowReservation(!showReservation)}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Rezervasyonu"
          >
            <Clock className="h-4 w-4" />
            <span>Rezerv</span>
          </button>
        </div>
      )}
      {selectedVariant && (
        <div className="mt-2 flex items-center justify-between space-x-2">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Alarmları"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Alarm</span>
          </button>
          <button
            onClick={() => setShowReports(!showReports)}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Raporları"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Rapor</span>
          </button>
          <button
            onClick={() => setShowOptimizations(!showOptimizations)}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
            title="Stok Optimizasyonu"
          >
            <Settings className="h-4 w-4" />
            <span>Optimize</span>
          </button>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center space-x-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            title="Stok Senkronizasyonu"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Senkronize</span>
          </button>
        </div>
      )}
      {showStockHistory && selectedVariant?.history && (
        <div className="mt-2 rounded-md border border-gray-200 p-2">
          <h4 className="text-xs font-medium text-gray-900">Stok Geçmişi</h4>
          <div className="mt-1 space-y-1">
            {selectedVariant.history.map((record, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-gray-500">{new Date(record.date).toLocaleDateString('tr-TR')}</span>
                <span className={record.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                  {record.type === 'in' ? '+' : '-'}{record.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {showStockPredictions && selectedVariant?.predictions && (
        <div className="mt-2 rounded-md border border-gray-200 p-2">
          <h4 className="text-xs font-medium text-gray-900">Stok Tahminleri</h4>
          <div className="mt-1 space-y-1">
            {selectedVariant.predictions.map((prediction, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-gray-500">{new Date(prediction.date).toLocaleDateString('tr-TR')}</span>
                <span className="text-blue-600">{prediction.predictedQuantity} (±{prediction.confidence}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {showReservation && (
        <div className="mt-2 rounded-md border border-gray-200 p-2">
          <h4 className="text-xs font-medium text-gray-900">Stok Rezervasyonu</h4>
          <div className="mt-2 flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={selectedVariant?.stock}
              value={reservationQuantity}
              onChange={(e) => setReservationQuantity(Number(e.target.value))}
              className="w-20 rounded-md border-gray-300 text-sm"
            />
            <button
              onClick={handleReservation}
              className="rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
            >
              Rezerve Et
            </button>
          </div>
        </div>
      )}
      {showAlerts && selectedVariant?.alerts && (
        <div className="mt-2 rounded-md border border-gray-200 p-2">
          <h4 className="text-xs font-medium text-gray-900">Stok Alarmları</h4>
          <div className="mt-1 space-y-1">
            {selectedVariant.alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{alert.message}</span>
                <span className={`text-xs ${
                  alert.type === 'low' ? 'text-orange-600' :
                  alert.type === 'out' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {alert.threshold} adet
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {showReports && selectedVariant?.reports && (
        <div className="mt-2 rounded-md border border-gray-200 p-2">
          <h4 className="text-xs font-medium text-gray-900">Stok Raporları</h4>
          <div className="mt-1 space-y-1">
            {selectedVariant.reports.map((report) => (
              <div key={report.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{report.type === 'daily' ? 'Günlük' : report.type === 'weekly' ? 'Haftalık' : 'Aylık'}</span>
                  <span className="text-gray-500">{new Date(report.date).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <span className="text-gray-500">Toplam Stok:</span>
                    <span className="ml-1 text-gray-900">{report.data.totalStock}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Az Stok:</span>
                    <span className="ml-1 text-orange-600">{report.data.lowStock}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Stok Yok:</span>
                    <span className="ml-1 text-red-600">{report.data.outOfStock}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Satış:</span>
                    <span className="ml-1 text-green-600">{report.data.sales}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Gelir:</span>
                    <span className="ml-1 text-green-600">
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      }).format(report.data.revenue)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showOptimizations && selectedVariant?.optimizations && (
        <div className="mt-2 rounded-md border border-gray-200 p-2">
          <h4 className="text-xs font-medium text-gray-900">Stok Optimizasyonu</h4>
          <div className="mt-1 space-y-1">
            {selectedVariant.optimizations.map((optimization) => (
              <div key={optimization.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{optimization.suggestion}</span>
                  <span className={`text-xs ${
                    optimization.impact === 'high' ? 'text-green-600' :
                    optimization.impact === 'medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    {optimization.impact === 'high' ? 'Yüksek' :
                     optimization.impact === 'medium' ? 'Orta' :
                     'Düşük'} Etki
                  </span>
                </div>
                <div className="text-xs text-green-600">
                  Tasarruf: {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  }).format(optimization.savings)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">
        Eklenme: {new Date(arrivalDate).toLocaleDateString('tr-TR')}
        {selectedVariant?.lastSynced && (
          <span className="ml-2">
            Son Senkronizasyon: {new Date(selectedVariant.lastSynced).toLocaleDateString('tr-TR')}
          </span>
        )}
      </div>
    </div>
  )
} 