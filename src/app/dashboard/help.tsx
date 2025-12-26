import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { IconLifebuoy, IconRocket, IconShieldCheck, IconCoins, IconTrophy } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

const faqs = [
    {
        question: "How do GamCoins work?",
        answer: "GamCoins (GC) are the primary currency of GamLeet. You earn them by solving LeetCode problems (Easy: 10 GC, Medium: 25 GC, Hard: 50 GC). You can use them in the Powerup Store to buy items like Streak Freezes or Penalty Shields."
    },
    {
        question: "What happens if I miss a day?",
        answer: "If you don't solve at least one problem daily, the Enforcer system triggers a penalty. This usually involves an automated stock purchase on your linked brokerage account. Use a 'Streak Freeze' from the store to protect yourself!"
    },
    {
        question: "How does the leveling system work?",
        answer: "Every problem you solve grants XP. You gain 50 XP for Easy, 100 XP for Medium, and 200 XP for Hard problems. Each 100 XP gained increases your global level, which is displayed in the top navbar."
    },
    {
        question: "Can I refund a Powerup?",
        answer: "All purchases in the Powerup Store are final. GamLeet items are non-refundable to maintain the high-stakes environment of the platform."
    }
];

export default function Help() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 max-w-5xl mx-auto w-full">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center gap-4 py-8">
                        <div className="p-4 rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-xl shadow-primary/5 animate-pulse">
                            <IconLifebuoy size={48} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                            Support Terminal
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl font-medium">
                            Welcome to the GamLeet Command Center. Everything you need to master the grind and avoid the enforcer's sting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Quick Start Card */}
                        <Card className="md:col-span-2 group relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 transition-all hover:border-primary/30">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                        <IconRocket size={20} />
                                    </div>
                                    <CardTitle>System Overview</CardTitle>
                                </div>
                                <CardDescription>Master the core mechanics of the GamLeet ecosystem.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                                        <IconShieldCheck className="text-primary shrink-0" size={18} />
                                        <span>Solve 1 problem daily to satisfy the enforcer.</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                                        <IconCoins className="text-amber-500 shrink-0" size={18} />
                                        <span>Earn GC to spend in the tactical powerup store.</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                                        <IconTrophy className="text-blue-400 shrink-0" size={18} />
                                        <span>Climb levels to showcase your coding dominance.</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                                        <IconLifebuoy className="text-primary shrink-0" size={18} />
                                        <span>Check logs daily to ensure systems are synced.</span>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
                        </Card>

                        {/* Status Card */}
                        <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-[0.2em] font-black text-muted-foreground">Current Status</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-50">
                                        <span>Enforcer Sync</span>
                                        <Badge variant="outline" className="text-[9px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">ACTIVE</Badge>
                                    </div>
                                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden text-clip">
                                        <div className="h-full w-full bg-emerald-500 animate-[loading-bar_3s_ease-in-out_infinite]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-50">
                                        <span>API Latency</span>
                                        <span className="text-primary">24ms</span>
                                    </div>
                                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-primary" />
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-border/50">
                                    <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                                        Terminal v1.0.4. Systems operational. All penalties are FINAL.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold tracking-tight">Technical Directives (FAQ)</h2>
                            <Separator className="flex-1 opacity-50" />
                        </div>

                        <Card className="border-border/50 bg-gradient-to-b from-card to-card/50 px-6 py-2">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-border/50 last:border-0">
                                        <AccordionTrigger className="text-sm font-bold hover:no-underline hover:text-primary transition-colors py-4">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed font-medium pb-6 text-sm">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Card>
                    </div>

                    {/* Footer Call to Action */}
                    <div className="mt-8 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-xl font-bold">Still Need Assistance?</h3>
                            <p className="text-muted-foreground max-w-md font-medium text-sm mt-1">Join our tactical discord or report an anomaly on GitHub if you encounter any system disruptions.</p>
                        </div>
                        <div className="flex gap-4 relative z-10">
                            <button className="px-6 py-3 rounded-xl bg-foreground text-background font-black uppercase tracking-widest text-xs transition-transform hover:scale-105 active:scale-95">
                                Discord
                            </button>
                            <button className="px-6 py-3 rounded-xl border border-border bg-card/50 font-black uppercase tracking-widest text-xs transition-all hover:border-primary/50 hover:text-primary">
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
