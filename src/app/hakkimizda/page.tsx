'use client';

import { useState, useEffect, Suspense } from 'react';
import nhost from '@/lib/nhost/client';
import Image from 'next/image';
import { Building2, Users, Award, Heart } from 'lucide-react';
import { getAboutData } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

interface CompanyInfo {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Statistic {
  id: string;
  title: string;
  value: string;
  description: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

const stats = [
  { id: 1, name: 'Yıllık Deneyim', value: '25+' },
  { id: 2, name: 'Mutlu Müşteri', value: '10.000+' },
  { id: 3, name: 'Tamamlanan Proje', value: '5.000+' },
  { id: 4, name: 'Çalışan Sayısı', value: '100+' },
];

const values = [
  {
    name: 'Kalite',
    description: 'En kaliteli malzemeler ve işçilik ile üretim yapıyoruz.',
    icon: Award,
  },
  {
    name: 'Müşteri Memnuniyeti',
    description: 'Müşterilerimizin memnuniyeti bizim için her şeyden önemli.',
    icon: Heart,
  },
  {
    name: 'Yenilikçilik',
    description: 'Sürekli kendimizi geliştiriyor ve yenilikleri takip ediyoruz.',
    icon: Building2,
  },
  {
    name: 'Güven',
    description: '25 yıllık tecrübemiz ile müşterilerimize güven veriyoruz.',
    icon: Users,
  },
];

// Yükleme durumu için bileşenler
function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div className="h-[400px] w-[600px] animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-8 w-24 rounded bg-gray-200" />
              <div className="mt-2 h-12 w-16 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-32 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero bölümü
async function HeroSection() {
  const { companyInfo } = await getAboutData();

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {companyInfo.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{companyInfo.description}</p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src={companyInfo.image}
              alt="Şirket Görseli"
              width={1000}
              height={1000}
              className="rounded-md shadow-2xl ring-1 ring-gray-400/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// İstatistikler bölümü
async function StatsSection() {
  const { statistics } = await getAboutData();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Rakamlarla Biz
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map(
            (stat: { id: string; title: string; value: string; description: string }) => (
              <div key={stat.id} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                <p className="mt-2 text-3xl font-bold text-indigo-600">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// Ekip bölümü
async function TeamSection() {
  const { teamMembers } = await getAboutData();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ekibimiz</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map(
            (member: {
              id: string;
              name: string;
              position: string;
              image: string;
              bio: string;
            }) => (
              <div key={member.id} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="mx-auto h-48 w-48 rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.position}</p>
                <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// Değerler bölümü
function ValuesSection() {
  const values = [
    {
      name: 'Kalite',
      description: 'En kaliteli malzemeler ve işçilik ile üretim yapıyoruz.',
      icon: Award,
    },
    {
      name: 'Müşteri Memnuniyeti',
      description: 'Müşterilerimizin memnuniyeti bizim için her şeyden önemli.',
      icon: Heart,
    },
    {
      name: 'Yenilikçilik',
      description: 'Sürekli kendimizi geliştiriyor ve yenilikleri takip ediyoruz.',
      icon: Building2,
    },
    {
      name: 'Güven',
      description: '25 yıllık tecrübemiz ile müşterilerimize güven veriyoruz.',
      icon: Users,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Değerlerimiz
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(value => (
            <div key={value.name} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <value.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = generateMetadata({
  title: 'Hakkımızda',
  description:
    'Liman Design olarak 20 yılı aşkın süredir mobilya ve dekorasyon sektöründe hizmet veriyoruz. Modern tasarımlar ve kaliteli ürünlerle evinize değer katıyoruz.',
  image: '/images/about-og.jpg',
});

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<TeamSkeleton />}>
        <TeamSection />
      </Suspense>

      <ValuesSection />
    </div>
  );
}
