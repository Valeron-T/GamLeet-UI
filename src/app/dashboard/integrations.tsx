import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { IconMail, IconBrandDiscord, IconBrandSlack, IconBrandWhatsapp, IconPlug, IconSettings, IconShieldCheck, IconCode, IconBrandLeetcode } from "@tabler/icons-react"
import { useStats } from "@/contexts/StatsContext.tsx"
import { useState } from "react"
import { LeetCodeModal } from "@/components/LeetCodeModal.tsx"
import { ZerodhaModal } from "@/components/ZerodhaModal.tsx"
import { syncUserProgress } from "@/api/dashboard"
import { toast } from "sonner"
import { IconCurrencyRupee } from "@tabler/icons-react"

const communicationIntegrations = [
    {
        id: "resend",
        name: "Resend",
        description: "Email notifications and system alerts.",
        icon: <IconMail className="text-sky-500" size={24} />,
        status: "connected",
        type: "Active",
        details: "Sends penalty reports and streak reminders via secure SMTP."
    },
    {
        id: "discord",
        name: "Discord",
        description: "Real-time updates in your server.",
        icon: <IconBrandDiscord className="text-indigo-500" size={24} />,
        status: "coming-soon",
        type: "Nudger",
        details: "Webhooks for daily status and public accountability."
    },
    {
        id: "slack",
        name: "Slack",
        description: "Professional nudges for workspace teams.",
        icon: <IconBrandSlack className="text-rose-500" size={24} />,
        status: "coming-soon",
        type: "Nudger",
        details: "Direct messages and channel alerts for team-based DSA cycles."
    },
    {
        id: "whatsapp",
        name: "WhatsApp",
        description: "Direct notifications to your phone.",
        icon: <IconBrandWhatsapp className="text-emerald-500" size={24} />,
        status: "coming-soon",
        type: "Priority",
        details: "High-priority alerts for impending penalties."
    }
];

