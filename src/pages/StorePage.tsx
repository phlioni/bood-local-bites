import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Phone, Share2 } from 'lucide-react';
import { stores } from '@/data/stores';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemCount, getTotal } = useCart();

  const store = stores.find((s) => s.id === id);

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-sunken">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Loja não encontrada</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const productsByCategory = store.products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof store.products>);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const itemCount = getItemCount();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-surface-sunken pb-32">
      {/* Hero Image */}
      <div className="relative h-56">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Share Button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <Share2 className="w-5 h-5 text-foreground" />
        </button>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-semibold',
              store.isOpen
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {store.isOpen ? 'Aberto Agora' : 'Fechado'}
          </span>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-card px-4 py-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">{store.name}</h1>
        <p className="text-muted-foreground mt-1">{store.description}</p>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-foreground">{store.rating}</span>
            <span className="text-muted-foreground">({store.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{store.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{store.distance}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{store.address}</span>
        </div>

        <a
          href={`tel:${store.phone}`}
          className="inline-flex items-center gap-2 mt-2 text-sm text-primary font-medium"
        >
          <Phone className="w-4 h-4" />
          {store.phone}
        </a>
      </div>

      {/* Products */}
      <div className="px-4 py-4">
        {Object.entries(productsByCategory).map(([category, products]) => (
          <section key={category} className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">{category}</h2>
            <div className="space-y-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} store={store} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
          <Button
            onClick={() => navigate('/cart')}
            className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl shadow-elevated flex items-center justify-between px-5"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-accent-foreground/20 flex items-center justify-center text-sm font-bold">
                {itemCount}
              </span>
              <span className="font-semibold">Ver Carrinho</span>
            </div>
            <span className="font-bold">{formatPrice(total)}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default StorePage;
