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

    const viewerStyle = { width: '100%', height: '100%', backgroundColor: '#111' };

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
        addToCart(product);
        toast({
            title: "Adicionado ao carrinho!",
            description: `${product.name} foi incluído no seu pedido.`,
        });
        navigate('/cart');
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-black text-white relative overflow-hidden">
            {/* Header Fixo no Topo */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition shadow-lg"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-center drop-shadow-md">
                    <p className="text-[10px] text-gray-300 uppercase tracking-wider font-bold">Modo 3D</p>
                    <h1 className="font-bold text-lg leading-none">{product.name}</h1>
                </div>
                <div className="w-10"></div>
            </div>

            {/* Viewer 3D */}
            <div className="flex-1 w-full h-full relative bg-gray-900">
                {product.modelUrl ? (
                    <model-viewer
                        src={product.modelUrl}
                        poster={product.image}
                        alt={`Modelo 3D de ${product.name}`}
                        shadow-intensity="1.5"
                        camera-controls
                        auto-rotate
                        ar
                        ar-modes="scene-viewer webxr quick-look"
                        loading="eager"
                        style={viewerStyle}
                    >
                        {/* BOTÃO CORRIGIDO: Agora fica no TOPO para não bater no footer */}
                        <button
                            slot="ar-button"
                            className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur text-blue-700 border border-blue-200 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-3 z-[100] active:scale-95 transition-all animate-in fade-in slide-in-from-top-4"
                        >
                            <Box className="w-5 h-5 stroke-2" />
                            Ver na sua mesa
                        </button>
                    </model-viewer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Modelo 3D indisponível.</p>
                    </div>
                )}
            </div>

            {/* Footer (Ficha do Produto) */}
            <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-900 p-6 pt-8 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-50">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{storeName}</p>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</p>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>

                <Button
                    onClick={handleAddToCart}
                    className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Adicionar ao Pedido
                </Button>
            </div>
        </div>
    );
};

export default ArPage;