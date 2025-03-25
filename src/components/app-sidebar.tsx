import { Calendar, Inbox, Search, Settings, Train, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

// Menu items with correct paths
const items = [
  { title: "Training", path: "/", icon: Train },
  { title: "Customization", path: "/customization", icon: Inbox },
  { title: "Testing", path: "/", icon: Calendar },
  { title: "History", path: "/", icon: Search },
  { title: "Analytics", path: "/", icon: Settings },
  { title: "Leads", path: "/", icon: Settings },
  { title: "Actions", path: "/", icon: Settings },
  { title: "Add to website", path: "/", icon: Settings },
  { title: "Account", path: "/", icon: Settings },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between items-center w-full p-2">
              {state === "expanded" && (
                <span className="font-semibold">Menu</span>
              )}
              <SidebarTrigger className=" hidden md:flex" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild onClick={() => navigate(item.path)}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
