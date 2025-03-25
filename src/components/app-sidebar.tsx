import {
  ActivityIcon,
  BarChart,
  Bot,
  Calendar,
  GitPullRequestDraft,
  Hammer,
  Search,
  User2,
  UserPlus2,
} from "lucide-react";
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
  { title: "Training", path: "/", icon: Bot },
  { title: "Customization", path: "/customization", icon: Hammer },
  { title: "Testing", path: "/", icon: Calendar },
  { title: "History", path: "/", icon: Search },
  { title: "Analytics", path: "/", icon: BarChart },
  { title: "Leads", path: "/", icon: UserPlus2 },
  { title: "Actions", path: "/", icon: ActivityIcon },
  { title: "Add to website", path: "/", icon: GitPullRequestDraft },
  { title: "Account", path: "/", icon: User2 },
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
