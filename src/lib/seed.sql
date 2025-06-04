-- Kategoriler
INSERT INTO public.categories (name, slug, description, image_url) VALUES
('Oturma Grupları', 'oturma-gruplari', 'Modern ve konforlu oturma grupları koleksiyonu', '/images/categories/oturma-gruplari.jpg'),
('Yatak Odası', 'yatak-odasi', 'Yatak odası mobilyaları ve eşyaları', '/images/categories/yatak-odasi.jpg'),
('Yemek Odası', 'yemek-odasi', 'Yemek odası mobilyaları ve eşyaları', '/images/categories/yemek-odasi.jpg'),
('Çalışma Odası', 'calisma-odasi', 'Çalışma odası mobilyaları ve eşyaları', '/images/categories/calisma-odasi.jpg');

-- Alt Kategoriler
INSERT INTO public.categories (name, slug, description, image_url, parent_id) VALUES
('Kanepe', 'kanepe', 'Modern ve konforlu kanepe modelleri', '/images/categories/kanepe.jpg', (SELECT id FROM public.categories WHERE slug = 'oturma-gruplari')),
('Berjer', 'berjer', 'Şık ve konforlu berjer modelleri', '/images/categories/berjer.jpg', (SELECT id FROM public.categories WHERE slug = 'oturma-gruplari')),
('Yatak', 'yatak', 'Kaliteli ve konforlu yatak modelleri', '/images/categories/yatak.jpg', (SELECT id FROM public.categories WHERE slug = 'yatak-odasi')),
('Gardırop', 'gardırop', 'Geniş ve kullanışlı gardırop modelleri', '/images/categories/gardırop.jpg', (SELECT id FROM public.categories WHERE slug = 'yatak-odasi')),
('Yemek Masası', 'yemek-masasi', 'Modern yemek masası modelleri', '/images/categories/yemek-masasi.jpg', (SELECT id FROM public.categories WHERE slug = 'yemek-odasi')),
('Yemek Sandalyesi', 'yemek-sandalyesi', 'Şık yemek sandalyesi modelleri', '/images/categories/yemek-sandalyesi.jpg', (SELECT id FROM public.categories WHERE slug = 'yemek-odasi')),
('Çalışma Masası', 'calisma-masasi', 'Ergonomik çalışma masası modelleri', '/images/categories/calisma-masasi.jpg', (SELECT id FROM public.categories WHERE slug = 'calisma-odasi')),
('Ofis Koltuğu', 'ofis-koltugu', 'Konforlu ofis koltuğu modelleri', '/images/categories/ofis-koltugu.jpg', (SELECT id FROM public.categories WHERE slug = 'calisma-odasi'));

-- Ürünler
INSERT INTO public.products (name, slug, description, price, discount_price, stock_quantity, category_id, is_featured, is_new) VALUES
('Modern L Koltuk', 'modern-l-koltuk', 'Modern tasarımlı L koltuk, gri renk', 24999.99, 19999.99, 10, (SELECT id FROM public.categories WHERE slug = 'kanepe'), true, true),
('Vintage Berjer', 'vintage-berjer', 'Vintage tasarımlı berjer, kahverengi', 8999.99, null, 15, (SELECT id FROM public.categories WHERE slug = 'berjer'), false, true),
('Ergonomik Yatak', 'ergonomik-yatak', 'Ergonomik tasarımlı yatak, 180x200', 15999.99, 13999.99, 8, (SELECT id FROM public.categories WHERE slug = 'yatak'), true, false),
('Modern Gardırop', 'modern-gardırop', 'Modern tasarımlı gardırop, 240x60', 12999.99, null, 12, (SELECT id FROM public.categories WHERE slug = 'gardırop'), false, true),
('Cam Yemek Masası', 'cam-yemek-masasi', 'Cam yemek masası, 180x90', 14999.99, 12999.99, 6, (SELECT id FROM public.categories WHERE slug = 'yemek-masasi'), true, false),
('Modern Sandalye', 'modern-sandalye', 'Modern tasarımlı sandalye, set', 5999.99, null, 20, (SELECT id FROM public.categories WHERE slug = 'yemek-sandalyesi'), false, true),
('Ahşap Çalışma Masası', 'ahsap-calisma-masasi', 'Ahşap çalışma masası, 140x70', 8999.99, 7999.99, 10, (SELECT id FROM public.categories WHERE slug = 'calisma-masasi'), true, false),
('Ergonomik Ofis Koltuğu', 'ergonomik-ofis-koltugu', 'Ergonomik ofis koltuğu, siyah', 4999.99, null, 25, (SELECT id FROM public.categories WHERE slug = 'ofis-koltugu'), false, true);

-- Ürün Görselleri
INSERT INTO public.product_images (product_id, image_url, is_primary) VALUES
((SELECT id FROM public.products WHERE slug = 'modern-l-koltuk'), '/images/products/modern-l-koltuk-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'modern-l-koltuk'), '/images/products/modern-l-koltuk-2.jpg', false),
((SELECT id FROM public.products WHERE slug = 'vintage-berjer'), '/images/products/vintage-berjer-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'ergonomik-yatak'), '/images/products/ergonomik-yatak-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'modern-gardırop'), '/images/products/modern-gardırop-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'cam-yemek-masasi'), '/images/products/cam-yemek-masasi-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'modern-sandalye'), '/images/products/modern-sandalye-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'ahsap-calisma-masasi'), '/images/products/ahsap-calisma-masasi-1.jpg', true),
((SELECT id FROM public.products WHERE slug = 'ergonomik-ofis-koltugu'), '/images/products/ergonomik-ofis-koltugu-1.jpg', true);

-- Ürün Varyantları
INSERT INTO public.product_variants (product_id, name, price_adjustment, stock_quantity) VALUES
((SELECT id FROM public.products WHERE slug = 'modern-l-koltuk'), 'Gri', 0, 5),
((SELECT id FROM public.products WHERE slug = 'modern-l-koltuk'), 'Bej', 1000, 5),
((SELECT id FROM public.products WHERE slug = 'vintage-berjer'), 'Kahverengi', 0, 8),
((SELECT id FROM public.products WHERE slug = 'vintage-berjer'), 'Siyah', 500, 7),
((SELECT id FROM public.products WHERE slug = 'ergonomik-yatak'), '160x200', -2000, 3),
((SELECT id FROM public.products WHERE slug = 'ergonomik-yatak'), '180x200', 0, 5),
((SELECT id FROM public.products WHERE slug = 'modern-gardırop'), 'Beyaz', 0, 6),
((SELECT id FROM public.products WHERE slug = 'modern-gardırop'), 'Antrasit', 1000, 6),
((SELECT id FROM public.products WHERE slug = 'cam-yemek-masasi'), '160x90', -1000, 3),
((SELECT id FROM public.products WHERE slug = 'cam-yemek-masasi'), '180x90', 0, 3),
((SELECT id FROM public.products WHERE slug = 'modern-sandalye'), 'Set (4 Adet)', 0, 5),
((SELECT id FROM public.products WHERE slug = 'modern-sandalye'), 'Set (6 Adet)', 2000, 5),
((SELECT id FROM public.products WHERE slug = 'ahsap-calisma-masasi'), 'Açık Ceviz', 0, 5),
((SELECT id FROM public.products WHERE slug = 'ahsap-calisma-masasi'), 'Koyu Ceviz', 500, 5),
((SELECT id FROM public.products WHERE slug = 'ergonomik-ofis-koltugu'), 'Siyah', 0, 12),
((SELECT id FROM public.products WHERE slug = 'ergonomik-ofis-koltugu'), 'Gri', 500, 13); 