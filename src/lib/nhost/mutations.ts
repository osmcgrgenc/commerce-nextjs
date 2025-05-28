import nhost from './client';
import { GraphQLResponse, Page, Post, Comment, Category, Tag, Product, Order, Customer, Settings } from './types';

export async function createPage(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>): Promise<Page> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ insert_pages_one: Page }>>(
    `
    mutation CreatePage($page: pages_insert_input!) {
      insert_pages_one(object: $page) {
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
    { page }
  );

  if (error) throw error;
  if (!data.data.insert_pages_one) throw new Error('Sayfa oluşturulamadı');
  return data.data.insert_pages_one;
}

export async function updatePage(id: string, page: Partial<Page>): Promise<Page> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_pages_by_pk: Page }>>(
    `
    mutation UpdatePage($id: uuid!, $page: pages_set_input!) {
      update_pages_by_pk(pk_columns: {id: $id}, _set: $page) {
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
    { id, page }
  );

  if (error) throw error;
  if (!data.data.update_pages_by_pk) throw new Error('Sayfa güncellenemedi');
  return data.data.update_pages_by_pk;
}

export async function deletePage(id: string): Promise<string> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ delete_pages_by_pk: { id: string } }>>(
    `
    mutation DeletePage($id: uuid!) {
      delete_pages_by_pk(id: $id) {
        id
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  if (!data.data.delete_pages_by_pk) throw new Error('Sayfa silinemedi');
  return data.data.delete_pages_by_pk.id;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ insert_posts_one: Post }>>(
    `
    mutation CreatePost($post: posts_insert_input!) {
      insert_posts_one(object: $post) {
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
    { post }
  );

  if (error) throw error;
  if (!data.data.insert_posts_one) throw new Error('Yazı oluşturulamadı');
  return data.data.insert_posts_one;
}

export async function updatePost(id: string, post: Partial<Post>): Promise<Post> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_posts_by_pk: Post }>>(
    `
    mutation UpdatePost($id: uuid!, $post: posts_set_input!) {
      update_posts_by_pk(pk_columns: {id: $id}, _set: $post) {
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
    { id, post }
  );

  if (error) throw error;
  if (!data.data.update_posts_by_pk) throw new Error('Yazı güncellenemedi');
  return data.data.update_posts_by_pk;
}

export async function deletePost(id: string): Promise<string> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ delete_posts_by_pk: { id: string } }>>(
    `
    mutation DeletePost($id: uuid!) {
      delete_posts_by_pk(id: $id) {
        id
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  if (!data.data.delete_posts_by_pk) throw new Error('Yazı silinemedi');
  return data.data.delete_posts_by_pk.id;
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ insert_comments_one: Comment }>>(
    `
    mutation CreateComment($comment: comments_insert_input!) {
      insert_comments_one(object: $comment) {
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
    { comment }
  );

  if (error) throw error;
  if (!data.data.insert_comments_one) throw new Error('Yorum oluşturulamadı');
  return data.data.insert_comments_one;
}

export async function updateCommentStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Comment> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_comments_by_pk: Comment }>>(
    `
    mutation UpdateCommentStatus($id: uuid!, $status: String!) {
      update_comments_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
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
    { id, status }
  );

  if (error) throw error;
  if (!data.data.update_comments_by_pk) throw new Error('Yorum güncellenemedi');
  return data.data.update_comments_by_pk;
}

export async function deleteComment(id: string): Promise<string> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ delete_comments_by_pk: { id: string } }>>(
    `
    mutation DeleteComment($id: uuid!) {
      delete_comments_by_pk(id: $id) {
        id
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  if (!data.data.delete_comments_by_pk) throw new Error('Yorum silinemedi');
  return data.data.delete_comments_by_pk.id;
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ insert_categories_one: Category }>>(
    `
    mutation CreateCategory($category: categories_insert_input!) {
      insert_categories_one(object: $category) {
        id
        name
        slug
      }
    }
    `,
    { category }
  );

  if (error) throw error;
  if (!data.data.insert_categories_one) throw new Error('Kategori oluşturulamadı');
  return data.data.insert_categories_one;
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_categories_by_pk: Category }>>(
    `
    mutation UpdateCategory($id: uuid!, $category: categories_set_input!) {
      update_categories_by_pk(pk_columns: {id: $id}, _set: $category) {
        id
        name
        slug
      }
    }
    `,
    { id, category }
  );

  if (error) throw error;
  if (!data.data.update_categories_by_pk) throw new Error('Kategori güncellenemedi');
  return data.data.update_categories_by_pk;
}

export async function deleteCategory(id: string): Promise<string> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ delete_categories_by_pk: { id: string } }>>(
    `
    mutation DeleteCategory($id: uuid!) {
      delete_categories_by_pk(id: $id) {
        id
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  if (!data.data.delete_categories_by_pk) throw new Error('Kategori silinemedi');
  return data.data.delete_categories_by_pk.id;
}

export async function createTag(tag: Omit<Tag, 'id'>): Promise<Tag> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ insert_tags_one: Tag }>>(
    `
    mutation CreateTag($tag: tags_insert_input!) {
      insert_tags_one(object: $tag) {
        id
        name
        slug
      }
    }
    `,
    { tag }
  );

  if (error) throw error;
  if (!data.data.insert_tags_one) throw new Error('Etiket oluşturulamadı');
  return data.data.insert_tags_one;
}

export async function updateTag(id: string, tag: Partial<Tag>): Promise<Tag> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_tags_by_pk: Tag }>>(
    `
    mutation UpdateTag($id: uuid!, $tag: tags_set_input!) {
      update_tags_by_pk(pk_columns: {id: $id}, _set: $tag) {
        id
        name
        slug
      }
    }
    `,
    { id, tag }
  );

  if (error) throw error;
  if (!data.data.update_tags_by_pk) throw new Error('Etiket güncellenemedi');
  return data.data.update_tags_by_pk;
}

