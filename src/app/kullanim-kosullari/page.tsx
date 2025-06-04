export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kullanım Koşulları
          </h1>
          <p className="mt-4 text-sm text-gray-500">Son güncelleme: 1 Mart 2024</p>

          <div className="mt-8 space-y-8 text-base text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Genel Hükümler</h2>
              <p className="mt-4">
                Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız.
                Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. Üyelik</h2>
              <p className="mt-4">
                Sitemize üye olmak için 18 yaşından büyük olmanız ve geçerli bir e-posta adresine
                sahip olmanız gerekmektedir. Üyelik bilgilerinizin doğruluğundan ve güncelliğinden
                siz sorumlusunuz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Sipariş ve Ödeme</h2>
              <p className="mt-4">
                Siparişleriniz, ödeme onayından sonra işleme alınır. Ödeme seçenekleri ve koşulları
                hakkında detaylı bilgi için ödeme sayfamızı inceleyebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Fikri Mülkiyet Hakları</h2>
              <p className="mt-4">
                Sitemizde yer alan tüm içerikler (metin, görsel, logo vb.) Liman Design'a aittir ve
                telif hakları ile korunmaktadır. İzinsiz kullanımı yasaktır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Sorumluluk Sınırları</h2>
              <p className="mt-4">
                Sitemiz, ürünlerin kullanımından kaynaklanan doğrudan veya dolaylı zararlardan
                sorumlu tutulamaz. Ürünlerin kullanımı ile ilgili tüm riskler kullanıcıya aittir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">6. Değişiklikler</h2>
              <p className="mt-4">
                Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı tutarız.
                Değişiklikler sitede yayınlandığı anda yürürlüğe girer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">7. İletişim</h2>
              <p className="mt-4">
                Kullanım koşulları ile ilgili sorularınız için{' '}
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
