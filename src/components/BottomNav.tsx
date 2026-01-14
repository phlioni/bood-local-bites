import { Home, Map as MapIcon, ShoppingBag, User, List } from 'lucide-react';
import { NavLink } from './NavLink';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-between items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <NavLink to="/" icon={MapIcon} label="Mapa" />
      <NavLink to="/explore" icon={List} label="Lista" />

      <div className="relative -mt-8">
        <NavLink
          to="/cart"
          icon={ShoppingBag}
          label=""
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all border-4 border-white"
        />
      </div>

      <NavLink to="/profile" icon={User} label="Perfil" />
    </div>
  );
};

export default BottomNav;