'use client';

import nhost from './nhost/client';
import { Product, Category, Post, Contact } from '@/types';
import { cache } from 'react';

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
  created_at: string;
  updated_at: string;
}

interface NhostProduct {
  id: string;
  name: string;
  price: number;
  discount_price?: number;
  slug: string;
  description: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  images: Array<{
    image_url: string;
    is_primary: boolean;
  }>;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
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
        created_at
        updated_at
      }
    }
  `);

  if (error) {
    console.error('Kategoriler getirilirken hata oluştu:', error);
    throw new Error('Kategoriler getirilemedi');
  }

  if (!data?.categories) {
    console.error('Kategoriler bulunamadı');
    return [];
  }

  return data.categories.map((category: NhostCategory) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    created_at: category.created_at,
    updated_at: category.updated_at
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
        slug
        description
        images {
          image_url
          is_primary
        }
        category {
          id
          name
          slug
          description
          created_at
          updated_at
        }
        stock_quantity
        created_at
        updated_at
      }
    }
  `);

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images.map(img => img.image_url),
    category: product.category,
    created_at: product.created_at,
    updated_at: product.updated_at
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
        slug
        description
        images {
          image_url
          is_primary
        }
        category {
          id
          name
          slug
          description
          created_at
          updated_at
        }
        stock_quantity
        created_at
        updated_at
      }
    }
  `);

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images.map(img => img.image_url),
    category: product.category,
    created_at: product.created_at,
    updated_at: product.updated_at
  }));
});

// Kategori detaylarını getir
export const getCategoryDetails = cache(async (slug: string): Promise<{ category: Category; products: Product[] }> => {
  const { data, error } = await nhost.graphql.request<{ categories: NhostCategory[]; products: NhostProduct[] }>(`
    query GetCategoryDetails($slug: String!) {
      categories(where: {slug: {_eq: $slug}}) {
        id
        name
        slug
        description
        created_at
        updated_at
      }
      products(where: {category: {slug: {_eq: $slug}}}) {
        id
        name
        price
        slug
        description
        images {
          image_url
          is_primary
        }
        category {
          id
          name
          slug
          description
          created_at
          updated_at
        }
        stock_quantity
        created_at
        updated_at
      }
    }
  `, { slug });

  if (error) throw error;
  if (!data.categories[0]) throw new Error('Kategori bulunamadı');

  return {
    category: {
      id: data.categories[0].id,
      name: data.categories[0].name,
      slug: data.categories[0].slug,
      description: data.categories[0].description,
      created_at: data.categories[0].created_at,
      updated_at: data.categories[0].updated_at
    },
    products: data.products.map((product: NhostProduct) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      images: product.images.map(img => img.image_url),
      category: product.category,
      created_at: product.created_at,
      updated_at: product.updated_at
    }))
  };
});

// Ürün detaylarını getir
export const getProductDetails = cache(async (slug: string): Promise<Product> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
    query GetProductDetails($slug: String!) {
      products(where: {slug: {_eq: $slug}}) {
        id
        name
        price
        slug
        description
        images {
          image_url
          is_primary
        }
        category {
          id
          name
          slug
          description
          created_at
          updated_at
        }
        stock_quantity
        created_at
        updated_at
      }
    }
  `, { slug });

  if (error) throw error;
  if (!data.products[0]) throw new Error('Ürün bulunamadı');

  const product = data.products[0];
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images.map(img => img.image_url),
    category: product.category,
    created_at: product.created_at,
    updated_at: product.updated_at
  };
});

// Arama sonuçlarını getir
export const searchProducts = cache(async (query: string): Promise<Product[]> => {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
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
        slug
        description
        images {
          image_url
          is_primary
        }
        category {
          id
          name
          slug
          description
          created_at
          updated_at
        }
        stock_quantity
        created_at
        updated_at
      }
    }
  `, { query: `%${query}%` });

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images.map(img => img.image_url),
    category: product.category,
    created_at: product.created_at,
    updated_at: product.updated_at
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
        slug
        description
        images {
          image_url
          is_primary
        }
        category {
          id
          name
          slug
          description
          created_at
          updated_at
        }
        stock_quantity
        created_at
        updated_at
      }
    }
  `);

  if (error) throw error;

  return data.products.map((product: NhostProduct) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images.map(img => img.image_url),
    category: product.category,
    created_at: product.created_at,
    updated_at: product.updated_at
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

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await nhost.graphql.request(`
      query GetProducts {
        products {
          id
          name
          slug
          description
          price
          images
          category {
            id
            name
            slug
          }
          created_at
          updated_at
        }
      }
    `);

    if (error) throw error;
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await nhost.graphql.request(`
      query GetPosts {
        posts {
          id
          title
          slug
          description
          content
          image
          category {
            id
            name
            slug
          }
          author {
            id
            name
            email
            image
            bio
          }
          created_at
          updated_at
        }
      }
    `);

    if (error) throw error;
    return data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact | null> {
  try {
    const { data, error } = await nhost.graphql.request(`
      mutation CreateContact($contact: contacts_insert_input!) {
        insert_contacts_one(object: $contact) {
          id
          name
          email
          phone
          message
          created_at
          updated_at
        }
      }
    `, {
      contact,
    });

    if (error) throw error;
    return data.insert_contacts_one;
  } catch (error) {
    console.error('Error creating contact:', error);
    return null;
  }
}
