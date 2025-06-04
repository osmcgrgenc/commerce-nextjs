import nhost from '@/lib/nhost/client';
import { cache } from 'react';

export type Category = {
  id: string;
  name: string;
  image: string;
  href: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
  category: string;
  arrivalDate?: string;
  stock: number;
  isNew?: boolean;
};

export type Banner = {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
};

interface NhostCategory {
  id: string;
  name: string;
  image_url: string;
  description: string;
  slug: string;
}

interface NhostProduct {
  id: string;
  name: string;
  price: number;
  discount_price?: number;
  slug: string;
  stock_quantity: number;
  created_at: string;
  images: Array<{
    image_url: string;
    is_primary: boolean;
  }>;
  category: {
    name: string;
    slug: string;
  };
}

interface NhostBanner {
  id: string;
  title: string;
  description: string;
  image_url: string;
  button_text: string;
  button_link: string;
  is_active: boolean;
  order: number;
}

// Kategorileri getir
export const getCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await nhost.graphql.request<{ categories: NhostCategory[] }>(`
    query GetCategories {
      categories {
        id
        name
        image_url
        description
        slug
      }
    }
  `);

  if (error) throw error;

  return data.categories.map((category: NhostCategory) => ({
    id: category.id,
    name: category.name,
    image: category.image_url,
    href: `/kategoriler/${category.slug}`,
    description: category.description,
  }));
});

// Öne çıkan ürünleri getir
export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
    query GetFeaturedProducts {
      products(where: {is_featured: {_eq: true}}) {
        id
        name
        price
        images(where: {is_primary: {_eq: true}}) {
          image_url
        }
        category {
          name
          slug
        }
        stock_quantity
        slug
      }
    }
  `);

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0]?.image_url || '/images/placeholder.jpg',
    href: `/urunler/${product.slug}`,
    category: product.category.name,
    stock: product.stock_quantity,
  }));
});

// Banner'ları getir
export const getBanners = cache(async (): Promise<Banner[]> => {
  const { data, error } = await nhost.graphql.request<{ banners: NhostBanner[] }>(`
    query GetBanners {
      banners(where: {is_active: {_eq: true}}, order_by: {order: asc}) {
        id
        title
        description
        image_url
        button_text
        button_link
        is_active
        order
      }
    }
  `);

  if (error) throw error;

  return data.banners.map((banner: NhostBanner) => ({
    id: banner.id,
    title: banner.title,
    description: banner.description,
    image: banner.image_url,
    buttonText: banner.button_text,
    buttonLink: banner.button_link,
    isActive: banner.is_active,
    order: banner.order,
  }));
});

// Yeni gelen ürünleri getir
export const getNewArrivals = cache(async (): Promise<Product[]> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
    query GetNewArrivals {
      products(where: {is_new: {_eq: true}}, order_by: {created_at: desc}, limit: 8) {
        id
        name
        price
        images(where: {is_primary: {_eq: true}}) {
          image_url
        }
        category {
          name
        }
        stock_quantity
        created_at
        slug
      }
    }
  `);

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0]?.image_url || '/images/placeholder.jpg',
    href: `/urunler/${product.slug}`,
    category: product.category.name,
    stock: product.stock_quantity,
    isNew: true,
    arrivalDate: product.created_at,
  }));
});

