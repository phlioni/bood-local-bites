import { useState } from 'react';
import { stores } from '@/data/stores';
import { StoreCard } from '@/components/StoreCard';
import { CategoryScroll } from '@/components/CategoryScroll';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(store => {
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Fixo Mobile */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 pt-14 pb-4 md:pt-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="O que você quer comer hoje?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 transition-all text-base"
            />
          </div>
          <CategoryScroll selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>
      </div>

      {/* Lista de Lojas */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Lojas Disponíveis</h2>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border shadow-sm">
            {filteredStores.length} resultados
          </span>
        </div>

        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-medium">Nenhuma loja encontrada</h3>
            <p className="text-gray-500 text-sm mt-1">Tente mudar a categoria ou sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;