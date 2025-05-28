"use client";
import { Suspense } from "react";
import AdminGuard from "@/components/auth/admin-guard";
import ProductList from "@/components/admin/product-list";
import ProductForm from "@/components/admin/product-form";

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <main className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ürün Yönetimi</h1>
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Yeni Ürün Ekle</h2>
          <ProductForm />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Ürün Listesi</h2>
          <Suspense fallback={<div>Yükleniyor...</div>}>
            <ProductList />
          </Suspense>
        </section>
      </main>
    </AdminGuard>
  );
} 