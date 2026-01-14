import { useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Heart,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: Heart, label: 'Favorite Stores', path: '/favorites' },
  { icon: Clock, label: 'Order History', path: '/orders' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-sunken pb-20">
      {/* Profile Header */}
      <header className="bg-primary gradient-primary text-primary-foreground px-4 pt-8 pb-12">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Welcome!</h2>
            <p className="text-primary-foreground/80 mt-0.5">
              Sign in to track your orders
            </p>
          </div>
        </div>

        <button className="mt-4 w-full py-3 rounded-xl bg-primary-foreground text-primary font-semibold">
          Sign In / Create Account
        </button>
      </header>

      {/* Quick Stats */}
      <div className="mx-4 -mt-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Orders', value: '0' },
          { label: 'Favorites', value: '0' },
          { label: 'Addresses', value: '0' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl p-4 text-center shadow-card"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
          {menuItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-4 px-4 py-4 hover:bg-secondary/50 transition-colors',
                index !== menuItems.length - 1 && 'border-b border-border'
              )}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center gap-4 px-4 py-4 mt-4 bg-card rounded-2xl shadow-sm hover:bg-secondary/50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="flex-1 text-left font-medium text-destructive">
            Log Out
          </span>
        </button>
      </div>

      {/* App Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Bood v1.0.0</p>
        <p className="mt-1">Discover local. Order easy.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
