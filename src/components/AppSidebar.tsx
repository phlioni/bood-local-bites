import { Map, List, ShoppingBag, User, LogOut, Heart, Settings, Store } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Configuração dos itens do menu
const navMain = [
    {
        title: "Explorar Mapa",
        url: "/",
        icon: Map
    },
    {
        title: "Lista de Lojas",
        url: "/list",
        icon: List
    },
    {
        title: "Meu Carrinho",
        url: "/cart",
        icon: ShoppingBag
    },
]

const navSecondary = [
    { title: "Meu Perfil", url: "/profile", icon: User },
    { title: "Favoritos", url: "/favorites", icon: Heart },
    { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobile, setOpenMobile } = useSidebar();

    const handleNavigation = (url: string) => {
        navigate(url);
        if (isMobile) {
            setOpenMobile(false); // Fecha o menu automaticamente no mobile ao clicar
        }
    };

    return (
        <Sidebar className="border-r border-gray-100 bg-white shadow-sm">
            {/* --- CABEÇALHO (LOGO) --- */}
            <SidebarHeader className="h-20 flex items-center px-6 border-b border-gray-50/50">
                <div className="flex items-center gap-3 w-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-blue-200 shadow-lg">
                        <Store className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-gray-900 leading-none">Bood</span>
                        <span className="text-[11px] font-medium text-blue-500 uppercase tracking-wider mt-0.5">Local Bites</span>
                    </div>
                </div>
            </SidebarHeader>

            {/* --- CONTEÚDO (NAVEGAÇÃO) --- */}
            <SidebarContent className="px-3 py-6">

                {/* Menu Principal */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {navMain.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={() => handleNavigation(item.url)}
                                            isActive={isActive}
                                            className={`
                        h-12 w-full justify-start gap-4 rounded-xl px-4 text-sm font-medium transition-all duration-200
                        ${isActive
                                                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                      `}
                                        >
                                            <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                            <span className="text-base">{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Menu Conta */}
                <SidebarGroup className="mt-6">
                    <SidebarGroupLabel className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Minha Conta
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {navSecondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => item.url !== "#" && handleNavigation(item.url)}
                                        className="h-10 w-full justify-start gap-4 rounded-xl px-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                                    >
                                        <item.icon className="h-4 w-4 text-gray-400" />
                                        {item.title}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* --- RODAPÉ (PERFIL) --- */}
            <SidebarFooter className="p-4 border-t border-gray-50">
                <div className="bg-gray-50/50 rounded-2xl p-3 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CL</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                            <span className="truncate text-sm font-bold text-gray-900">Cliente Bood</span>
                            <span className="truncate text-xs text-gray-500">cliente@bood.com</span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full h-9 justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair da Conta
                    </Button>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}