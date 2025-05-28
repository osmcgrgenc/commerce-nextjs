import nhost from './client';
import { GraphQLResponse, Page, Post, Comment, Category, Tag, Product, Order, Customer, Settings } from './types';

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
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ categories: Category[] }>>(
    `
    query GetCategories {
      categories(order_by: {name: asc}) {
        id
        name
        slug
      }
    }
    `
  );

  if (error) throw error;
  return data.data.categories || [];
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
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ products: Product[] }>>(
    `
    query GetProducts {
      products(order_by: {created_at: desc}) {
        id
        name
        slug
        description
        price
        stock
        images
        categories
        tags
        status
        created_at
        updated_at
      }
    }
    `
  );

  if (error) throw error;
  return data.data.products || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ products: Product[] }>>(
    `
    query GetProductBySlug($slug: String!) {
      products(where: {slug: {_eq: $slug}}) {
        id
        name
        slug
        description
        price
        stock
        images
        categories
        tags
        status
        created_at
        updated_at
      }
    }
    `,
    { slug }
  );

  if (error) throw error;
  return data.data.products?.[0] || null;
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
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ orders: { status: string }[] }>>(
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
    last30DaysRevenue
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
    newCustomers: newCustomers.length
  };
} 