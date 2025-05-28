"use client";
import { useState, useTransition } from "react";
import { z } from "zod";
import { createProduct } from "@/lib/nhost/mutations";

const productSchema = z.object({
  name: z.string().min(2, "Ürün adı en az 2 karakter olmalı"),
  price: z.coerce.number().min(1, "Fiyat pozitif olmalı"),
});

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, startTransition] = useTransition();
  const [hasError, setHasError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError("");
    setSuccess("");
    const parsed = productSchema.safeParse({ name, price });
    if (!parsed.success) {
      setHasError(parsed.error.errors[0].message);
      return;
    }
    startTransition(async () => {
      try {
        await createProduct({ name, price: Number(price), slug: "", description: "", stock: 0, images: [], status: "active" });
        setName("");
        setPrice("");
        setSuccess("Ürün başarıyla eklendi.");
      } catch {
        setHasError("Ürün eklenemedi. Lütfen tekrar deneyin.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Ürün adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Fiyat"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded"
      />
      {hasError && <span className="text-red-500 text-sm">{hasError}</span>}
      {success && <span className="text-green-600 text-sm">{success}</span>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Ekleniyor..." : "Ürün Ekle"}
      </button>
    </form>
  );
} 