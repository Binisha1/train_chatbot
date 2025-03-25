"use client";

import type * as React from "react";
import {
  Plus,
  Code,
  Zap,
  Cpu,
  Home,
  Bot,
  BarChart,
  UserPlus2,
  ActivityIcon,
  GitPullRequestDraft,
  CalendarHeart,
  Hammer,
  DownloadCloud,
  Download,
  File,
  Globe,
  BrickWall,
} from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

// Updated data structure with icons
const data = {
  home: [
    { title: "Home", icon: Home, url: "/", badge: "2" },
    {
      title: "customization",
      icon: Hammer,
      url: "/customization",
      badge: "12",
    },
    { title: "Training", icon: Bot, url: "", badge: "74" },
    { title: "Testing", icon: CalendarHeart, url: "" },
  ],
  footer: [
    { title: "Help Center", icon: Globe, url: "" },
    { title: "Sub accounts", icon: Home, url: "" },
    { title: "Billing", icon: BrickWall, url: "" },
  ],
  navMain: [
    {
      title: "MicroDose",
      url: "/api",
      icon: Code,
      items: [
        { title: "Analytics", url: "/", icon: BarChart, badge: "9" },
        { title: "Leads", url: "/", icon: UserPlus2 },
        { title: "Actions", url: "/", icon: ActivityIcon },
        { title: "Add to website", url: "/", icon: GitPullRequestDraft },

        {
          title: "Edge Runtime",
          url: "/",
          icon: Zap,
        },
      ],
    },
    {
      title: "Teams",
      url: "/",
      icon: Cpu,
      items: [
        {
          title: "Reports",
          url: "/",
          icon: BarChart,
        },
        {
          title: "Projects",
          url: "/",
          icon: Download,
        },
        {
          title: "Template",
          url: "/",
          icon: File,
        },
        {
          title: "Documents",
          url: "/",
          icon: DownloadCloud,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { state } = useSidebar();

  // Function to handle navigation
  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader className="border-none">
        <div className="flex justify-between items-center w-full p-2 border-b-2 border-border text-text-primary">
          {state === "expanded" && (
            <span className="font-semibold">Microdose Inc</span>
          )}
          <SidebarTrigger className="hidden md:flex" />
        </div>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent className="gap-0 mt-0 pt-0 sidebar-content overflow-y-auto">
        <SidebarGroup className="border-b-2 border-border">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.home.map((home) => (
                <SidebarMenuItem key={home.title}>
                  <SidebarMenuButton onClick={() => handleNavigation(home.url)}>
                    <home.icon className="mr-2 h-4 w-4" />
                    <span>{home.title}</span>
                  </SidebarMenuButton>
                  {home.badge && (
                    <SidebarMenuBadge className="w-4 items-center">
                      {home.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup className="border-b-2 border-border">
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}{" "}
                  <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-45" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="overflow-hidden">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton
                          onClick={() => handleNavigation(subItem.url)}
                        >
                          <subItem.icon className="mr-2 h-4 w-4" />
                          <span>{subItem.title}</span>
                        </SidebarMenuButton>
                        {subItem.badge && (
                          <SidebarMenuBadge className="w-4 ">
                            {subItem.badge}
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup className="border-b border-border">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.footer.map((home) => (
                <SidebarMenuItem key={home.title}>
                  <SidebarMenuButton asChild>
                    <a href={home.url}>
                      <home.icon />
                      <span>{home.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
