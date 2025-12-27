import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { useEffect, useState } from "react"
import { fetchLeaderboard, LeaderboardEntry } from "@/api/leaderboard"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { IconTrophy, IconFlame, IconTarget, IconSum } from "@tabler/icons-react"

export default function Leaderboard() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLeaderboard()
            .then((data) => {
                setEntries(data.entries)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Failed to fetch leaderboard", err)
                setLoading(false)
            })
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-6 gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                            Global Leaderboard
                        </h1>
                        <p className="text-muted-foreground">
                            Compete with other warriors and climb the ranks of excellence.
                        </p>
                    </div>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <CardHeader className="border-b border-border/50 bg-muted/5">
                            <div className="flex items-center gap-2">
                                <IconTrophy className="text-primary" size={24} />
                                <CardTitle>Top Performers</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-muted/10 text-xs uppercase tracking-widest font-bold text-muted-foreground border-b border-border/50">
                                            <th className="px-6 py-4">Rank</th>
                                            <th className="px-6 py-4">Warrior</th>
                                            <th className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <IconSum size={14} /> XP
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <IconTarget size={14} /> Solved
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <IconFlame size={14} /> Streak
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {loading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={i} className="animate-pulse">
                                                    <td className="px-6 py-4"><Skeleton className="h-4 w-4" /></td>
                                                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                                                    <td className="px-6 py-4 text-center"><Skeleton className="h-4 w-12 mx-auto" /></td>
                                                    <td className="px-6 py-4 text-center"><Skeleton className="h-4 w-12 mx-auto" /></td>
                                                    <td className="px-6 py-4 text-center"><Skeleton className="h-4 w-12 mx-auto" /></td>
                                                </tr>
                                            ))
                                        ) : (
                                            entries.map((entry) => (
                                                <tr
                                                    key={entry.public_id}
                                                    className="group hover:bg-primary/5 transition-colors"
                                                >
                                                    <td className="px-6 py-4 font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                                        {entry.rank === 1 && "🥇"}
                                                        {entry.rank === 2 && "🥈"}
                                                        {entry.rank === 3 && "🥉"}
                                                        {entry.rank > 3 && `#${entry.rank}`}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-foreground">
                                                        {entry.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-bold text-primary">
                                                        {entry.total_xp.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-medium">
                                                        {entry.problems_solved}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-1 text-orange-500 font-bold">
                                                            {entry.current_streak} <IconFlame size={16} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
