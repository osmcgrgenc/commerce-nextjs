import { Metadata } from 'next';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function generateMetadata({
  title = 'Liman Design - Modern Mobilya ve Dekorasyon',
  description = 'Liman Design ile evinize modern ve şık mobilyalar, dekorasyon ürünleri ve aksesuarlar ekleyin. Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat.',
  image = '/images/og-image.jpg',
  url = 'https://www.limandesign.com',
}: GenerateMetadataProps = {}): Metadata {
  const siteName = 'Liman Design';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@limandesign',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
    },
  };
}
