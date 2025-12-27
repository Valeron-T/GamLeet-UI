import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RiCopperCoinFill } from "react-icons/ri"
import { IconSnowflake, IconShieldLock, IconBolt, IconFlame, IconInfinity, IconLock, IconTrophy } from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { fetchUserInventory, fetchUserAchievements, InventoryItem, Achievement } from "@/api/dashboard"

const POWERUP_INFO: Record<string, { name: string; icon: React.ReactNode; color: string }> = {
    "streak-freeze": { name: "Streak Freeze", icon: <IconSnowflake size={32} />, color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    "penalty-shield": { name: "Penalty Shield", icon: <IconShieldLock size={32} />, color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
    "daily-double": { name: "Daily Double", icon: <IconBolt size={32} />, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    "streak-doubler": { name: "Streak Doubler", icon: <IconFlame size={32} />, color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
    "immortality": { name: "Market Immortality", icon: <IconInfinity size={32} />, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
}

const RARITY_STYLES: Record<string, string> = {
    common: "border-gray-400/30 bg-gray-400/5",
    rare: "border-blue-400/30 bg-blue-400/5",
    epic: "border-purple-400/30 bg-purple-400/5",
    legendary: "border-amber-400/30 bg-amber-400/5 shadow-lg shadow-amber-400/10",
}

const RARITY_BADGE_STYLES: Record<string, string> = {
    common: "bg-gray-500/20 text-gray-400",
    rare: "bg-blue-500/20 text-blue-400",
    epic: "bg-purple-500/20 text-purple-400",
    legendary: "bg-amber-500/20 text-amber-400",
}

export default function Inventory() {
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            fetchUserInventory(),
            fetchUserAchievements()
        ]).then(([inv, ach]) => {
            setInventory(inv.items)
            setAchievements(ach.achievements)
        }).catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const unlockedCount = achievements.filter(a => a.unlocked).length

    if (loading) {
        return (
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                        <Skeleton className="h-10 w-48" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
                        </div>
                        <Skeleton className="h-10 w-48" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Inventory & Achievements</h1>
                            <p className="text-muted-foreground">Your powerups and earned milestones.</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <IconTrophy className="text-primary" size={20} />
                            <span className="font-bold">{unlockedCount}/{achievements.length} Unlocked</span>
                        </div>
                    </div>

                    {/* Inventory Section */}
                    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <RiCopperCoinFill size={20} color="#ffc900" />
                                My Powerups
                            </CardTitle>
                            <CardDescription>Items you own. Use them wisely.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {inventory.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p className="text-lg font-medium">No powerups yet!</p>
                                    <p className="text-sm">Visit the Store to acquire some.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {inventory.map((item) => {
                                        const info = POWERUP_INFO[item.item_id] || { name: item.item_id, icon: <IconBolt size={32} />, color: "text-gray-400" }
                                        return (
                                            <div
                                                key={item.item_id}
                                                className={`relative p-4 rounded-xl border-2 ${info.color} flex flex-col items-center gap-2 transition-transform hover:scale-105`}
                                            >
                                                <div className={`p-3 rounded-xl ${info.color}`}>
                                                    {info.icon}
                                                </div>
                                                <span className="text-sm font-bold text-center">{info.name}</span>
                                                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground font-black">
                                                    x{item.quantity}
                                                </Badge>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Achievements Section */}
                    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <IconTrophy className="text-amber-500" size={20} />
                                Achievements
                            </CardTitle>
                            <CardDescription>Milestones on your journey to mastery.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className={`relative p-4 rounded-xl border-2 transition-all ${ach.unlocked
                                                ? RARITY_STYLES[ach.rarity]
                                                : "border-muted/30 bg-muted/5 opacity-60"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`text-3xl ${ach.unlocked ? "" : "grayscale"}`}>
                                                {ach.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{ach.name}</span>
                                                    <Badge className={`text-[9px] uppercase font-black ${RARITY_BADGE_STYLES[ach.rarity]}`}>
                                                        {ach.rarity}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">{ach.description}</p>
                                            </div>
                                            {!ach.unlocked && (
                                                <IconLock className="text-muted-foreground/50" size={16} />
                                            )}
                                        </div>
                                        {ach.unlocked && ach.unlocked_at && (
                                            <div className="mt-2 text-[10px] text-muted-foreground">
                                                Unlocked {new Date(ach.unlocked_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
