'use client'

import Image from 'next/image'
import { useState, memo } from 'react'
import { Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductImageProps {
  image: string
  name: string
  isNew?: boolean
  onImageClick?: () => void
}

export const ProductImage = memo(function ProductImage({ 
  image, 
  name, 
  isNew, 
  onImageClick 
}: ProductImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={image}
        alt={name}
        fill
        priority={isNew}
        loading={isNew ? 'eager' : 'lazy'}
        className="object-cover transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
      
      {isNew && (
        <div className="absolute left-2 top-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
          Yeni
        </div>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onImageClick}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
          >
            <Eye className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}) 