# Liman Design - Modern Mobilya E-ticaret Projesi

Bu proje, modern ve şık mobilya tasarımlarını sergileyen bir e-ticaret web uygulamasıdır. Next.js 14, TypeScript, Tailwind CSS ve modern web teknolojileri kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Tamamlanan Özellikler
- ✅ Modern ve responsive tasarım
- ✅ Ürün listeleme ve detay sayfaları
- ✅ Kategori listeleme ve detay sayfaları
- ✅ Blog sistemi
- ✅ İletişim formu
- ✅ SEO optimizasyonu
- ✅ Performans optimizasyonları
- ✅ Resim optimizasyonları
- ✅ React Query ile veri yönetimi
- ✅ Zustand ile state yönetimi
- ✅ TypeScript ile tip güvenliği
- ✅ Tailwind CSS ile stil yönetimi

### Yapılacaklar
- [ ] Kullanıcı kimlik doğrulama sistemi
- [ ] Sepet yönetimi
- [ ] Ödeme sistemi entegrasyonu
- [ ] Admin paneli
- [ ] Ürün arama ve filtreleme
- [ ] Ürün sıralama
- [ ] Sayfalama (pagination)
- [ ] Çoklu dil desteği
- [ ] Dark mode
- [ ] Unit testler
- [ ] E2E testler
- [ ] API dokümantasyonu
- [ ] Performans testleri
- [ ] Güvenlik testleri

## 🛠️ Teknolojiler

- **Framework:** Next.js 14
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **State Yönetimi:** 
  - React Query (Server State)
  - Zustand (Client State)
- **Form Yönetimi:** React Hook Form
- **Validasyon:** Zod
- **UI Bileşenleri:** Shadcn UI
- **Veritabanı:** NHost
- **Deployment:** Vercel

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullanici/limandesign-nextjs.git
cd limandesign-nextjs
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🔧 Ortam Değişkenleri

Projeyi çalıştırmak için aşağıdaki ortam değişkenlerini `.env.local` dosyasında tanımlamanız gerekiyor:

```env
NEXT_PUBLIC_NHOST_URL=your_nhost_url
NEXT_PUBLIC_NHOST_ANON_KEY=your_nhost_anon_key
```

## 📁 Proje Yapısı

```
src/
├── app/                 # App Router sayfaları
├── components/         # React bileşenleri
│   ├── ui/            # Temel UI bileşenleri
│   ├── layout/        # Layout bileşenleri
│   └── features/      # Özellik bazlı bileşenler
├── hooks/             # Custom React hooks
├── lib/               # Yardımcı fonksiyonlar ve API
├── store/             # Zustand store'ları
├── types/             # TypeScript tip tanımlamaları
└── styles/            # Global stiller
```

## 🧪 Test

```bash
# Unit testleri çalıştır
npm run test

# E2E testleri çalıştır
npm run test:e2e
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje Sahibi - [@limandesign](https://twitter.com/limandesign)

Proje Linki: [https://github.com/kullanici/limandesign-nextjs](https://github.com/kullanici/limandesign-nextjs)
