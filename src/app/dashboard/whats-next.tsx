import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IconRocket, IconGitPullRequest, IconSearch, IconAlertCircle, IconCheck, IconExternalLink, IconTimeline } from "@tabler/icons-react"

export default function WhatsNext() {
    const roadmapItems = [
        {
            title: "Analytics & Leaderboards",
            description: "Compete against your friends and the world.",
            status: "In Progress",
            icon: <IconTimeline size={20} className="text-sky-500" />
        },
        {
            title: "Dynamic Stakes",
            description: "Scale your penalties based on the difficulty of the missed problem.",
            status: "Planned",
            icon: <IconRocket size={20} className="text-amber-500" />
        },
        {
            title: "Mutual Accountability",
            description: "You lose money even if your friends don't solve the problem.",
            status: "Planned",
            icon: <IconCheck size={20} className="text-emerald-500" />
        }
    ];

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-10 p-4 md:p-8 max-w-5xl mx-auto w-full">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                <IconRocket size={24} />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">What's Next?</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">The evolution of GamLeet and how you can shape it.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {roadmapItems.map((item, i) => (
                            <Card key={i} className="bg-card/50 border-border/50 overflow-hidden relative group transition-all hover:border-primary/30">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {item.icon}
                                </div>
                                <CardHeader>
                                    <Badge variant="outline" className={`w-fit mb-2 text-[10px] uppercase font-black tracking-widest ${item.status === 'Released' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        item.status === 'In Progress' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        }`}>
                                        {item.status}
                                    </Badge>
                                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                                    <CardDescription className="font-medium text-muted-foreground/80 leading-relaxed">
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6 mt-4">
                        <div className="flex items-center gap-3">
                            <IconGitPullRequest size={20} className="text-muted-foreground" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Request a Feature</h2>
                            <Separator className="flex-1 opacity-50" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                                        <div className="p-2 rounded-lg bg-background border border-border/50 shrink-0 h-fit">
                                            <IconSearch size={18} className="text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-sm">Search First</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">Please check if your idea has already been suggested to avoid duplicates.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                                        <div className="p-2 rounded-lg bg-background border border-border/50 shrink-0 h-fit">
                                            <IconAlertCircle size={18} className="text-amber-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-sm">Be Precise</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">The more detail you provide about the "why" and "how", the faster we can build it.</p>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-2 group shadow-xl shadow-primary/20" asChild>
                                    <a href="https://github.com/Valeron-T/GamLeet/issues/new" target="_blank" rel="noopener noreferrer">
                                        Open GitHub Issue <IconExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </Button>
                            </div>

                            <Card className="border-dashed bg-transparent border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Why GitHub?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-muted-foreground font-medium leading-relaxed">
                                    <p>We use GitHub Issues to keep our development process transparent and organized.</p>
                                    <p>By opening an issue, you allows other users to upvote your request, which helps us prioritize what to build next.</p>
                                    <p>Plus, you can track the status of your request in real-time as we work on it.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
