import Image from 'next/image';
import Link from 'next/link';

// Bu veri normalde bir API'den gelecek
const post = {
  id: 1,
  title: 'Modern Ev Dekorasyonu Trendleri',
  description:
    '2024 yılının en popüler ev dekorasyon trendlerini keşfedin. Minimalist tasarımdan maksimalist yaklaşıma kadar tüm trendleri sizler için derledik.',
  content: `
    <p>
      Modern ev dekorasyonu, günümüzde birçok kişinin ilgisini çeken ve sürekli
      gelişen bir alandır. 2024 yılında öne çıkan trendler, hem işlevselliği hem
      de estetiği bir arada sunmayı hedefliyor.
    </p>
    <h2>Minimalist Yaklaşım</h2>
    <p>
      Minimalist tasarım, sade ve işlevsel bir yaşam alanı yaratmayı amaçlar.
      Gereksiz detaylardan arındırılmış, temiz çizgiler ve nötr renkler
      kullanılarak oluşturulan bu tarz, modern evlerin vazgeçilmezi haline
      gelmiştir.
    </p>
    <h2>Doğal Malzemeler</h2>
    <p>
      Sürdürülebilir ve doğal malzemelerin kullanımı, 2024'ün en önemli
      trendlerinden biri olarak öne çıkıyor. Ahşap, taş, pamuk ve keten gibi
      doğal malzemeler, hem çevre dostu hem de estetik açıdan tatmin edici
      çözümler sunuyor.
    </p>
    <h2>Akıllı Ev Teknolojileri</h2>
    <p>
      Teknoloji ile dekorasyonun buluştuğu noktada, akıllı ev sistemleri
      giderek daha fazla tercih ediliyor. Otomatik aydınlatma sistemleri,
      akıllı termostatlar ve sesli komutlu cihazlar, modern evlerin
      olmazsa olmazları arasında yer alıyor.
    </p>
  `,
  image: '/images/blog/dekorasyon-trendleri.jpg',
  date: '12 Mart 2024',
  author: {
    name: 'Ayşe Yılmaz',
    image: '/images/blog/authors/ayse-yilmaz.jpg',
  },
  relatedPosts: [
    {
      id: 2,
      title: 'Küçük Evler İçin Mobilya Seçimi',
      image: '/images/blog/kucuk-ev-mobilya.jpg',
    },
    {
      id: 3,
      title: 'Sürdürülebilir Mobilya Seçimi',
      image: '/images/blog/surdurulebilir-mobilya.jpg',
    },
  ],
};

export default function BlogPostPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-2xl lg:mx-0">
        <header className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">{post.description}</p>
          <div className="mt-6 flex items-center gap-x-4">
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
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <time dateTime={post.date} className="text-gray-500">
                {post.date}
              </time>
            </div>
          </div>
        </header>

        <div className="relative mt-8">
          <div className="relative h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              priority
              quality={90}
            />
          </div>
        </div>

        <div
          className="mt-8 prose prose-lg prose-indigo mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">İlgili Yazılar</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {post.relatedPosts.map(relatedPost => (
              <article key={relatedPost.id} className="flex flex-col items-start">
                <div className="relative w-full">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                </div>
                <div className="max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/blog/${relatedPost.id}`}>
                        <span className="absolute inset-0" />
                        {relatedPost.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
