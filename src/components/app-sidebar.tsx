import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconSettings,
  IconBuildingStore,
  IconBackpack,
  IconTrophy,
  IconTarget,
  IconPlug,
  IconHelp,
  IconBrandGithub,
  IconWorld,
  IconRocket,
} from "@tabler/icons-react"
import { useStats } from "@/contexts/StatsContext"

import { NavMain } from "@/components/nav-main.tsx"
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
  navOverview: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: IconTrophy,
      badge: "Soon",
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
      badge: "Soon",
    },
  ],
  navArsenal: [
    {
      title: "Stakes",
      url: "/stakes",
      icon: IconTarget,
    },
    {
      title: "Powerup Store",
      url: "/store",
      icon: IconBuildingStore,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: IconBackpack,
    },
  ],
  navSystem: [
    {
      title: "Integrations",
      url: "/integrations",
      icon: IconPlug,
    },
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
  ],
  navSecondary: [
    {
      title: "GitHub",
      url: "https://github.com/Valeron-T/GamLeet",
      icon: IconBrandGithub,
    },
    {
      title: "Website",
      url: "https://valeron.me",
      icon: IconWorld,
    },
    {
      title: "What's Next",
      url: "/whats-next",
      icon: IconRocket,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { stats } = useStats()
  const [user, setUser] = React.useState({
    name: "Loading...",
    email: "...",
    avatar: "/avatars/shadcn.jpg",
  })

  React.useEffect(() => {
    if (stats) {
      setUser({
        name: stats.name || "User",
        email: stats.email || "",
        avatar: "", // Rely on initials fallback
      })
    }
  }, [stats])

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
        <NavMain items={data.navOverview} label="Overview" />
        <NavMain items={data.navArsenal} label="Arsenal" />
        <NavMain items={data.navSystem} label="System" />
        <NavMain items={data.navSecondary} label="Source" className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