export default function Integrations() {
    const { stats, refreshStats } = useStats();
    const [isLeetCodeModalOpen, setIsLeetCodeModalOpen] = useState(false);
    const [isZerodhaModalOpen, setIsZerodhaModalOpen] = useState(false);

    const leetcodeStatus = stats?.leetcode_connected ? "connected" : "disconnected";

    const codePlatformIntegrations = [
        {
            id: "leetcode",
            name: "LeetCode",
            description: stats?.leetcode_username || "Core problem tracking system.",
            icon: <IconBrandLeetcode className="text-amber-500" size={24} />,
            status: leetcodeStatus,
            type: "Source",
            details: "Syncs your daily solves and contest performance directly from your profile."
        }
    ];

    const tradingPlatformIntegrations = [
        {
            id: "zerodha",
            name: "Zerodha",
            description: stats?.zerodha_connected ? "Kite Connect Configured" : "Penalty Execution Hub",
            icon: <IconCurrencyRupee className="text-sky-500" size={24} />,
            status: stats?.zerodha_connected ? "connected" : "disconnected",
            type: "Penalty",
            details: "Executes automated stock purchases as penalties for missed goals. Required for Hardcore/God modes."
        }
    ];

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-10 p-4 md:p-8 max-w-6xl mx-auto w-full">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                <IconPlug size={24} />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Integrations</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">Configure your external nudgers and communication hubs.</p>
                    </div>

                    {/* Communication Hubs */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <IconMail size={20} className="text-muted-foreground" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Communication Hubs</h2>
                            <Separator className="flex-1 opacity-50" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {communicationIntegrations.map((item) => (
                                <IntegrationCard key={item.id} item={item} onLogin={() => { }} />
                            ))}
                        </div>
                    </div>

                    {/* Code Platforms */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <IconCode size={20} className="text-muted-foreground" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Code Platforms</h2>
                            <Separator className="flex-1 opacity-50" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {codePlatformIntegrations.map((item) => (
                                <IntegrationCard
                                    key={item.id}
                                    item={item}
                                    onConfigure={() => {
                                        if (item.id === "leetcode") setIsLeetCodeModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Trading Platforms */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <IconCurrencyRupee size={20} className="text-muted-foreground" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Trading Platforms</h2>
                            <Separator className="flex-1 opacity-50" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tradingPlatformIntegrations.map((item) => (
                                <IntegrationCard
                                    key={item.id}
                                    item={item}
                                    onConfigure={() => {
                                        if (item.id === "zerodha") setIsZerodhaModalOpen(true);
                                    }}
                                    onLogin={async () => {
                                        if (item.id === "zerodha") {
                                            if (!stats?.zerodha_connected) {
                                                toast.error("Please configure your API credentials first");
                                                setIsZerodhaModalOpen(true);
                                                return;
                                            }
                                            // Trigger the backend login which uses stored keys
                                            const backendUrl = localStorage.getItem('backend_url') || "localhost:8000";
                                            const protocol = backendUrl.startsWith('http') ? '' : 'http://';
                                            window.location.href = `${protocol}${backendUrl}/user/login`;
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <LeetCodeModal
                        isOpen={isLeetCodeModalOpen}
                        onClose={() => setIsLeetCodeModalOpen(false)}
                        onSuccess={() => {
                            refreshStats();
                        }}
                        currentUsername={stats?.leetcode_username}
                        currentAllowPaid={stats?.allow_paid}
                    />

                    <ZerodhaModal
                        isOpen={isZerodhaModalOpen}
                        onClose={() => setIsZerodhaModalOpen(false)}
                        onSuccess={() => {
                            refreshStats();
                        }}
                    />

                    <div className="mt-8 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/10 flex flex-col items-center text-center gap-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-4 rounded-3xl bg-primary/20 text-primary border border-primary/30 shadow-2xl shadow-primary/20 transition-transform group-hover:scale-110">
                            <IconPlug size={40} />
                        </div>
                        <div className="relative z-10 space-y-2">
                            <h2 className="text-2xl font-black tracking-tight">Expand Your Ecosystem</h2>
                            <p className="text-muted-foreground max-w-lg font-medium">We're constantly adding new ways to keep you accountable. Suggest a new integration on our Discord.</p>
                        </div>
                        <Button className="mt-4 rounded-xl px-8 font-black uppercase tracking-widest text-xs h-12">
                            Submit Suggestion
                        </Button>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

function IntegrationCard({ item, onConfigure, onLogin }: { item: any, onConfigure?: () => void, onLogin?: () => void }) {
    const [isSyncing, setIsSyncing] = useState(false);

    return (
        <Card className="group relative overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/30">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-3 rounded-2xl bg-secondary/50 border border-border/50 transition-colors group-hover:border-primary/20">
                    {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0">
                            {item.type}
                        </Badge>
                    </div>
                    <CardDescription className="line-clamp-1">{item.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <p className="text-sm text-balance text-muted-foreground leading-relaxed font-medium">
                    {item.details}
                </p>
            </CardContent>
            <CardFooter className="pt-2 flex items-center justify-between">
                {item.status === "connected" ? (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-500 tracking-wider uppercase">Active Connection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg"
                                onClick={onConfigure}
                            >
                                <IconSettings size={16} />
                            </Button>
                            {item.id === "zerodha" && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                                    onClick={onLogin}
                                >
                                    Login
                                </Button>
                            )}
                            <Switch
                                checked={true}
                                disabled={isSyncing}
                                onCheckedChange={async (checked) => {
                                    if (checked) {
                                        setIsSyncing(true);
                                        try {
                                            await syncUserProgress();
                                            toast.success("Progress synced successfully");
                                        } catch (e) {
                                            toast.error("Manual sync failed");
                                        } finally {
                                            setIsSyncing(false);
                                        }
                                    }
                                }}
                            />
                        </div>
                    </>
                ) : item.status === "disconnected" ? (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-amber-500" />
                            <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">Not Linked</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[10px] font-black uppercase tracking-widest"
                            onClick={onConfigure}
                        >
                            Configure
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                            <span className="text-xs font-bold tracking-wider uppercase">Development Phase</span>
                        </div>
                        <Button disabled variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest bg-muted/50 border-dashed">
                            Stay Tuned
                        </Button>
                    </>
                )}
            </CardFooter>
            {item.status === "connected" && (
                <div className="absolute top-4 right-4 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
                    <IconShieldCheck size={48} stroke={1} />
                </div>
            )}
        </Card>
    );
}
