import { Home, MapPin, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MapPin, label: 'Map', path: '/map' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          const isCart = path === '/cart';

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full tap-highlight-none transition-colors relative',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    'w-6 h-6 transition-transform',
                    isActive && 'animate-bounce-subtle'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isCart && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
              <span className={cn(
                'text-xs mt-1 font-medium',
                isActive && 'font-semibold'
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
