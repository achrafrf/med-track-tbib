
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Calendar, FileText, Home, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const mainMenuItems = [
    {
      title: t("nav.dashboard"),
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("nav.appointments"),
      path: "/appointments",
      icon: Calendar,
    },
    {
      title: t("nav.patients"),
      path: "/patients",
      icon: Users,
    },
    {
      title: t("nav.prescriptions"),
      path: "/prescriptions",
      icon: FileText,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-tbib-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl text-tbib-600">{t("app.title")}</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.dashboard")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-3", 
                        location.pathname === item.path && "text-tbib-600 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.insurance")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/cnss"}>
                  <Link to="/cnss" className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-tbib-600 text-white rounded-sm flex items-center justify-center text-xs font-bold">C</span>
                    <span>{t("nav.cnss")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/ramed"}>
                  <Link to="/ramed" className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-green-600 text-white rounded-sm flex items-center justify-center text-xs font-bold">R</span>
                    <span>{t("nav.ramed")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
          <span>{t("nav.backToHome")}</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