export async function deleteTag(id: string): Promise<string> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ delete_tags_by_pk: { id: string } }>>(
    `
    mutation DeleteTag($id: uuid!) {
      delete_tags_by_pk(id: $id) {
        id
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  if (!data.data.delete_tags_by_pk) throw new Error('Etiket silinemedi');
  return data.data.delete_tags_by_pk.id;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ insert_products_one: Product }>>(
    `
    mutation CreateProduct($product: products_insert_input!) {
      insert_products_one(object: $product) {
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
    { product }
  );

  if (error) throw error;
  if (!data.data.insert_products_one) throw new Error('Ürün oluşturulamadı');
  return data.data.insert_products_one;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_products_by_pk: Product }>>(
    `
    mutation UpdateProduct($id: uuid!, $product: products_set_input!) {
      update_products_by_pk(pk_columns: {id: $id}, _set: $product) {
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
    { id, product }
  );

  if (error) throw error;
  if (!data.data.update_products_by_pk) throw new Error('Ürün güncellenemedi');
  return data.data.update_products_by_pk;
}

export async function deleteProduct(id: string): Promise<string> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ delete_products_by_pk: { id: string } }>>(
    `
    mutation DeleteProduct($id: uuid!) {
      delete_products_by_pk(id: $id) {
        id
      }
    }
    `,
    { id }
  );

  if (error) throw error;
  if (!data.data.delete_products_by_pk) throw new Error('Ürün silinemedi');
  return data.data.delete_products_by_pk.id;
}

export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_orders_by_pk: Order }>>(
    `
    mutation UpdateOrderStatus($id: uuid!, $status: String!) {
      update_orders_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
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
    { id, status }
  );

  if (error) throw error;
  if (!data.data.update_orders_by_pk) throw new Error('Sipariş durumu güncellenemedi');
  return data.data.update_orders_by_pk;
}

export async function updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_customers_by_pk: Customer }>>(
    `
    mutation UpdateCustomer($id: uuid!, $customer: customers_set_input!) {
      update_customers_by_pk(pk_columns: {id: $id}, _set: $customer) {
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
    { id, customer }
  );

  if (error) throw error;
  if (!data.data.update_customers_by_pk) throw new Error('Müşteri bilgileri güncellenemedi');
  return data.data.update_customers_by_pk;
}

export async function updateSettings(settings: Partial<Settings>): Promise<Settings> {
  const { data, error } = await nhost.graphql.request<GraphQLResponse<{ update_settings_by_pk: Settings }>>(
    `
    mutation UpdateSettings($settings: settings_set_input!) {
      update_settings_by_pk(pk_columns: {id: "1"}, _set: $settings) {
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
    `,
    { settings }
  );

  if (error) throw error;
  if (!data.data.update_settings_by_pk) throw new Error('Site ayarları güncellenemedi');
  return data.data.update_settings_by_pk;
} 