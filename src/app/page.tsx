// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">E-Ticaret Sitemize Hoş Geldiniz</h1>
      <p className="mb-8">En kaliteli ürünler, en uygun fiyatlarla burada!</p>
      <a href="/admin/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Admin Paneline Git
      </a>
    </div>
  );
}
