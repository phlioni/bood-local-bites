import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, MapPin, MessageSquare, Send, Store as StoreIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal, clearCart, getCurrentStore } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [isPickup, setIsPickup] = useState(false);
  const [note, setNote] = useState('');

  const store = getCurrentStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSendOrder = () => {
    if (!customerName.trim()) {
      toast.error('Por favor, informe seu nome');
      return;
    }
    if (!isPickup && !address.trim()) {
      toast.error('Por favor, informe seu endereço de entrega');
      return;
    }
    if (!store) return;

    // Build order message
    const itemsList = items
      .map((item) => `• ${item.product.name} x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`)
      .join('\n');

    const deliveryType = isPickup ? '📍 *Retirada no local*' : `📍 *Entregar em:* ${address}`;
    const noteText = note ? `\n📝 *Observação:* ${note}` : '';

    const message = `🛒 *Novo Pedido via Bood!*

👤 *Cliente:* ${customerName}
${deliveryType}

*Itens:*
${itemsList}

💰 *Total:* ${formatPrice(getTotal())}${noteText}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    toast.success('Pedido enviado! Verifique o WhatsApp');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface-sunken pb-20">
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Carrinho</h1>
        </header>

        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4">
            <StoreIcon className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground text-center mb-6">
            Explore as lojas e adicione alguns itens para começar
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6"
          >
            Explorar Lojas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-sunken pb-32">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">Carrinho</h1>
          {store && (
            <p className="text-sm text-muted-foreground truncate">{store.name}</p>
          )}
        </div>
        <button
          onClick={clearCart}
          className="text-destructive p-2"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      <main className="px-4 py-4">
        {/* Cart Items */}
        <section className="bg-card rounded-2xl p-4 mb-4">
          <h2 className="font-semibold text-foreground mb-3">Seus Itens</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-card text-foreground"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-foreground w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-accent-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-card rounded-2xl p-4 mb-4">
          <h2 className="font-semibold text-foreground mb-4">Dados da Entrega</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Seu Nome *
              </Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Digite seu nome"
                className="mt-1.5 bg-secondary border-0 h-12 rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="pickup" className="font-medium text-foreground">
                  Retirar no local
                </Label>
              </div>
              <Switch
                id="pickup"
                checked={isPickup}
                onCheckedChange={setIsPickup}
              />
            </div>

            {!isPickup && (
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-foreground">
                  Endereço de Entrega *
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Digite seu endereço completo"
                  className="mt-1.5 bg-secondary border-0 h-12 rounded-xl"
                />
              </div>
            )}

            <div>
              <Label htmlFor="note" className="text-sm font-medium text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Observação para a loja (opcional)
              </Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Algum pedido especial?"
                className="mt-1.5 bg-secondary border-0 rounded-xl resize-none"
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-card rounded-2xl p-4">
          <h2 className="font-semibold text-foreground mb-3">Resumo do Pedido</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entrega</span>
              <span className="text-foreground">A combinar</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-foreground">Total Estimado</span>
                <span className="font-bold text-primary text-lg">{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Send Button */}
      <div className="fixed bottom-20 left-4 right-4 z-50">
        <Button
          onClick={handleSendOrder}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl shadow-elevated font-bold text-lg flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Enviar Pedido via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
