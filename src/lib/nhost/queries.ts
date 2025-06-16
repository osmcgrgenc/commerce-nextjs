import nhost from './client';
import {
  GraphQLResponse,
  Page,
  Post,
  Comment,
  Category,
  Tag,
  Product,
  Order,
  Customer,
  Settings,
} from './types';

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

interface NhostCategory {
  id: string;
  name: string;
  image_url: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export async function getPages(): Promise<Page[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ pages: Page[] }>>(
    `
    query GetPages {
      pages(order_by: {created_at: desc}) {
        id
        title
        slug
        content
        meta_title
        meta_description
        status
        created_at
        updated_at
      }
    }
    `
  );

  if (error) throw error;
  return data.data.pages || [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ pages: Page[] }>>(
    `
    query GetPageBySlug($slug: String!) {
      pages(where: {slug: {_eq: $slug}}) {
        id
        title
        slug
        content
        meta_title
        meta_description
        status
        created_at
        updated_at
      }
    }
    `,
    { slug }
  );

  if (error) throw error;
  return data.data.pages?.[0] || null;
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ posts: Post[] }>>(
    `
    query GetPosts {
      posts(order_by: {created_at: desc}) {
        id
        title
        slug
        content
        excerpt
        featured_image
        meta_title
        meta_description
        status
        categories
        tags
        created_at
        updated_at
      }
    }
    `
  );

  if (error) throw error;
  return data.data.posts || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ posts: Post[] }>>(
    `
    query GetPostBySlug($slug: String!) {
      posts(where: {slug: {_eq: $slug}}) {
        id
        title
        slug
        content
        excerpt
        featured_image
        meta_title
        meta_description
        status
        categories
        tags
        created_at
        updated_at
      }
    }
    `,
    { slug }
  );

  if (error) throw error;
  return data.data.posts?.[0] || null;
}

export async function getComments(postId: string): Promise<Comment[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ comments: Comment[] }>>(
    `
    query GetComments($postId: uuid!) {
      comments(where: {post_id: {_eq: $postId}}, order_by: {created_at: desc}) {
        id
        content
        status
        user {
          display_name
        }
        created_at
        updated_at
      }
    }
    `,
    { postId }
  );

  if (error) throw error;
  return data.data.comments || [];
}

export async function getCategories(): Promise<Category[]> {
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

  if (error) throw error;

  return data.categories.map((category: NhostCategory) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    created_at: category.created_at,
    updated_at: category.updated_at
  }));
}

