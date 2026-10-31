CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  family text NOT NULL DEFAULT 'Oriental',
  for_whom text NOT NULL DEFAULT 'Unisex',
  price integer NOT NULL DEFAULT 0,
  tagline text NOT NULL DEFAULT '',
  top_notes text NOT NULL DEFAULT '',
  heart_notes text NOT NULL DEFAULT '',
  base_notes text NOT NULL DEFAULT '',
  image_url text,
  stock integer NOT NULL DEFAULT 50,
  active boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view live products" ON public.products FOR SELECT TO anon, authenticated USING (active = true);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]',
  total integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

INSERT INTO public.products (slug,name,family,for_whom,price,tagline,top_notes,heart_notes,base_notes,sort) VALUES
('amber-noir','Amber Noir','Oriental','Unisex',2499,'Molten amber after midnight','Saffron, Pink Pepper','Amber, Labdanum','Vanilla, Benzoin',1),
('fleur-noire','Fleur Noire','Woody','Her',2299,'A dark rose in velvet','Blackcurrant','Damask Rose','Patchouli, Oud',2),
('ivory-jasmine','Ivory Jasmine','Floral','Her',1999,'Moonlit sambac petals','Neroli','Jasmine Sambac','White Musk',3),
('shahi-oud','Shahi Oud','Attar','Unisex',3499,'Royal oud, slow-distilled','Saffron','Cambodian Oud','Sandalwood',4),
('peony-veil','Peony Veil','Floral','Her',1899,'Soft as blush silk','Lychee','Peony, Rose','Cashmere Musk',5),
('tide','Tide','Aquatic','Him',1799,'Salt air on warm stone','Sea Salt, Lemon','Marine Accord','Driftwood',6),
('bergamot-bloom','Bergamot Bloom','Fresh','Unisex',1599,'Morning in a citrus grove','Bergamot','Petitgrain','Vetiver',7),
('kesar-attar','Kesar Attar','Attar','Unisex',2799,'Liquid gold of Kashmir','Saffron','Rose Otto','Amber',8),
('midnight-leather','Midnight Leather','Woody','Him',2599,'Worn leather, cool night','Cardamom','Leather','Cedar, Tonka',9),
('mitti','Mitti','Attar','Unisex',2199,'First rain on earth','Petrichor','Baked Clay','Vetiver',10),
('velvet-vanilla','Velvet Vanilla','Oriental','Her',2199,'Warm skin, sweet smoke','Pear','Orchid','Bourbon Vanilla',11),
('azure-coast','Azure Coast','Aquatic','Him',1899,'Endless blue horizon','Grapefruit','Sea Fennel','Ambergris',12),
('neroli-sun','Neroli Sun','Fresh','Her',1699,'Sunlight through orange blossom','Mandarin','Neroli','Musk',13),
('rose-rooh','Rose Rooh','Attar','Her',2999,'Pure Kannauj rose spirit','Rose Water','Rose Absolute','Sandal',14),
('smoked-cedar','Smoked Cedar','Woody','Him',2399,'Embers in a forest','Black Pepper','Cedarwood','Birch Tar',15),
('tuberose-nights','Tuberose Nights','Floral','Her',2099,'Intoxicating, unapologetic','Green Notes','Tuberose','Coconut Musk',16),
('royal-oud-intense','Royal Oud Intense','Oriental','Him',3999,'Power in a single spray','Elemi','Oud, Incense','Leather, Amber',17),
('vetiver-mist','Vetiver Mist','Fresh','Him',1799,'Green, crisp, grounded','Lime','Haitian Vetiver','Oakmoss',18),
('monsoon-lily','Monsoon Lily','Aquatic','Unisex',1999,'Lilies after the storm','Rain Accord','Water Lily','Soft Woods',19),
('dhara-signature','Dhara Signature','Oriental','Unisex',4499,'The essence of Dhara','Saffron, Bergamot','Rose, Oud','Amber, Sandalwood',20);