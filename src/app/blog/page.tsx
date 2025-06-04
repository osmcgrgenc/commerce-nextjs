import Image from 'next/image';
import Link from 'next/link';

// Bu veri normalde bir API'den gelecek
const posts = [
  {
    id: 1,
    title: 'Modern Ev Dekorasyonu Trendleri',
    description:
      '2024 yılının en popüler ev dekorasyon trendlerini keşfedin. Minimalist tasarımdan maksimalist yaklaşıma kadar tüm trendleri sizler için derledik.',
    image: '/images/blog/dekorasyon-trendleri.jpg',
    date: '12 Mart 2024',
    author: {
      name: 'Ayşe Yılmaz',
      image: '/images/blog/authors/ayse-yilmaz.jpg',
    },
  },
  {
    id: 2,
    title: 'Küçük Evler İçin Mobilya Seçimi',
    description:
      'Küçük evleriniz için en uygun mobilya seçimleri ve yerleşim önerileri. Alanınızı en verimli şekilde kullanmanın yollarını öğrenin.',
    image: '/images/blog/kucuk-ev-mobilya.jpg',
    date: '10 Mart 2024',
    author: {
      name: 'Mehmet Demir',
      image: '/images/blog/authors/mehmet-demir.jpg',
    },
  },
  {
    id: 3,
    title: 'Sürdürülebilir Mobilya Seçimi',
    description:
      'Çevre dostu ve sürdürülebilir mobilya seçiminin önemi ve dikkat edilmesi gereken noktalar. Doğaya saygılı bir yaşam için öneriler.',
    image: '/images/blog/surdurulebilir-mobilya.jpg',
    date: '8 Mart 2024',
    author: {
      name: 'Zeynep Kaya',
      image: '/images/blog/authors/zeynep-kaya.jpg',
    },
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog</h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Ev dekorasyonu ve mobilya dünyasından en güncel haberler ve öneriler
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map(post => (
          <article key={post.id} className="flex flex-col items-start">
            <div className="relative w-full">
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {post.date}
                </time>
                <Link
                  href={`/blog/${post.id}`}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Dekorasyon
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link href={`/blog/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="relative h-10 w-10">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    sizes="40px"
                    className="rounded-full object-cover"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    {post.author.name}
                  </p>
                  <p className="text-gray-600">Yazar</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
