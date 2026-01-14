import { useParams, useNavigate } from 'react-router-dom';
import { stores } from '@/data/stores';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, Star, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

const StorePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useCart();

  const store = stores.find(s => s.id === Number(id));

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Loja não encontrada</h2>
        <Button onClick={() => navigate('/')}>Voltar ao Mapa</Button>
      </div>
    );
  }

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Imagem de Capa e Botão Voltar */}
      <div className="relative h-56 md:h-72 w-full">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-14 md:left-4 z-10 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Informações da Loja */}
      <div className="px-4 -mt-10 relative z-20 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{store.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{store.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={store.isOpen ? "default" : "destructive"} className={store.isOpen ? "bg-green-500" : ""}>
                {store.isOpen ? "Aberto" : "Fechado"}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm mt-1">
                <Star className="w-4 h-4 fill-current" />
                {store.rating}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="truncate">{store.distance || '1.2 km'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span>{store.phone || 'Contato indisponível'}</span>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Cardápio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {store.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Botão Flutuante de Carrinho (Apenas se tiver itens) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-40 md:left-auto md:right-8 md:w-96">
          <Button
            onClick={() => navigate('/cart')}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-xl flex items-center justify-between px-6 text-lg animate-in slide-in-from-bottom-5"
          >
            <span className="bg-green-800 px-3 py-1 rounded-full text-sm font-bold">
              {cartItemCount}
            </span>
            <span className="font-semibold">Ver Carrinho</span>
            <span className="font-bold">R$ {items.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default StorePage;