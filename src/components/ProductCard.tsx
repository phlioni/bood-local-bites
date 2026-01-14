import { Plus, Minus } from 'lucide-react';
import { Product, Store } from '@/data/stores';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  store: Store;
}

export const ProductCard = ({ product, store }: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="flex gap-3 p-3 bg-card rounded-xl shadow-sm border border-border/50">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <h4 className="font-semibold text-foreground truncate">{product.name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary text-lg">
            {formatPrice(product.price)}
          </span>

          {quantity === 0 ? (
            <Button
              onClick={() => addItem(product, store)}
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-4 h-9"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                  'bg-card text-foreground hover:bg-muted'
                )}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-foreground w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => addItem(product, store)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-accent-foreground"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
