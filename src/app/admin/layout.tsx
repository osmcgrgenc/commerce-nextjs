import Link from 'next/link';
import { DocumentIcon, DocumentTextIcon, FolderIcon, TagIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="block p-2 hover:bg-gray-700 rounded">
                Ürün Yönetimi
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="block p-2 hover:bg-gray-700 rounded">
                Sipariş Yönetimi
              </Link>
            </li>
            <li>
              <Link href="/admin/customers" className="block p-2 hover:bg-gray-700 rounded">
                Müşteri Yönetimi
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block p-2 hover:bg-gray-700 rounded">
                Ayarlar
              </Link>
            </li>
            <li>
              <Link href="/admin/pages" className="block p-2 hover:bg-gray-700 rounded">
                <DocumentIcon className="h-5 w-5 mr-2" />
                Sayfa Yönetimi
              </Link>
            </li>
            <li>
              <Link href="/admin/posts" className="block p-2 hover:bg-gray-700 rounded">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Blog Yönetimi
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="block p-2 hover:bg-gray-700 rounded">
                <FolderIcon className="h-5 w-5 mr-2" />
                Kategori Yönetimi
              </Link>
            </li>
            <li>
              <Link href="/admin/tags" className="block p-2 hover:bg-gray-700 rounded">
                <TagIcon className="h-5 w-5 mr-2" />
                Etiket Yönetimi
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}
