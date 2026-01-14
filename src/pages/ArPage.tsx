import { useParams, useNavigate } from 'react-router-dom';
import { stores } from '@/data/stores';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Box, ShoppingBag } from 'lucide-react';
import '@google/model-viewer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ArPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toast } = useToast();

    // Encontrar o produto em todas as lojas
    let product = null;
    let storeName = "";

    for (const store of stores) {
        const found = store.products.find(p => p.id.toString() === productId || p.id === productId);
        if (found) {
            product = found;
            storeName = store.name;
            break;
        }
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <h2 className="text-xl font-bold text-gray-800">Produto não encontrado</h2>
                <Button onClick={() => navigate('/')} className="mt-4">Voltar ao Início</Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            toast({
                title: "Adicionado ao carrinho!",
                description: `${product.name} foi incluído no seu pedido.`,
            });
            navigate('/cart');
        }
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-black text-white relative overflow-hidden">
            {/* Header Transparente */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-center">
                    <p className="text-xs text-gray-300 uppercase tracking-wider">Visualizando em 3D</p>
                    <h1 className="font-bold text-lg">{product.name}</h1>
                </div>
                <div className="w-10"></div> {/* Espaçador */}
            </div>

            {/* Viewer 3D do Google */}
            <div className="flex-1 w-full h-full relative bg-gray-900">
                {product.modelUrl ? (
                    <model-viewer
                        src={product.modelUrl}
                        poster={product.image} // Imagem enquanto carrega
                        alt={`Modelo 3D de ${product.name}`}
                        shadow-intensity="1"
                        camera-controls
                        auto-rotate
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        style={{ width: '100%', height: '100%' }}
                    >
                        {/* Botão que aparece APENAS se o AR estiver disponível no celular */}
                        <button slot="ar-button" className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce">
                            <Box className="w-5 h-5" />
                            Ver na sua mesa
                        </button>
                    </model-viewer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Modelo 3D indisponível para este produto.</p>
                    </div>
                )}
            </div>

            {/* Footer de Ação */}
            <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-900 p-6 rounded-t-3xl shadow-2xl z-50">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-gray-500">{storeName}</p>
                        <h2 className="text-xl font-bold">{product.name}</h2>
                    </div>
                    <p className="text-xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</p>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{product.description}</p>

                <Button
                    onClick={handleAddToCart}
                    className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Pedir Agora
                </Button>
            </div>
        </div>
    );
};

export default ArPage;