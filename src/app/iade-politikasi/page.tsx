export default function ReturnPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            İade ve Değişim Politikası
          </h1>
          <p className="mt-4 text-sm text-gray-500">Son güncelleme: 1 Mart 2024</p>

          <div className="mt-8 space-y-8 text-base text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. İade Koşulları</h2>
              <p className="mt-4">
                Ürünlerimizi teslim aldığınız tarihten itibaren 14 gün içinde herhangi bir sebep
                göstermeksizin iade edebilirsiniz. İade edilecek ürünün kullanılmamış, orijinal
                ambalajında ve faturası ile birlikte olması gerekmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. İade Süreci</h2>
              <p className="mt-4">
                İade işlemi için öncelikle müşteri hizmetlerimizle iletişime geçmeniz gerekmektedir.
                İade talebiniz onaylandıktan sonra, ürünü kargo firmamız aracılığıyla bize
                gönderebilirsiniz. Kargo ücreti iade edilecek ürünün değerine göre değişiklik
                gösterebilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Değişim</h2>
              <p className="mt-4">
                Ürün değişimi için de aynı iade koşulları geçerlidir. Değişim yapmak istediğiniz
                ürünün stokta olması durumunda, fiyat farkı olup olmadığına bakılmaksızın değişim
                işlemi gerçekleştirilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Ödeme İadesi</h2>
              <p className="mt-4">
                İade edilen ürünün bedeli, ödeme yapılan karta veya banka hesabına, iade işleminin
                tamamlanmasından sonraki 14 iş günü içinde iade edilir. Kredi kartı iadeleri,
                bankanızın işlem süresine bağlı olarak değişiklik gösterebilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. İade Edilemeyecek Ürünler</h2>
              <p className="mt-4">Aşağıdaki durumlarda ürün iadesi kabul edilmemektedir:</p>
              <ul className="mt-4 list-disc pl-5 space-y-2">
                <li>Ürünün kullanılmış olması</li>
                <li>Orijinal ambalajının bozulmuş olması</li>
                <li>Ürünün montajının yapılmış olması</li>
                <li>Ürünün kullanım kılavuzunun kaybedilmiş olması</li>
                <li>Ürünün parçalarının eksik olması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">6. İletişim</h2>
              <p className="mt-4">
                İade ve değişim işlemleri ile ilgili sorularınız için{' '}
                <a href="/iletisim" className="text-indigo-600 hover:text-indigo-500">
                  iletişim sayfamızdan
                </a>{' '}
                bize ulaşabilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
