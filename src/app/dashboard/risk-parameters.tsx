import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Info, ShieldAlert, Zap, TrendingUp, ExternalLink } from "lucide-react"
import { useState } from "react"

const pennyStocks = [
    { ticker: "SUZELON", name: "Suzlon Energy", price: "Rs 42.50", volatility: "High" },
    { ticker: "IDEA", name: "Vodafone Idea", price: "Rs 13.20", volatility: "Extreme" },
    { ticker: "YESBANK", name: "Yes Bank Ltd.", price: "Rs 24.15", volatility: "Medium" },
    { ticker: "ZOMATO", name: "Zomato Ltd.", price: "Rs 185.00", volatility: "High" }, // Not exactly penny but volatile
    { ticker: "JPPOWER", name: "JP Power Ventures", price: "Rs 18.90", volatility: "High" },
    { ticker: "UCOBANK", name: "UCO Bank", price: "Rs 52.10", volatility: "Medium" },
];

export default function RiskParameters() {
    const [difficulty, setDifficulty] = useState("normal");
    const [selectedStock, setSelectedStock] = useState("SUZELON");

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 w-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">The Stakes</h1>
                        <p className="text-muted-foreground">Configure your accountability level. High risk, high discipline.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Difficulty Selection */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="text-primary size-5" />
                                    <CardTitle>Difficulty Mode</CardTitle>
                                </div>
                                <CardDescription>How much pain do you want to feel when you fail?</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="grid gap-4">
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
                                                    <Badge variant="destructive" className="text-[10px] uppercase font-black">Ruthless</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">Zero room for error. Every single missed challenge triggers a penalty purchase. For the disciplined only.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Zerodha Connectivity */}
                        <Card className="flex flex-col group overflow-hidden relative">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-emerald-500 size-5" />
                                    <CardTitle>Zerodha Integration</CardTitle>
                                </div>
                                <CardDescription>Monitor your funds and ensure your account is capitalised.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-6">
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-emerald-500">Kite Wallet Status</span>
                                        <Badge variant="outline" className="text-emerald-500 border-emerald-500/20">Active</Badge>
                                    </div>
                                    <h3 className="text-2xl font-black font-mono tracking-tighter">Rs 12,450.00</h3>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Available Margin</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-white/5">
                                        <Info className="size-4 mt-0.5 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground italic">"I recommend keeping at least Rs 500 spare to handle automated penalty executions without failure." - Valeron</p>
                                    </div>

                                    <Button
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
                                        onClick={() => window.open('https://kite.zerodha.com/funds', '_blank')}
                                    >
                                        Add Funds via Kite Connect
                                        <ExternalLink size={16} />
                                    </Button>
                                    <p className="text-[10px] text-center text-muted-foreground">This button deep-links you directly to your Kite Funds interface.</p>
                                </div>
                            </CardContent>
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap size={80} />
                            </div>
                        </Card>

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
                                    <Button className="font-bold px-8">Save Configuration</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
