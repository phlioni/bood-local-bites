import { User, MapPin, History, CreditCard, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = () => {
  const menuItems = [
    { icon: History, label: "Meus Pedidos", desc: "Ver histórico completo" },
    { icon: MapPin, label: "Endereços", desc: "Gerenciar locais de entrega" },
    { icon: CreditCard, label: "Pagamentos", desc: "Meus cartões salvos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-14 md:pt-6">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header do Perfil */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 border-4 border-blue-50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Cliente Bood</h1>
            <p className="text-sm text-gray-500">cliente@bood.com.br</p>
            <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold mt-1">
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* Menu de Opções */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Minha Conta</h2>

          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
            {menuItems.map((item, idx) => (
              <button key={idx} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.label}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Button variant="outline" className="w-full border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 h-12 rounded-xl">
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;