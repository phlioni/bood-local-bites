import { LucideIcon, UtensilsCrossed, Wrench, Shirt, ShoppingCart, Pill, Sparkles } from 'lucide-react';

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  modelUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount?: number;
  distance?: string;
  deliveryTime: string;
  minOrder: number;
  isOpen: boolean;
  address: string;
  phone?: string;
  whatsapp?: string;
  lat: number;
  lng: number;
  products: Product[];
}

export const categories = [
  { id: 'food', name: 'Comida', icon: 'UtensilsCrossed', emoji: '🍔' },
  { id: 'services', name: 'Serviços', icon: 'Wrench', emoji: '🔧' },
  { id: 'fashion', name: 'Moda', icon: 'Shirt', emoji: '👕' },
  { id: 'market', name: 'Mercado', icon: 'ShoppingCart', emoji: '🛒' },
  { id: 'pharmacy', name: 'Farmácia', icon: 'Pill', emoji: '💊' },
  { id: 'beauty', name: 'Beleza', icon: 'Sparkles', emoji: '💅' },
];

export const stores: Store[] = [
  {
    id: 1,
    name: 'Casa de Carnes Guerra',
    description: 'Cortes premium e carnes frescas',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
    rating: 4.8,
    reviewCount: 234,
    distance: '0,3 km',
    deliveryTime: '25-35 min',
    minOrder: 50.00,
    isOpen: true,
    address: 'Rua Oswaldo Cochrane, 69',
    phone: '+55 13 99999-0001',
    whatsapp: '5513999990001',
    lat: -23.9709,
    lng: -46.3150,
    products: [
      { id: 'p1', name: 'Picanha Premium', description: 'Corte nobre, 1kg', price: 89.90, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&q=80', category: 'Bovinos' },
      { id: 'p2', name: 'Espetinho Misto', description: 'Pacote com 10', price: 35.00, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800', category: 'Churrasco' },
    ],
  },
  {
    id: 2,
    name: 'Point 3 Lanches',
    description: 'Tradicional dogão de Santos',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80',
    rating: 4.6,
    reviewCount: 512,
    distance: '0,5 km',
    deliveryTime: '30-45 min',
    minOrder: 15.00,
    isOpen: true,
    address: 'Av. da Praia, Santos',
    phone: '+55 13 99999-0002',
    whatsapp: '5513999990002',
    lat: -23.9720,
    lng: -46.3100,
    products: [
      {
        id: 'p5',
        name: 'X-Tudo Especial',
        description: 'Bacon, ovo, salada',
        price: 32.90,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
        category: 'Lanches',
        // LINK CORRIGIDO E TESTADO (Legacy Master)
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Hamburger/glTF-Binary/Hamburger.glb'
      },
      { id: 'p6', name: 'Hot-Dog Completo', description: '2 salsichas e purê', price: 24.00, image: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?w=800', category: 'Lanches' },
    ],
  },
  {
    id: 3,
    name: 'Barbearia Vintage',
    description: 'Cortes clássicos',
    category: 'services',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
    rating: 4.9,
    reviewCount: 189,
    distance: '0,8 km',
    deliveryTime: 'Agendamento',
    minOrder: 0,
    isOpen: true,
    address: 'Gonzaga',
    lat: -23.9650,
    lng: -46.3350,
    products: [
      { id: 'p9', name: 'Corte Masculino', description: 'Navalha e toalha quente', price: 45.00, image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80', category: 'Cortes' },
    ],
  },
  {
    id: 4,
    name: 'Moda Praia',
    description: 'Estilo caiçara',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    rating: 4.4,
    reviewCount: 156,
    distance: '1,2 km',
    deliveryTime: '1-2 dias',
    minOrder: 0,
    isOpen: true,
    address: 'Shopping Miramar',
    lat: -23.9630,
    lng: -46.3320,
    products: [
      { id: 'p12', name: 'Camiseta Básica', description: 'Algodão leve', price: 59.90, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', category: 'Roupas' },
    ],
  },
  {
    id: 5,
    name: 'Mercado Express',
    description: 'Conveniência rápida',
    category: 'market',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
    rating: 4.3,
    reviewCount: 423,
    distance: '0,2 km',
    deliveryTime: '20-30 min',
    minOrder: 20.00,
    isOpen: true,
    address: 'Canal 3',
    lat: -23.9580,
    lng: -46.3300,
    products: [
      { id: 'p15', name: 'Cerveja Gelada', description: 'Pack 6un', price: 35.90, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80', category: 'Bebidas' },
    ],
  },
  {
    id: 6,
    name: 'Pizzaria Bella Napoli',
    description: 'Forno a lenha',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    rating: 4.7,
    reviewCount: 678,
    distance: '1,5 km',
    deliveryTime: '40-55 min',
    minOrder: 40.00,
    isOpen: false,
    address: 'Vila Belmiro',
    lat: -23.9510,
    lng: -46.3380,
    products: [
      { id: 'p19', name: 'Margherita', description: 'Tradicional', price: 42.90, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', category: 'Pizzas' },
    ],
  },
];