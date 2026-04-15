import {
  LayoutDashboard, UtensilsCrossed, ClipboardList, Users, UserCog,
  ChefHat, UserCheck, CreditCard, BarChart3
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Menu Items", url: "/menu", icon: UtensilsCrossed },
  { title: "Orders", url: "/orders", icon: ClipboardList },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Employees", url: "/employees", icon: UserCog },
  { title: "Kitchen", url: "/kitchen", icon: ChefHat },
  { title: "Managers", url: "/managers", icon: UserCheck },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-6">
        {/* Brand */}
        <div className="px-4 mb-6">
          {!collapsed && (
            <h2 className="text-xl font-display font-bold text-sidebar-primary-foreground">
              <span className="text-sidebar-primary">Restro</span>Hub
            </h2>
          )}
          {collapsed && (
            <span className="text-sidebar-primary font-display font-bold text-xl">R</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest font-body">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`transition-all duration-200 rounded-lg hover:bg-sidebar-accent ${active ? "bg-sidebar-accent text-sidebar-primary font-semibold" : ""}`}
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {!collapsed && <span className="font-body">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
