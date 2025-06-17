'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useNhostClient } from '@nhost/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nhost = useNhostClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await nhost.graphql.request(`
        mutation CreateContact($name: String!, $email: String!, $subject: String!, $message: String!) {
          insert_contacts_one(object: {
            name: $name,
            email: $email,
            subject: $subject,
            message: $message
          }) {
            id
          }
        }
      `, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (error) throw error;

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      toast.success('Mesajınız başarıyla gönderildi');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          İletişim
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Sorularınız için bizimle iletişime geçin
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src="/images/showroom.jpg"
            alt="Showroom"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Ad Soyad
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                E-posta
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-900"
              >
                Konu
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-900"
              >
                Mesaj
              </label>
              <div className="mt-2">
                <Textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </Button>
          </form>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Adres</h3>
              <p className="mt-2 text-sm text-gray-600">
                Örnek Mahallesi, Örnek Sokak No:1
                <br />
                Kadıköy, İstanbul
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Telefon</h3>
              <p className="mt-2 text-sm text-gray-600">
                <a href="tel:+902121234567" className="hover:text-gray-900">
                  +90 (212) 123 45 67
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">E-posta</h3>
              <p className="mt-2 text-sm text-gray-600">
                <a
                  href="mailto:info@limandesign.com"
                  className="hover:text-gray-900"
                >
                  info@limandesign.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
