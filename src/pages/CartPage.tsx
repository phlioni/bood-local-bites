import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleCheckout = () => {
    if (!name || !address) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e endereço.",
        variant: "destructive"
      });
      return;
    }

    // Monta a mensagem para o WhatsApp
    const itemsList = items.map(item =>
      `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`
    ).join('\n');

    const message = `*NOVO PEDIDO - BOOD APP*\n\n` +
      `👤 *Cliente:* ${name}\n` +
      `📍 *Endereço:* ${address}\n` +
      `📝 *Obs:* ${notes || 'Sem observações'}\n\n` +
      `*🛒 ITENS:*\n${itemsList}\n\n` +
      `*💰 TOTAL: R$ ${total.toFixed(2)}*`;

    // Número fictício do dono da loja (pegando do primeiro item ou geral)
    // Num app real, cada loja teria seu checkout separado ou seria um marketplace unificado
    const phone = "5513999999999";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Trash2 className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mt-2 mb-6">Que tal explorar algumas lojas?</p>
        <Button onClick={() => navigate('/list')} className="w-full max-w-xs bg-blue-600">
          Ver Lojas
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-16 md:pt-6">
      <div className="px-4 py-4 md:hidden fixed top-0 left-0 right-0 bg-white z-20 border-b flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-lg">Seu Pedido</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* Lista de Itens */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700">Itens do Pedido</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-blue-600 font-bold text-sm">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 active:scale-95 transition"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-blue-600 active:scale-95 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <span className="text-xl font-bold text-gray-900">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulário de Entrega */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4 mb-20">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <Send className="w-5 h-5 text-green-500" />
            Finalizar via WhatsApp
          </h2>
          <p className="text-sm text-gray-500">
            Seu pedido será enviado diretamente para o WhatsApp da loja. O pagamento é combinado na entrega.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Seu Nome</label>
              <Input
                placeholder="Ex: João Silva"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Endereço de Entrega</label>
              <Input
                placeholder="Rua, Número, Bairro, Complemento"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Observações (Opcional)</label>
              <Textarea
                placeholder="Ex: Retirar a cebola, troco para 50..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="bg-gray-50 resize-none h-20"
              />
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg mt-4"
          >
            Enviar Pedido no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;