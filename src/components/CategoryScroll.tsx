import { categories } from '@/data/stores';
import { cn } from '@/lib/utils';

interface CategoryScrollProps {
  selected: string;
  onSelect: (categoryId: string) => void;
}

export const CategoryScroll = ({ selected, onSelect }: CategoryScrollProps) => {
  return (
    <div className="overflow-x-auto scrollbar-hide py-3 -mx-4 px-4">
      <div className="flex gap-3">
        <button
          onClick={() => onSelect('all')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all font-medium text-sm',
            selected === 'all'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          <span>🌟</span>
          <span>All</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all font-medium text-sm',
              selected === category.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
