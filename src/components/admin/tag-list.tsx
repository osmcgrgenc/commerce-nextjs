"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getTags } from "@/lib/nhost/queries";
import { deleteTag } from "@/lib/nhost/mutations";
import { Tag } from "@/lib/nhost/types";

export default function TagList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getTags();
      setTags(data);
    } catch {
      setError("Etiketler yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu etiketi silmek istediğinizden emin misiniz?")) return;

    try {
      await deleteTag(id);
      await loadTags();
    } catch {
      setError("Etiket silinemedi.");
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Etiketler</h3>
          <Link
            href="/admin/tags/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Yeni Etiket
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {tags.map((tag) => (
          <div key={tag.id} className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{tag.name}</h4>
                <p className="text-sm text-gray-500">/{tag.slug}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/tags/${tag.id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 