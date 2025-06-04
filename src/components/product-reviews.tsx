'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  title: string;
  comment: string;
  likes: number;
  dislikes: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ProductReviews({
  productId,
  averageRating,
  totalReviews,
  reviews,
}: ProductReviewsProps) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada normalde API'ye gönderilecek
    toast.success('Yorumunuz başarıyla eklendi');
    setNewReview({ rating: 0, title: '', comment: '' });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-24">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Müşteri Yorumları</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map(rating => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      rating < averageRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{averageRating} out of 5 stars</p>
            </div>
            <p className="ml-3 text-sm text-gray-700">{totalReviews} değerlendirme</p>
          </div>

          {/* Yorum Formu */}
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Yorum Yap</h3>
            <form onSubmit={handleSubmitReview} className="mt-6 space-y-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Puanınız
                </label>
                <div className="mt-2 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Başlık
                </label>
                <input
                  type="text"
                  id="title"
                  value={newReview.title}
                  onChange={e => setNewReview({ ...newReview, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Yorumunuz
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Yorumu Gönder
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:mt-0">
          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.map(review => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.user.name}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map(rating => (
                          <Star
                            key={rating}
                            className={`h-4 w-4 flex-shrink-0 ${
                              rating < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    {review.verified && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Doğrulanmış Alışveriş
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-6 text-base text-gray-600">
                    <h4 className="text-sm font-medium text-gray-900">{review.title}</h4>
                    <p>{review.comment}</p>
                  </div>

                  <div className="mt-6 flex items-center space-x-4">
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="ml-1">{review.likes}</span>
                    </button>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="ml-1">{review.dislikes}</span>
                    </button>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
