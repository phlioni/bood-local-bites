import { useState, useMemo } from 'react';
import { stores } from '@/data/stores';
import { LocationHeader } from '@/components/LocationHeader';
import { CategoryScroll } from '@/components/CategoryScroll';
import { StoreCard } from '@/components/StoreCard';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesCategory =
        selectedCategory === 'all' || store.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredStores = filteredStores.filter((s) => s.isOpen);
  const closedStores = filteredStores.filter((s) => !s.isOpen);

  return (
    <div className="min-h-screen bg-surface-sunken pb-20">
      <LocationHeader onSearch={setSearchQuery} />

      <main className="px-4 py-4">
        <CategoryScroll selected={selectedCategory} onSelect={setSelectedCategory} />

        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {selectedCategory === 'all' ? 'Lojas em Destaque' : 'Resultados'}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredStores.length} {filteredStores.length === 1 ? 'loja' : 'lojas'}
            </span>
          </div>

          <div className="space-y-4">
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}

            {closedStores.length > 0 && (
              <>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Fechados Agora
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                {closedStores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </>
            )}

            {filteredStores.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhuma loja encontrada</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tente ajustar sua busca ou categoria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
