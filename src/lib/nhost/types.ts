export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published';
  categories?: string[];
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  user?: {
    display_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  display_name: string;
  phone_number?: string;
  created_at: string;
  last_sign_in_at?: string;
  metadata?: Record<string, unknown>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categories?: string[];
  tags?: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  status: string;
  total: number;
  items: {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      slug: string;
      image: string;
    };
  }[];
  shipping_address: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  billing_address: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  email: string;
  display_name: string;
  phone_number?: string;
  addresses: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  site_name: string;
  site_description?: string;
  logo_url?: string;
  favicon_url?: string;
  contact_email?: string;
  contact_phone?: string;
  theme?: 'light' | 'dark';
  currency?: 'TRY' | 'USD' | 'EUR';
  tax_rate?: number;
  social_media?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  seo?: {
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
  };
  updated_at: string;
}

export interface GraphQLResponse<T> {
  data: T;
  error?: {
    message: string;
    code: string;
  };
}

export type GraphQLData = {
  pages?: Page[];
  posts?: Post[];
  comments?: Comment[];
  categories?: Category[];
  tags?: Tag[];
  users?: User[];
  products?: Product[];
  orders?: Order[];
  customers?: Customer[];
  settings?: Settings[];
  insert_pages_one?: Page;
  update_pages_by_pk?: Page;
  delete_pages_by_pk?: { id: string };
  insert_posts_one?: Post;
  update_posts_by_pk?: Post;
  delete_posts_by_pk?: { id: string };
  insert_comments_one?: Comment;
  update_comments_by_pk?: Comment;
  delete_comments_by_pk?: { id: string };
  insert_categories_one?: Category;
  update_categories_by_pk?: Category;
  delete_categories_by_pk?: { id: string };
  insert_tags_one?: Tag;
  update_tags_by_pk?: Tag;
  delete_tags_by_pk?: { id: string };
  insert_products_one?: Product;
  update_products_by_pk?: Product;
  delete_products_by_pk?: { id: string };
  update_orders_by_pk?: Order;
  update_customers_by_pk?: Customer;
  update_settings_by_pk?: Settings;
};

export type GraphQLResponseData = GraphQLResponse<GraphQLData>;
