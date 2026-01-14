export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  isOpen: boolean;
  address: string;
  phone: string;
  whatsapp: string;
  products: Product[];
}

export const categories = [
  { id: 'food', name: 'Food', icon: 'UtensilsCrossed', emoji: '🍔' },
  { id: 'services', name: 'Services', icon: 'Wrench', emoji: '🔧' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', emoji: '👕' },
  { id: 'market', name: 'Market', icon: 'ShoppingCart', emoji: '🛒' },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'Pill', emoji: '💊' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles', emoji: '💅' },
];

export const stores: Store[] = [
  {
    id: '1',
    name: 'Casa de Carnes Guerra',
    description: 'Premium cuts and fresh meats for your BBQ',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
    rating: 4.8,
    reviewCount: 234,
    distance: '0.8 km',
    deliveryTime: '25-35 min',
    isOpen: true,
    address: 'Rua das Flores, 123 - Centro',
    phone: '+55 11 99999-0001',
    whatsapp: '5511999990001',
    products: [
      { id: 'p1', name: 'Picanha Premium', description: 'Prime cut, 1kg - Perfect for grilling', price: 89.90, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&q=80', category: 'Beef' },
      { id: 'p2', name: 'Costela Bovina', description: 'Beef ribs, 1kg - Slow cook perfection', price: 45.90, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', category: 'Beef' },
      { id: 'p3', name: 'Linguiça Artesanal', description: 'Homemade sausage, 500g', price: 28.90, image: 'https://images.unsplash.com/photo-1619221882266-c3eb8e081b38?w=400&q=80', category: 'Pork' },
      { id: 'p4', name: 'Fraldinha', description: 'Flank steak, 1kg', price: 52.90, image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&q=80', category: 'Beef' },
    ],
  },
  {
    id: '2',
    name: 'Point 3 Lanches',
    description: 'Best burgers and snacks in town',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80',
    rating: 4.6,
    reviewCount: 512,
    distance: '1.2 km',
    deliveryTime: '30-45 min',
    isOpen: true,
    address: 'Av. Brasil, 456 - Jardim América',
    phone: '+55 11 99999-0002',
    whatsapp: '5511999990002',
    products: [
      { id: 'p5', name: 'X-Tudo Especial', description: 'Double patty, bacon, egg, cheese, salad', price: 32.90, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', category: 'Burgers' },
      { id: 'p6', name: 'X-Bacon', description: 'Classic bacon cheeseburger', price: 26.90, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80', category: 'Burgers' },
      { id: 'p7', name: 'Batata Frita Grande', description: 'Crispy fries, 400g portion', price: 18.90, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', category: 'Sides' },
      { id: 'p8', name: 'Milk Shake Ovomaltine', description: '500ml creamy shake', price: 16.90, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', category: 'Drinks' },
    ],
  },
  {
    id: '3',
    name: 'Barbearia Vintage',
    description: 'Classic cuts with modern style',
    category: 'services',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
    rating: 4.9,
    reviewCount: 189,
    distance: '0.5 km',
    deliveryTime: 'By appointment',
    isOpen: true,
    address: 'Rua Augusta, 789 - Consolação',
    phone: '+55 11 99999-0003',
    whatsapp: '5511999990003',
    products: [
      { id: 'p9', name: 'Corte Masculino', description: 'Classic haircut with razor finish', price: 45.00, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80', category: 'Haircuts' },
      { id: 'p10', name: 'Barba Completa', description: 'Full beard trim and shaping', price: 35.00, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80', category: 'Beard' },
      { id: 'p11', name: 'Combo Corte + Barba', description: 'Complete grooming package', price: 70.00, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80', category: 'Combos' },
    ],
  },
  {
    id: '4',
    name: 'Moda Street Fashion',
    description: 'Urban style for all occasions',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    rating: 4.4,
    reviewCount: 156,
    distance: '2.1 km',
    deliveryTime: '1-2 days',
    isOpen: true,
    address: 'Shopping Center, Loja 42',
    phone: '+55 11 99999-0004',
    whatsapp: '5511999990004',
    products: [
      { id: 'p12', name: 'Camiseta Oversized', description: 'Premium cotton, various colors', price: 79.90, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', category: 'T-Shirts' },
      { id: 'p13', name: 'Calça Jogger', description: 'Comfortable streetwear joggers', price: 129.90, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80', category: 'Pants' },
      { id: 'p14', name: 'Tênis Urban', description: 'Classic sneakers, white/black', price: 249.90, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80', category: 'Shoes' },
    ],
  },
  {
    id: '5',
    name: 'Mercado Família',
    description: 'Fresh produce and daily essentials',
    category: 'market',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
    rating: 4.3,
    reviewCount: 423,
    distance: '0.3 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    address: 'Rua do Comércio, 100',
    phone: '+55 11 99999-0005',
    whatsapp: '5511999990005',
    products: [
      { id: 'p15', name: 'Cesta de Frutas', description: 'Fresh seasonal fruits selection', price: 35.90, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80', category: 'Fruits' },
      { id: 'p16', name: 'Pão Francês (10un)', description: 'Fresh baked daily', price: 8.90, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80', category: 'Bakery' },
      { id: 'p17', name: 'Leite Integral 1L', description: 'Farm fresh whole milk', price: 6.50, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80', category: 'Dairy' },
      { id: 'p18', name: 'Ovos Caipira (12un)', description: 'Free-range eggs', price: 15.90, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80', category: 'Dairy' },
    ],
  },
  {
    id: '6',
    name: 'Pizzaria Bella Napoli',
    description: 'Authentic Italian pizzas made with love',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    rating: 4.7,
    reviewCount: 678,
    distance: '1.8 km',
    deliveryTime: '40-55 min',
    isOpen: false,
    address: 'Rua Itália, 200 - Bela Vista',
    phone: '+55 11 99999-0006',
    whatsapp: '5511999990006',
    products: [
      { id: 'p19', name: 'Margherita', description: 'Tomato, mozzarella, fresh basil', price: 42.90, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', category: 'Pizzas' },
      { id: 'p20', name: 'Pepperoni', description: 'Classic pepperoni with extra cheese', price: 48.90, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', category: 'Pizzas' },
      { id: 'p21', name: 'Quattro Formaggi', description: 'Four cheese blend pizza', price: 52.90, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80', category: 'Pizzas' },
    ],
  },
];
