"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronRight,
  Cloud,
  FileText,
  FolderArchive,
  HelpCircle,
  History,
  Inbox,
  Layers,
  ListChecks,
  MailPlus,
  Settings,
  Users,
} from "lucide-react"

const mainNav = [
  { label: "Dashboard", href: "/", icon: BarChart3 },
  { 
    label: "Fax", 
    icon: MailPlus,
    items: [
      { label: "Send Fax", href: "/send-fax", icon: MailPlus },
      { label: "History", href: "/history", icon: History },
      { label: "Inbox", href: "/inbox", icon: Inbox },
      { label: "Outbox", href: "/outbox", icon: FolderArchive },
      { label: "Cover Pages", href: "/cover-pages", icon: FileText },
      { label: "eSignatures", href: "/esignatures", icon: Inbox },
    ]
  },
  { 
    label: "Numbers", 
    icon: ListChecks,
    items: [
      { label: "All Numbers", href: "/numbers", icon: ListChecks },
      { label: "Blocked Numbers", href: "/blocked-numbers", icon: ListChecks },
    ]
  },
  { label: "Drive", href: "/drive", icon: Cloud },
  { label: "Integrations", href: "/integrations", icon: Layers },
  { label: "Scheduling", href: "/scheduling", icon: Calendar },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
]

const bottomNav = [
  { label: "Account", href: "/account", icon: Users },
  { label: "Settings", href: "/my-fax-settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openDropdowns, setOpenDropdowns] = React.useState<Record<string, boolean>>({})
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    // Initialize dropdowns as open on client side
    setOpenDropdowns({
      'Fax': true,
      'Numbers': true,
    })
  }, [])

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="layout-container">
        <Sidebar side="left" collapsible="offcanvas" className="bg-sidebar">
          <SidebarHeader className="px-3 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-semibold">
                {"02"}
              </div>
              <div className="font-semibold">02.AI</div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNav.map((item) => {
                    const Icon = item.icon
                    
                    // Handle items with sub-items
                    if (item.items) {
                      const isOpen = isClient ? (openDropdowns[item.label] || false) : true
                      return (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton 
                            onClick={() => toggleDropdown(item.label)}
                            className="cursor-pointer"
                          >
                            <Icon />
                            <span>{item.label}</span>
                            {isClient && (
                              isOpen ? (
                                <ChevronDown className="ml-auto h-4 w-4" />
                              ) : (
                                <ChevronRight className="ml-auto h-4 w-4" />
                              )
                            )}
                          </SidebarMenuButton>
                          {isOpen && (
                            <SidebarMenuSub>
                              {item.items.map((subItem) => {
                                const SubIcon = subItem.icon
                                const active = pathname === subItem.href
                                return (
                                  <SidebarMenuSubItem key={subItem.href}>
                                    <SidebarMenuSubButton asChild isActive={active}>
                                      <Link href={subItem.href} aria-current={active ? "page" : undefined}>
                                        <SubIcon />
                                        <span>{subItem.label}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          )}
                        </SidebarMenuItem>
                      )
                    }
                    
                    // Handle regular items
                    const active = pathname === item.href
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={active}>
                          <Link href={item.href} aria-current={active ? "page" : undefined}>
                            <Icon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomNav.map((item) => {
                  const Icon = item.icon
                  const active = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={active}>
                        <Link href={item.href} aria-current={active ? "page" : undefined}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarFooter>
            <div className="flex items-center gap-2 p-2 rounded-md bg-secondary">
              <Avatar className="size-7">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">You</div>
                <div className="text-xs text-muted-foreground truncate">user@02.ai</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="content-area">
          <TopBar />
          <main className="main-content p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function TopBar() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b flex-shrink-0">
      <div className="flex items-center justify-between h-14 px-3 md:px-6 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground hidden sm:inline">Fax automation platform</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="rounded-md" asChild>
            <Link href="/send-fax">New Fax</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
