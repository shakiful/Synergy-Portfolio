
"use client"; // Admin layout often has client-side interactions for navigation state

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Layers, Settings, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar"; // Assuming you have a robust sidebar component

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Manage Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Manage Projects", href: "/admin/projects", icon: Layers },
  { label: "Manage Skills", href: "/admin/skills", icon: Lightbulb },
  // { label: "Settings", href: "/admin/settings", icon: Settings }, // Example for future
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // For this example, we assume admin is authenticated.
  // In a real app, you'd have authentication logic here.
  const isAdminAuthenticated = true; 

  if (!isAdminAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Access Denied. Please log in as admin.</p>
        {/* Optionally, redirect to a login page:
        import { redirect } from 'next/navigation';
        redirect('/login'); 
        */}
      </div>
    );
  }
  
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar className="border-r bg-muted/40">
          <SidebarHeader className="p-4">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="text-lg">Admin Panel</span>
            </Link>
          </SidebarHeader>
          <Separator />
          <SidebarContent className="p-4">
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))}
                    className="justify-start"
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <Separator />
          <SidebarFooter className="p-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Public Site</Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"> {/* sm:pl-14 for collapsed sidebar space */}
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-8">
                <SidebarTrigger className="sm:hidden" /> {/* For mobile */}
                {/* Breadcrumbs or page title can go here */}
             </header>
            <main className="flex-1 p-6 sm:px-8 sm:py-0 md:gap-8 overflow-auto">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
