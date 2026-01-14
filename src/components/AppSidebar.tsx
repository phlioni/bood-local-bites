import { Map, List, ShoppingBag, User, LogOut, Heart, Settings, Home } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { useNavigate, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Itens de navegação principais
const navMain = [
    { title: "Explorar Mapa", url: "/", icon: Map },
    { title: "Lista de Lojas", url: "/list", icon: List },
    { title: "Carrinho", url: "/cart", icon: ShoppingBag },
]

// Itens secundários
const navSecondary = [
    { title: "Perfil", url: "/profile", icon: User },
    { title: "Favoritos", url: "/favorites", icon: Heart },
    { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-gray-100 bg-white">
            {/* Header Simples e Limpo */}
            <SidebarHeader className="h-16 flex items-center justify-center border-b border-gray-50 px-6">
                <div className="flex items-center gap-2 w-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl">
                        B
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-bold text-lg text-gray-900">Bood</span>
                        <span className="text-[10px] uppercase font-medium text-gray-500 tracking-wider">Local Bites</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                {/* Grupo Principal */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                        Menu Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={() => navigate(item.url)}
                                            isActive={isActive}
                                            className={`
                        h-12 w-full justify-start gap-3 rounded-xl px-4 text-base font-medium transition-all
                        ${isActive
                                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                      `}
                                        >
                                            <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Grupo Secundário */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                        Minha Conta
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navSecondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => item.url !== "#" && navigate(item.url)}
                                        className="h-10 w-full justify-start gap-3 rounded-lg px-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
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

            {/* Footer com Perfil */}
            <SidebarFooter className="border-t border-gray-50 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 mb-2">
                    <Avatar className="h-9 w-9 border border-white bg-white shadow-sm">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-semibold text-gray-900">Cliente Bood</span>
                        <span className="truncate text-xs text-gray-500">cliente@bood.com</span>
                    </div>
                </div>

                <SidebarMenuButton
                    className="h-10 w-full justify-center gap-2 rounded-lg border border-red-100 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </SidebarMenuButton>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}