export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">Son güncelleme: 15 Mart 2024</p>

          <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Giriş</h2>
              <p className="mt-4">
                Liman Design olarak, gizliliğinize saygı duyuyor ve kişisel verilerinizin
                korunmasına önem veriyoruz. Bu gizlilik politikası, web sitemizi kullanırken kişisel
                verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                2. Toplanan Bilgiler
              </h2>
              <p className="mt-4">Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Ad, soyad ve iletişim bilgileri</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Teslimat adresi</li>
                <li>Sipariş geçmişi</li>
                <li>Ödeme bilgileri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                3. Bilgilerin Kullanımı
              </h2>
              <p className="mt-4">Topladığımız bilgileri aşağıdaki amaçlar için kullanıyoruz:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Siparişlerinizi işlemek ve teslim etmek</li>
                <li>Müşteri hizmetleri sağlamak</li>
                <li>Ürün ve hizmetlerimizi geliştirmek</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Güvenlik ve dolandırıcılık önleme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                4. Bilgi Güvenliği
              </h2>
              <p className="mt-4">
                Kişisel verilerinizin güvenliği bizim için önemlidir. Bu nedenle:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>SSL şifreleme kullanıyoruz</li>
                <li>Düzenli güvenlik güncellemeleri yapıyoruz</li>
                <li>Verilerinize yetkisiz erişimi engelliyoruz</li>
                <li>Çalışanlarımıza düzenli gizlilik eğitimleri veriyoruz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">5. Çerezler</h2>
              <p className="mt-4">
                Web sitemizde çerezler kullanıyoruz. Çerezler, web sitemizi daha iyi kullanmanızı
                sağlamak ve size daha iyi bir deneyim sunmak için kullanılır. Çerezleri tarayıcı
                ayarlarınızdan kontrol edebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                6. Üçüncü Taraflar
              </h2>
              <p className="mt-4">
                Kişisel verilerinizi, yasal zorunluluklar dışında üçüncü taraflarla paylaşmıyoruz.
                Hizmet sağlayıcılarımız (örneğin, ödeme işlemcileri ve kargo şirketleri) ile veri
                paylaşımı, hizmetlerimizi sunmak için gereklidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">7. Haklarınız</h2>
              <p className="mt-4">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Kişisel verilerinize erişim</li>
                <li>Kişisel verilerinizin düzeltilmesi</li>
                <li>Kişisel verilerinizin silinmesi</li>
                <li>Kişisel verilerinizin işlenmesine itiraz etme</li>
                <li>Kişisel verilerinizin taşınması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">8. İletişim</h2>
              <p className="mt-4">
                Gizlilik politikamız hakkında sorularınız için bize aşağıdaki kanallardan
                ulaşabilirsiniz:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>E-posta: privacy@limandesign.com</li>
                <li>Telefon: +90 (212) 555 55 55</li>
                <li>Adres: Atatürk Mahallesi, Cumhuriyet Caddesi No: 1, 34000 İstanbul</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
