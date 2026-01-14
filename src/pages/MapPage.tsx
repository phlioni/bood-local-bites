import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, X } from 'lucide-react';
import { stores, Store } from '@/data/stores';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Simulated pin positions (in a real app, these would be lat/lng coordinates)
  const storePositions = [
    { store: stores[0], top: '25%', left: '20%' },
    { store: stores[1], top: '40%', left: '55%' },
    { store: stores[2], top: '30%', left: '75%' },
    { store: stores[3], top: '60%', left: '30%' },
    { store: stores[4], top: '50%', left: '70%' },
    { store: stores[5], top: '70%', left: '50%' },
  ];

  return (
    <div className="min-h-screen bg-surface-sunken pb-20 relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 bg-card shadow-lg rounded-xl px-4 py-2">
          <h1 className="font-semibold text-foreground">Stores Near You</h1>
          <p className="text-xs text-muted-foreground">{stores.length} stores available</p>
        </div>
      </header>

      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-50">
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t border-primary/20"
              style={{ top: `${i * 5}%` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l border-primary/20"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Decorative roads */}
        <div className="absolute top-1/4 left-0 right-0 h-3 bg-muted-foreground/10 transform -rotate-12" />
        <div className="absolute top-1/2 left-0 right-1/4 h-3 bg-muted-foreground/10" />
        <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-muted-foreground/10 transform rotate-6" />

        {/* Store Pins */}
        {storePositions.map(({ store, top, left }) => (
          <button
            key={store.id}
            onClick={() => setSelectedStore(store)}
            className={cn(
              'absolute transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 z-10',
              selectedStore?.id === store.id && 'scale-125'
            )}
            style={{ top, left }}
          >
            <div className="relative">
              <div
                className={cn(
                  'w-10 h-10 rounded-full shadow-lg flex items-center justify-center',
                  store.isOpen ? 'bg-accent' : 'bg-muted-foreground'
                )}
              >
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-inherit -z-10" />
            </div>
          </button>
        ))}

        {/* User location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-lg" />
          <div className="absolute -inset-3 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </div>

      {/* Store Details Card */}
      {selectedStore && (
        <div className="absolute bottom-24 left-4 right-4 z-50 animate-slide-up">
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            <button
              onClick={() => setSelectedStore(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center z-10"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            <div className="flex gap-4 p-4">
              <img
                src={selectedStore.image}
                alt={selectedStore.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground text-lg truncate">
                    {selectedStore.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {selectedStore.description}
                </p>

                <div className="flex items-center gap-3 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{selectedStore.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{selectedStore.deliveryTime}</span>
                  </div>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-semibold',
                      selectedStore.isOpen
                        ? 'bg-accent/20 text-accent'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {selectedStore.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>

                <Button
                  onClick={() => navigate(`/store/${selectedStore.id}`)}
                  className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-10"
                >
                  View Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
