import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu } from "lucide-react"; // Ícone de menu explícito

import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden">
              {/* Menu Lateral */}
              <AppSidebar />

              {/* Área Principal */}
              <SidebarInset className="flex-1 flex flex-col w-full h-full relative overflow-hidden">

                {/* Botão de Menu Flutuante (Visível em Mobile e Desktop se fechado) */}
                <div className="absolute top-4 left-4 z-[50]">
                  <SidebarTrigger className="h-10 w-10 bg-white shadow-md border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all">
                    <Menu className="w-5 h-5" />
                  </SidebarTrigger>
                </div>

                {/* Conteúdo das Rotas */}
                <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<MapPage />} />
                    <Route path="/list" element={<Index />} />
                    <Route path="/store/:id" element={<StorePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;