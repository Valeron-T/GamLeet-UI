import { Link } from "react-router"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  label,
  className,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    badge?: string
    id?: string
  }[]
  label?: string
  className?: string
}) {
  return (
    <SidebarGroup className={className}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isExternal = item.url.startsWith("http");
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} id={item.id}>
                  {isExternal ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  ) : (
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-primary/10 text-primary/60 px-1.5 py-0.5 rounded-full border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
