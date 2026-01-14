import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import MapPage from "./pages/MapPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <div className="max-w-lg mx-auto bg-background min-h-screen relative">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/store/:id" element={<StorePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