// Kategori detaylarını getir
export const getCategoryDetails = cache(
  async (
    slug: string
  ): Promise<{
    category: Category;
    products: Product[];
  }> => {
    const { data, error } = await nhost.graphql.request<{
      categories: NhostCategory[];
      products: NhostProduct[];
    }>(
      `
    query GetCategoryDetails($slug: String!) {
      categories(where: {slug: {_eq: $slug}}) {
        id
        name
        image_url
        description
        slug
      }
      products(where: {category: {slug: {_eq: $slug}}}) {
        id
        name
        price
        discount_price
        images(where: {is_primary: {_eq: true}}) {
          image_url
        }
        category {
          name
          slug
        }
        stock_quantity
        slug
        created_at
      }
    }
  `,
      { slug }
    );

    if (error) throw error;
    if (!data.categories[0]) throw new Error('Kategori bulunamadı');

    const category = data.categories[0];
    return {
      category: {
        id: category.id,
        name: category.name,
        image: category.image_url,
        href: `/kategoriler/${category.slug}`,
        description: category.description,
      },
      products: data.products.map((product: NhostProduct) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.image_url || '/images/placeholder.jpg',
        href: `/urunler/${product.slug}`,
        category: product.category.name,
        stock: product.stock_quantity,
        isNew: new Date(product.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
      })),
    };
  }
);

// Ürün detaylarını getir
export const getProductDetails = cache(async (slug: string): Promise<Product> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(
    `
    query GetProductDetails($slug: String!) {
      products(where: {slug: {_eq: $slug}}) {
        id
        name
        price
        discount_price
        description
        images {
          image_url
          is_primary
        }
        category {
          name
          slug
        }
        stock_quantity
        slug
        created_at
        specifications
        variants {
          id
          name
          price_adjustment
          stock_quantity
        }
      }
    }
  `,
    { slug }
  );

  if (error) throw error;
  if (!data.products[0]) throw new Error('Ürün bulunamadı');

  const product = data.products[0];
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image:
      product.images.find(img => img.is_primary)?.image_url ||
      product.images[0]?.image_url ||
      '/images/placeholder.jpg',
    href: `/urunler/${product.slug}`,
    category: product.category.name,
    stock: product.stock_quantity,
    isNew: new Date(product.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  };
});

// Arama sonuçlarını getir
export const searchProducts = cache(async (query: string): Promise<Product[]> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(
    `
    query SearchProducts($query: String!) {
      products(
        where: {
          _or: [
            { name: { _ilike: $query } }
            { description: { _ilike: $query } }
          ]
        }
      ) {
        id
        name
        price
        images(where: {is_primary: {_eq: true}}) {
          image_url
        }
        category {
          name
          slug
        }
        stock_quantity
        slug
        created_at
      }
    }
  `,
    { query: `%${query}%` }
  );

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0]?.image_url || '/images/placeholder.jpg',
    href: `/urunler/${product.slug}`,
    category: product.category.name,
    stock: product.stock_quantity,
    isNew: new Date(product.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
  }));
});

// İndirimli ürünleri getir
export const getDiscountedProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
    query GetDiscountedProducts {
      products(where: {discount_price: {_is_null: false}}) {
        id
        name
        price
        discount_price
        images(where: {is_primary: {_eq: true}}) {
          image_url
        }
        category {
          name
        }
        stock_quantity
        slug
      }
    }
  `);

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    price: product.discount_price || product.price,
    image: product.images[0]?.image_url || '/images/placeholder.jpg',
    href: `/urunler/${product.slug}`,
    category: product.category.name,
    stock: product.stock_quantity,
  }));
});

// Hakkımızda sayfası verilerini getir
export const getAboutData = cache(async () => {
  const { data, error } = await nhost.graphql.request<{
    company_info: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
    }>;
    statistics: Array<{
      id: string;
      title: string;
      value: string;
      description: string;
    }>;
    team_members: Array<{
      id: string;
      name: string;
      position: string;
      image: string;
      bio: string;
    }>;
  }>(`
    query GetAboutData {
      company_info {
        id
        title
        description
        image
      }
      statistics {
        id
        title
        value
        description
      }
      team_members {
        id
        name
        position
        image
        bio
      }
    }
  `);

  if (error) throw error;
  if (!data.company_info[0]) throw new Error('Şirket bilgisi bulunamadı');

  return {
    companyInfo: data.company_info[0],
    statistics: data.statistics,
    teamMembers: data.team_members,
  };
});