export async function getTags(): Promise<Tag[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ tags: Tag[] }>>(
    `
    query GetTags {
      tags(order_by: {name: asc}) {
        id
        name
        slug
      }
    }
    `
  );

  if (error) throw error;
  return data.data.tags || [];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
    query GetProducts {
      products {
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
    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      description: product.category.description,
      created_at: product.category.created_at,
      updated_at: product.category.updated_at
    },
    stock_quantity: product.stock_quantity,
    created_at: product.created_at,
    updated_at: product.updated_at
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await nhost.graphql.request<{ products: NhostProduct[] }>(`
    query GetProductBySlug($slug: String!) {
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
  if (!data.products[0]) return null;

  const product = data.products[0];
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    images: product.images.map(img => img.image_url),
    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      description: product.category.description,
      created_at: product.category.created_at,
      updated_at: product.category.updated_at
    },
    stock_quantity: product.stock_quantity,
    created_at: product.created_at,
    updated_at: product.updated_at
  };
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ orders: Order[] }>>(
    `
    query GetOrders {
      orders(order_by: {created_at: desc}) {
        id
        customer_id
        status
        total
        items {
          id
          product_id
          quantity
          price
          product {
            name
            slug
            image
          }
        }
        shipping_address {
          full_name
          address_line1
          address_line2
          city
          state
          postal_code
          country
          phone
        }
        billing_address {
          full_name
          address_line1
          address_line2
          city
          state
          postal_code
          country
          phone
        }
        payment_status
        created_at
        updated_at
      }
    }
    `
  );

  if (error) throw error;
  return data.data.orders || [];
}

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ customers: Customer[] }>>(
    `
    query GetCustomers {
      customers(order_by: {created_at: desc}) {
        id
        email
        display_name
        phone_number
        addresses {
          full_name
          address_line1
          address_line2
          city
          state
          postal_code
          country
          phone
        }
        created_at
        updated_at
      }
    }
    `
  );

  if (error) throw error;
  return data.data.customers || [];
}

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ settings: Settings[] }>>(
    `
    query GetSettings {
      settings {
        id
        site_name
        site_description
        logo_url
        favicon_url
        contact_email
        contact_phone
        social_media {
          facebook
          twitter
          instagram
          linkedin
        }
        seo {
          meta_title
          meta_description
          keywords
        }
        updated_at
      }
    }
    `
  );

  if (error) throw error;
  return data.data.settings?.[0] || null;
}

export async function getOrderStatusStats(): Promise<Record<string, number>> {
  const { data, error } = await nhost.graphql.request<
    GraphQLResponse<{ orders: { status: string }[] }>
  >(
    `
    query GetOrderStatusStats {
      orders {
        status
      }
    }
    `
  );

  if (error) throw error;

  const stats: Record<string, number> = {};
  data.data.orders?.forEach(order => {
    stats[order.status] = (stats[order.status] || 0) + 1;
  });

  return stats;
}

export async function getRecentOrders(): Promise<Order[]> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ orders: Order[] }>>(
    `
    query GetRecentOrders {
      orders(order_by: {created_at: desc}, limit: 5) {
        id
        total
        status
        created_at
        user {
          display_name
          email
        }
      }
    }
    `
  );

  if (error) throw error;
  return data.data.orders || [];
}

export async function getSalesStats() {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ orders: Order[] }>>(
    `
    query GetSalesStats {
      orders {
        total
        created_at
      }
    }
    `
  );

  if (error) throw error;

  const orders = data.data.orders || [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  const last30DaysOrders = orders.filter(order => new Date(order.created_at) >= thirtyDaysAgo);
  const last30DaysRevenue = last30DaysOrders.reduce((sum, order) => sum + order.total, 0);

  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    last30DaysOrders: last30DaysOrders.length,
    last30DaysRevenue,
  };
}

export async function getCustomerStats() {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ customers: Customer[] }>>(
    `
    query GetCustomerStats {
      customers {
        created_at
      }
    }
    `
  );

  if (error) throw error;

  const customers = data.data.customers || [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  const newCustomers = customers.filter(customer => new Date(customer.created_at) >= thirtyDaysAgo);

  return {
    totalCustomers: customers.length,
    newCustomers: newCustomers.length,
  };
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await nhost.graphql.request(`
      query GetCategoryBySlug($slug: String!) {
        categories(where: { slug: { _eq: $slug } }) {
          id
          name
          slug
          description
          created_at
          updated_at
        }
      }
    `, {
      slug,
    });

    if (error) throw error;
    return data.categories[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ orders: Order[] }>>(
    `
    query GetOrderById($id: uuid!) {
      orders(where: {id: {_eq: $id}}) {
        id
        customer_id
        status
        total
        items {
          id
          product_id
          quantity
          price
          product {
            name
            slug
            image
          }
        }
        shipping_address {
          full_name
          address_line1
          address_line2
          city
          state
          postal_code
          country
          phone
        }
        billing_address {
          full_name
          address_line1
          address_line2
          city
          state
          postal_code
          country
          phone
        }
        payment_status
        created_at
        updated_at
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  return data.data.orders?.[0] || null;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ customers: Customer[] }>>(
    `
    query GetCustomerById($id: uuid!) {
      customers(where: {id: {_eq: $id}}) {
        id
        email
        display_name
        phone_number
        addresses {
          full_name
          address_line1
          address_line2
          city
          state
          postal_code
          country
          phone
        }
        created_at
        updated_at
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  return data.data.customers?.[0] || null;
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  try {
    const { data, error } = await nhost.graphql.request(`
      query GetRelatedProducts($slug: String!) {
        products(
          where: { 
            _and: [
              { slug: { _neq: $slug } },
              { category: { products: { slug: { _eq: $slug } } } }
            ]
          },
          limit: 4
        ) {
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
    `, {
      slug,
    });

    if (error) throw error;
    return data.products;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function getCategoryProducts(slug: string): Promise<Product[]> {
  try {
    const { data, error } = await nhost.graphql.request(`
      query GetCategoryProducts($slug: String!) {
        products(
          where: { category: { slug: { _eq: $slug } } }
        ) {
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
    `, {
      slug,
    });

    if (error) throw error;
    return data.products;
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}
