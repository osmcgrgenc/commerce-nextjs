"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPageBySlug } from "@/lib/nhost/queries";
import { createPage, updatePage } from "@/lib/nhost/mutations";
import RichTextEditor from "./rich-text-editor";

type PageFormProps = {
  pageId?: string;
};

type PageData = {
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  status: "draft" | "published";
};

export default function PageForm({ pageId }: PageFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PageData>({
    title: "",
    slug: "",
    content: "",
    meta_title: "",
    meta_description: "",
    status: "draft",
  });

  useEffect(() => {
    if (pageId) {
      loadPage();
    }
  }, [pageId]);

  const loadPage = async () => {
    try {
      setIsLoading(true);
      const page = await getPageBySlug(pageId!);
      if (page) {
        setFormData({
          title: page.title,
          slug: page.slug,
          content: page.content,
          meta_title: page.meta_title || "",
          meta_description: page.meta_description || "",
          status: page.status,
        });
      }
    } catch {
      setError("Sayfa yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      if (pageId) {
        await updatePage(pageId, formData);
      } else {
        await createPage(formData);
      }

      router.push("/admin/pages");
      router.refresh();
    } catch {
      setError("Sayfa kaydedilirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Başlık
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          İçerik
        </label>
        <div className="mt-1">
          <RichTextEditor
            content={formData.content}
            onChange={(content) =>
              setFormData((prev) => ({ ...prev, content }))
            }
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="meta_title"
          className="block text-sm font-medium text-gray-700"
        >
          Meta Başlık
        </label>
        <input
          type="text"
          id="meta_title"
          name="meta_title"
          value={formData.meta_title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="meta_description"
          className="block text-sm font-medium text-gray-700"
        >
          Meta Açıklama
        </label>
        <textarea
          id="meta_description"
          name="meta_description"
          value={formData.meta_description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Durum
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="draft">Taslak</option>
          <option value="published">Yayında</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
} 