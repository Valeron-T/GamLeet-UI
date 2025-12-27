import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconPlug,
  IconReport,
  IconSearch,
  IconSettings,
  IconBuildingStore,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { fetchUserStats } from "@/api/dashboard"

import { NavDocuments } from "@/components/nav-documents.tsx"
import { NavMain } from "@/components/nav-main.tsx"
import { NavSecondary } from "@/components/nav-secondary.tsx"
import { NavUser } from "@/components/nav-user.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
    {
      title: "Stakes",
      url: "/stakes",
      icon: IconReport,
    },
    {
      title: "Powerup Store",
      url: "/store",
      icon: IconBuildingStore,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: IconPlug,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "...",
    avatar: "/avatars/shadcn.jpg",
  })

  useEffect(() => {
    async function loadUser() {
      try {
        const stats = await fetchUserStats()
        if (stats.name || stats.email) {
          setUser({
            name: stats.name || "User",
            email: stats.email || "",
            avatar: "", // Rely on initials fallback
          })
        }
      } catch (error) {
        console.error("Failed to load user for sidebar:", error)
      }
    }
    loadUser()
  }, [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            > */}
            <div className="flex flex-row pointer-events-none">
              <img src="/images/gameleet_icon.png" alt="GamLeet Logo" className="h-8 w-auto" />
              <h1 className="text-base font-semibold pl-2 self-center">GamLeet</h1>
            </div>
            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
