import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ShieldAlert, Zap, TrendingUp, ExternalLink, Heart, Sparkles, Flame } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { fetchUserMargins, fetchUserStats, updateDifficulty } from "@/api/dashboard"
import { toast } from "sonner"

const pennyStocks = [
    { ticker: "SUZELON", name: "Suzlon Energy", price: "Rs 42.50", volatility: "High" },
    { ticker: "IDEA", name: "Vodafone Idea", price: "Rs 13.20", volatility: "Extreme" },
    { ticker: "YESBANK", name: "Yes Bank Ltd.", price: "Rs 24.15", volatility: "Medium" },
    { ticker: "ZOMATO", name: "Zomato Ltd.", price: "Rs 185.00", volatility: "High" }, // Not exactly penny but volatile
    { ticker: "JPPOWER", name: "JP Power Ventures", price: "Rs 18.90", volatility: "High" },
    { ticker: "UCOBANK", name: "UCO Bank", price: "Rs 52.10", volatility: "Medium" },
];

export default function RiskParameters() {
    const [difficulty, setDifficulty] = useState("");
    const [selectedStock, setSelectedStock] = useState("SUZELON");
    const [margins, setMargins] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadInitialData() {
            try {
                const [marginData, statsData] = await Promise.all([
                    fetchUserMargins(),
                    fetchUserStats()
                ]);
                setMargins(marginData);
                setStats(statsData);
                if (statsData.difficulty_mode) {
                    setDifficulty(statsData.difficulty_mode);
                }
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateDifficulty(difficulty);
            toast.success("Accountability settings updated!");
        } catch (error) {
            console.error("Failed to update difficulty:", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    const availableMargin = margins?.equity?.available?.live_balance ?? 0;

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">The Stakes</h1>
                        <p className="text-sm text-muted-foreground">Configure your accountability level. High risk, high discipline.</p>
                    </div>

                    <div className="grid gap-4">
                        {/* Difficulty Selection - Full Width for better readability of modes */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="text-primary size-5" />
                                    <CardTitle>Difficulty Mode</CardTitle>
                                </div>
                                <CardDescription>How much pain do you want to feel when you fail?</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-4">
                                <div className="grid gap-3">
                                    <div
                                        onClick={() => setDifficulty('sandbox')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'sandbox' ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 size-4 rounded-full border-2 flex items-center justify-center ${difficulty === 'sandbox' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                                                {difficulty === 'sandbox' && <div className="size-1.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">Sandbox</span>
                                                    <Badge variant="secondary" className="text-[10px] uppercase font-black">Relaxed</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">No monetary penalties. Purely educational. Perfect for beginners or rest periods.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setDifficulty('normal')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'normal' ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 size-4 rounded-full border-2 flex items-center justify-center ${difficulty === 'normal' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                                                {difficulty === 'normal' && <div className="size-1.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">Normal</span>
                                                    <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-[10px] uppercase font-black">Recommended</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">You have 3 lives. Miss a challenge, lose a life. Run out of lives, and the automated stock purchases begin.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setDifficulty('hardcore')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'hardcore' ? 'border-destructive bg-destructive/5' : 'border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 size-4 rounded-full border-2 flex items-center justify-center ${difficulty === 'hardcore' ? 'border-destructive bg-destructive' : 'border-muted-foreground'}`}>
                                                {difficulty === 'hardcore' && <div className="size-1.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">Hardcore</span>
                                                    <Badge variant="destructive" className="text-[10px] uppercase font-black">Challenging</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">Zero room for error. Missed challenge triggers a purchase. For the disciplined.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setDifficulty('god')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'god' ? 'border-orange-500 bg-orange-500/5' : 'border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 size-4 rounded-full border-2 flex items-center justify-center ${difficulty === 'god' ? 'border-orange-500 bg-orange-500' : 'border-muted-foreground'}`}>
                                                {difficulty === 'god' && <div className="size-1.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-orange-500">
                                                    <Flame size={14} className="fill-orange-500" />
                                                    <span className="font-bold text-foreground">God Mode</span>
                                                    <Badge className="bg-orange-600 text-white border-none text-[10px] uppercase font-black">Ruthless</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">No lives. No powerups. Every failure is a direct penalty. The ultimate elite discipline.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status Sections: Zerodha and Accountability */}
                        <div className="grid gap-4 lg:grid-rows-2">
                            {/* Section 1: Zerodha Integration */}
                            <Card className="group overflow-hidden relative border-emerald-500/10">
                                <CardHeader className="border-b border-emerald-500/5 bg-emerald-500/[0.02]">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="text-emerald-500 size-4" />
                                        <CardTitle className="text-base">Financial Integration</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Kite Wallet Balance</span>
                                            <h3 className="text-3xl font-black font-mono tracking-tighter text-emerald-500">
                                                {loading ? 'Rs --' : `Rs ${availableMargin.toLocaleString('en-IN')}`}
                                            </h3>
                                        </div>
                                        <Badge variant="outline" className={`font-bold ${loading ? 'opacity-50' : margins ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-amber-500 border-amber-500/20'}`}>
                                            {loading ? 'Syncing...' : margins ? 'Kite Linked' : 'Not Linked'}
                                        </Badge>
                                    </div>

                                    <div className="grid pt-2">
                                        <Button
                                            size="sm"
                                            className="h-full cursor-pointer p-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold gap-1 mt-auto"
                                            onClick={() => window.open('https://kite.zerodha.com/funds', '_blank')}
                                        >
                                            Add Funds
                                            <ExternalLink size={12} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Section 2: Accountability (Lives & Powerups) */}
                            <Card className="relative overflow-hidden border-primary/10">
                                <CardHeader className="border-b border-primary/5 bg-primary/[0.01]">
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert className="text-primary size-4" />
                                        <CardTitle className="text-base">Accountability Stats</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    {/* Lives Part */}
                                    <div className="space-y-3">
                                        <div className="flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Lives</span>
                                                <span className="text-3xl font-black font-mono tracking-tighter">
                                                    {loading ? '--' : stats?.lives ?? 0}
                                                </span>
                                            </div>
                                            <div className="flex gap-0.5 pb-1">
                                                {[...Array(stats?.difficulty_mode === 'normal' ? 5 : 1)].map((_, i) => (
                                                    <Heart
                                                        key={i}
                                                        size={12}
                                                        className={`${i < (stats?.lives ?? 0) ? 'fill-red-500 text-red-500' : 'text-muted-foreground/20'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[9px] uppercase font-bold">
                                                <span className="text-muted-foreground">Recovery</span>
                                                <span className="text-primary">{stats?.problems_since_last_life ?? 0}/7 Solved</span>
                                            </div>
                                            <Progress value={((stats?.problems_since_last_life ?? 0) / 7) * 100} className="h-1.5" />
                                        </div>
                                    </div>

                                    {/* Powerups Part */}
                                    <div className="space-y-3 border-l border-white/5 pl-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Daily Powerups</span>
                                            <div className="flex items-center justify-between">
                                                <span className="text-3xl font-black font-mono tracking-tighter">
                                                    {loading ? '--' : stats?.powerups_used_today ?? 0}
                                                </span>
                                                <Badge variant="outline" className={`h-5 text-[10px] font-bold ${(stats?.powerups_used_today ?? 0) >= (difficulty === 'hardcore' ? 1 : 99) ? 'text-red-500 border-red-500/20 bg-red-500/5' : 'text-amber-500 border-amber-500/20 bg-amber-500/5'}`}>
                                                    {difficulty === 'hardcore' ? `Limit: 1` : `Daily Used`}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-secondary/20 p-1.5 rounded border border-white/5">
                                            <Sparkles size={12} className="text-amber-500" />
                                            <span>
                                                {difficulty === 'hardcore' ? "Limit: 1/24h" : "Uncapped"}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stock Picker */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Zap className="text-amber-500 size-5" />
                                    <CardTitle>Penny Stock Wall selection</CardTitle>
                                </div>
                                <CardDescription>Choose the primary stock to be purchased when you fail a challenge.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {pennyStocks.map((stock) => (
                                        <div
                                            key={stock.ticker}
                                            onClick={() => setSelectedStock(stock.ticker)}
                                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${selectedStock === stock.ticker ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/10'}`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-lg font-black tracking-tighter">{stock.ticker}</span>
                                                <Badge variant="outline" className="text-[10px] px-1">{stock.volatility}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-3">{stock.name}</p>
                                            <div className="text-sm font-bold font-mono">{stock.price}</div>

                                            {selectedStock === stock.ticker && (
                                                <div className="absolute bottom-4 right-4 text-primary">
                                                    <Check size={20} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 pt-6 bg-primary/5">
                                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase text-muted-foreground">Active Policy</span>
                                        <p className="text-sm font-medium">Buying <span className="text-primary font-bold">{selectedStock}</span> on failure</p>
                                    </div>
                                    <Button
                                        className="font-bold px-8"
                                        onClick={handleSave}
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Configuration"}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}
