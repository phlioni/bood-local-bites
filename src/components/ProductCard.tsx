import { Product } from '@/data/stores';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Box } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart(product);
    toast({
      title: "Adicionado!",
      description: `${product.name} foi para o carrinho.`,
      duration: 2000,
    });
  };

  const handleArView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/ar/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-row h-28 md:h-auto md:flex-col transition-all hover:shadow-md relative group">
      {/* Imagem */}
      <div className="w-28 h-full md:w-full md:h-40 relative shrink-0 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Badge 3D */}
        {product.modelUrl && (
          <button
            onClick={handleArView}
            className="absolute top-2 right-2 z-[999] bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-xl border-2 border-white transition-all hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            title="Ver em 3D"
          >
            <Box className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={handleAdd}
            className="h-8 w-8 rounded-full p-0 bg-gray-100 hover:bg-green-100 text-gray-900 hover:text-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};