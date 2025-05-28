"use client";
import { useState } from "react";
import { getProducts } from "@/lib/nhost/queries";
import { deleteProduct, updateProduct } from "@/lib/nhost/mutations";
import { Product } from "@/lib/nhost/types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<{ id: string; name: string; price: number } | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const loadProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Ürünler yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch {
        alert("Ürün silinemedi.");
      }
    }
  };

  const handleEdit = (product: { id: string; name: string; price: number }) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price.toString());
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct(editingProduct.id, {
        name: editName,
        price: Number(editPrice),
        slug: "",
        description: "",
        stock: 0,
        images: [],
        status: "active",
      });
      setEditingProduct(null);
      await loadProducts();
    } catch {
      alert("Ürün güncellenemedi.");
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!products || products.length === 0) return <div>Hiç ürün yok.</div>;

  return (
    <>
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id} className="py-2 flex justify-between items-center">
            <span>{product.name}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₺{product.price}</span>
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Ürün Düzenle</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border p-2 rounded mb-2 w-full"
              placeholder="Ürün adı"
            />
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="border p-2 rounded mb-2 w-full"
              placeholder="Fiyat"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                İptal
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 