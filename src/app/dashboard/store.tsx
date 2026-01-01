import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiCopperCoinFill } from "react-icons/ri"
import { IconFlame, IconShieldLock, IconBolt, IconInfinity, IconSnowflake } from "@tabler/icons-react"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { useStats } from "@/contexts/StatsContext"
import { purchasePowerup } from "@/api/dashboard"
import { toast } from "sonner"

interface Powerup {
    id: string;
    name: string;
    description: string;
    cost: number;
    icon: React.ReactNode;
    color: string;
    category: string;
    comingSoon?: boolean;
}

const powerups: Powerup[] = [
    {
        id: "streak-freeze",
        name: "Streak Freeze",
        description: "Equip this to protect your streak from breaking for one day if you miss your goal.",
        cost: 150,
        icon: <IconSnowflake size={48} />,
        color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        category: "Protection"
    },
    {
        id: "penalty-shield",
        name: "Penalty Shield",
        description: "Avoid one automation-triggered penny stock purchase. Stay safe from the market!",
        cost: 250,
        icon: <IconShieldLock size={48} />,
        color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        category: "Financial"
    },
    {
        id: "daily-double",
        name: "Daily Double",
        description: "Double the GamCoins you earn for the next 24 hours. Grind harder, earn more.",
        cost: 400,
        icon: <IconBolt size={48} />,
        color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        category: "Boost",
        comingSoon: true
    },
    {
        id: "streak-doubler",
        name: "Streak Doubler",
        description: "Adds a permanent +1 bonus to your daily streak count progression for 3 days.",
        cost: 600,
        icon: <IconFlame size={48} />,
        color: "text-orange-400 bg-orange-400/10 border-orange-400/20",
        category: "Boost",
        comingSoon: true
    },
    {
        id: "immortality",
        name: "Market Immortality",
        description: "Full immunity from penny stock penalties for the next 3 failures. Limited time only.",
        cost: 1200,
        icon: <IconInfinity size={48} />,
        color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        category: "Elite",
        comingSoon: true
    }
];

export default function Store() {
    const { stats, refreshStats } = useStats();
    const [isPurchasing, setIsPurchasing] = useState<string | null>(null);

    const coins = stats?.gamcoins || 0;

    const handlePurchase = async (powerup: Powerup) => {
        if (powerup.comingSoon) return;

        setIsPurchasing(powerup.id);
        try {
            await purchasePowerup(powerup.id);
            await refreshStats();
            toast.success(`Successfully acquired ${powerup.name}! Check your inventory.`);
        } catch (error) {
            toast.error("Failed to acquire powerup. Please try again.");
            console.error(error);
        } finally {
            setIsPurchasing(null);
        }
    };

    if (!stats) {
        return (
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-48" />
                                <Skeleton className="h-4 w-80" />
                            </div>
                            <Skeleton className="h-14 w-40 rounded-xl" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} className="h-[300px] animate-pulse bg-card/50" />
                            ))}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight uppercase">Powerup Store</h1>
                            <p className="text-muted-foreground font-medium">Enhance your productivity. Dominate the market.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {powerups.map((powerup) => (
                            <Card key={powerup.id} className={`group relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 transition-all duration-300 ${powerup.comingSoon ? 'opacity-75 grayscale' : 'hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10'}`}>
                                <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity`}>
                                    <Badge variant="outline" className={`${powerup.color} border-0 uppercase text-[10px] font-black tracking-widest`}>
                                        {powerup.comingSoon ? "Coming Soon" : powerup.category}
                                    </Badge>
                                </div>
                                <CardHeader className="pb-2">
                                    <div className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center ${powerup.color} border transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg`}>
                                        {powerup.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold tracking-tight">{powerup.name}</CardTitle>
                                    <CardDescription className="text-sm leading-relaxed line-clamp-2 font-medium">
                                        {powerup.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <RiCopperCoinFill size={18} color="#ffc900" />
                                        <span className="text-lg font-black font-mono">{powerup.cost} <span className="text-xs opacity-50">GC</span></span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className={`w-full font-black uppercase tracking-widest h-12 rounded-xl transition-all ${powerup.comingSoon
                                            ? 'bg-muted/50 cursor-not-allowed'
                                            : 'bg-muted/20 hover:bg-primary hover:text-primary-foreground border-border/50 group-hover:border-primary/50'
                                            }`}
                                        disabled={powerup.comingSoon || coins < powerup.cost || isPurchasing === powerup.id}
                                        onClick={() => handlePurchase(powerup)}
                                    >
                                        {powerup.comingSoon
                                            ? "Coming Soon"
                                            : isPurchasing === powerup.id
                                                ? "Acquiring..."
                                                : coins < powerup.cost
                                                    ? "Insufficient GC"
                                                    : "Acquire Powerup"}
                                    </Button>
                                </CardFooter>

                                {!powerup.comingSoon && (
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-primary to-orange-500 blur-3xl -z-10 translate-y-12" />
                                )}
                            </Card>
                        ))}

                        <Card className="flex flex-col items-center justify-center p-8 border-dashed border-border/50 bg-muted/5 text-center rounded-3xl min-h-[340px]">
                            <div className="mb-4 text-muted-foreground/30 italic font-medium">New Powerups Arriving Soon</div>
                        </Card>
                    </div>

                    <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/10 via-background to-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                        <div className="p-6 rounded-3xl bg-primary/20 text-primary border border-primary/30 shadow-2xl shadow-primary/20">
                            <IconBolt size={40} className="animate-pulse" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-black tracking-tight uppercase">Earn More Coins</h3>
                            <p className="text-muted-foreground font-medium max-w-xl">Solve Hard problems on LeetCode to earn up to 50 GamCoins per submission. Maintain your streak for bonus multipliers and platform dominance.</p>
                        </div>
                        <Button variant="outline" className="rounded-2xl font-black uppercase tracking-widest text-xs h-14 px-8 border-primary/20 hover:bg-primary/10">
                            View Rewards Logic
                        </Button>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
