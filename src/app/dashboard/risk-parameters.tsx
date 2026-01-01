import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, TrendingUp, ExternalLink, Heart, Sparkles, Flame, Shuffle, Lock, Unlock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { fetchUserMargins, updateDifficulty } from "@/api/dashboard"
import { toast } from "sonner"
import { useStats } from "@/contexts/StatsContext"

export default function RiskParameters() {
    const { stats, refreshStats } = useStats()
    const [difficulty, setDifficulty] = useState("");
    const [margins, setMargins] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Risk Configuration State
    const [riskAmount, setRiskAmount] = useState<string>("50");
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        async function loadInitialData() {
            try {
                const marginData = await fetchUserMargins();
                setMargins(marginData);
                if (stats) {
                    if (stats.difficulty_mode) setDifficulty(stats.difficulty_mode);
                    if (stats.daily_risk_amount) setRiskAmount(stats.daily_risk_amount.toString());
                    // Use a safe check for risk_locked as it might be undefined in older cached stats
                    setLocked(!!stats.risk_locked);
                }
            } catch (error) {
                console.error("Failed to fetch margins:", error);
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, [stats]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateDifficulty(difficulty, parseInt(riskAmount) || 50, locked);
            await refreshStats();
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
                        {/* Difficulty Selection */}
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
                                        onClick={() => !locked && setDifficulty('sandbox')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'sandbox' ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/10'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                        onClick={() => !locked && setDifficulty('normal')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'normal' ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/10'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                        onClick={() => !locked && setDifficulty('hardcore')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'hardcore' ? 'border-destructive bg-destructive/5' : 'border-white/5 hover:border-white/10'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                        onClick={() => !locked && setDifficulty('god')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${difficulty === 'god' ? 'border-orange-500 bg-orange-500/5' : 'border-white/5 hover:border-white/10'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
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

                        {/* Risk Configuration Card */}
                        <Card className="md:col-span-2 border-amber-500/20 overflow-hidden p-0 gap-0">
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-2">
                                    <Shuffle className="text-amber-500 size-5" />
                                    <CardTitle>Daily Risk Configuration</CardTitle>
                                </div>
                                <CardDescription>Stock selection is randomized by our backend. You control the risk.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 px-6 pb-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="risk-amount">Max Risk Per Day (₹)</Label>
                                        <Input
                                            id="risk-amount"
                                            placeholder="50"
                                            type="number"
                                            min="0"
                                            value={riskAmount}
                                            onChange={(e) => setRiskAmount(e.target.value)}
                                            disabled={locked || loading}
                                            className="font-mono"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Equivalent to approx. {Math.floor((parseInt(riskAmount) || 0) / 45)} shares of SUZLON or {Math.floor((parseInt(riskAmount) || 0) / 13)} shares of IDEA.
                                        </p>
                                    </div>

                                    <div className="flex flex-col justify-end">
                                        <div className="flex items-center space-x-2 rounded-lg border p-4 bg-muted/50">
                                            <Switch
                                                id="lock-mode"
                                                checked={locked}
                                                onCheckedChange={setLocked}
                                                disabled={!!stats?.risk_locked}
                                            />
                                            <div className="flex-1 space-y-1">
                                                <Label htmlFor="lock-mode" className="flex items-center gap-2">
                                                    {locked ? <Lock size={14} className="text-amber-500" /> : <Unlock size={14} />}
                                                    Lock In Configuration
                                                </Label>
                                                <p className="text-[10px] text-muted-foreground">
                                                    {!!stats?.risk_locked
                                                        ? "Configuration is locked for today."
                                                        : "Once locked and saved, you cannot change settings for today."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 p-6 bg-primary/5">
                                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase text-muted-foreground">Active Policy</span>
                                        <p className="text-sm font-medium">Buying <span className="text-primary font-bold">random penny stocks</span> up to <span className="text-primary font-bold">₹{riskAmount}</span> on failure</p>
                                    </div>
                                    <Button
                                        className="font-bold px-8"
                                        onClick={handleSave}
                                        disabled={saving || (locked && stats?.risk_locked)} // Disable save if already saved as locked? Or allow save to just verify? Let's leave enabled but locked inputs
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
