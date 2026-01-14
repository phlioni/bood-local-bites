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
              {selectedCategory === 'all' ? 'Featured Stores' : 'Results'}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredStores.length} stores
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
                    Closed Now
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
                <p className="text-muted-foreground text-lg">No stores found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or category
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
