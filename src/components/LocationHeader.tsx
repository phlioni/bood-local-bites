import { MapPin, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface LocationHeaderProps {
  onSearch: (query: string) => void;
}

export const LocationHeader = ({ onSearch }: LocationHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border/50 px-4 py-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Deliver to</p>
            <button className="flex items-center gap-1 font-semibold text-foreground">
              <span className="truncate">Current Location</span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
          B
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search stores, products..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 h-11 bg-secondary border-0 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
    </header>
  );
};
