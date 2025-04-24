
import { ReactNode, useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, ClipboardCheck, Home, FileCheck, Settings } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-medical-800">医疗金融管理系统</h1>
            <div></div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const menuItems = [
    {
      title: "仪表盘",
      url: "/",
      icon: Home,
    },
    {
      title: "今日订单",
      url: "/orders",
      icon: Calendar,
    },
    {
      title: "待处理订单",
      url: "/pending",
      icon: ClipboardCheck,
    },
    {
      title: "已完成订单",
      url: "/completed",
      icon: FileCheck,
    },
    {
      title: "设置",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="px-6 py-5">
        <div className="text-xl font-bold text-medical-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-medical-600 text-white flex items-center justify-center">
            M
          </div>
          MedOrder
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
