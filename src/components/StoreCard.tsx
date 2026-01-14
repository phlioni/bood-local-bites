import { Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Store } from '@/data/stores';
import { cn } from '@/lib/utils';

interface StoreCardProps {
  store: Store;
}

export const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Link
      to={`/store/${store.id}`}
      className="block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 tap-highlight-none group"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!store.isOpen && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-card text-foreground px-4 py-2 rounded-full font-semibold text-sm">
              Fechado
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-semibold',
              store.isOpen
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {store.isOpen ? 'Aberto' : 'Fechado'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-lg truncate">
              {store.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-0.5 line-clamp-1">
              {store.description}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg shrink-0">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-sm">{store.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{store.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{store.distance}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
