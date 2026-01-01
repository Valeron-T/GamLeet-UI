import { Link } from "react-router"
import { type Icon } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function NavSource({
    items,
    className,
}: {
    items: {
        title: string
        url: string
        icon: Icon
    }[]
    className?: string
}) {
    return (
        <SidebarGroup className={cn("p-0", className)}>
            <SidebarGroupContent className="px-2 py-2">
                <div className="flex flex-row items-center justify-between gap-1">
                    {items.map((item) => {
                        const isExternal = item.url.startsWith("http")
                        return (
                            <div key={item.title} className="flex-1 flex justify-center">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SidebarMenuButton asChild className="size-8 p-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                                            {isExternal ? (
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    <item.icon className="size-5" />
                                                    <span className="sr-only">{item.title}</span>
                                                </a>
                                            ) : (
                                                <Link to={item.url}>
                                                    <item.icon className="size-5" />
                                                    <span className="sr-only">{item.title}</span>
                                                </Link>
                                            )}
                                        </SidebarMenuButton>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p>{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        )
                    })}
                </div>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
