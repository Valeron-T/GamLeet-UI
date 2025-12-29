import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { CartesianGrid, XAxis, YAxis, Area, AreaChart, Pie, PieChart, LabelList, Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconAlertTriangle, IconHistory, IconTarget, IconBrain } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { ComingSoonOverlay } from "@/components/coming-soon-overlay.tsx"

const difficultyData = [
    { complexity: "easy", value: 45, fill: "var(--color-easy)" },
    { complexity: "medium", value: 35, fill: "var(--color-medium)" },
    { complexity: "hard", value: 20, fill: "var(--color-hard)" },
];

const cumulativeLossData = [
    { date: "2024-03-01", loss: 0 },
    { date: "2024-03-05", loss: 100 },
    { date: "2024-03-10", loss: 100 },
    { date: "2024-03-15", loss: 250 },
    { date: "2024-03-20", loss: 300 },
    { date: "2024-03-25", loss: 300 },
    { date: "2024-04-01", loss: 400 },
    { date: "2024-04-05", loss: 500 },
    { date: "2024-04-10", loss: 600 },
    { date: "2024-04-15", loss: 750 },
];

const skillData = [
    { subject: "Arrays", A: 120, fullMark: 150 },
    { subject: "Strings", A: 98, fullMark: 150 },
    { subject: "DP", A: 86, fullMark: 150 },
    { subject: "Trees", A: 99, fullMark: 150 },
    { subject: "Graphs", A: 85, fullMark: 150 },
    { subject: "Math", A: 65, fullMark: 150 },
];

const stockHistory = [
    { id: 1, date: "2024-04-14", ticker: "SUZELON", amount: 100, reason: "Missed Daily Challenge", impact: "High" },
    { id: 2, date: "2024-04-07", ticker: "ZOMATO", amount: 100, reason: "Incomplete Weekly Goal", impact: "Medium" },
    { id: 3, date: "2024-04-03", ticker: "YESBANK", amount: 100, reason: "Zero Progress Day", impact: "Low" },
    { id: 4, date: "2024-03-28", ticker: "IDEA", amount: 50, reason: "Late Submission", impact: "Low" },
    { id: 5, date: "2024-03-21", ticker: "JPPOWER", amount: 150, reason: "Missed 3-day Streak", impact: "Critical" },
];

const difficultyConfig = {
    easy: { label: "Easy", color: "var(--chart-1)" },
    medium: { label: "Medium", color: "var(--chart-2)" },
    hard: { label: "Hard", color: "var(--chart-3)" },
} satisfies ChartConfig

const lossConfig = {
    loss: {
        label: "Cumulative Loss (Rs)",
        color: "var(--destructive)",
    },
} satisfies ChartConfig

const skillConfig = {
    A: {
        label: "Skill Level",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export default function Analytics() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-64" />
                                <Skeleton className="h-4 w-96" />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="h-[350px] animate-pulse bg-card/50" />
                            <Card className="lg:col-span-2 h-[350px] animate-pulse bg-card/50" />
                            <Card className="h-[350px] animate-pulse bg-card/50" />
                            <Card className="lg:col-span-2 h-[350px] animate-pulse bg-card/50" />
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
                <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 relative">
                    <ComingSoonOverlay
                        title="Analytics Locked"
                        description="Deep behavioral insights and portfolio impact metrics are currently being calibrated. Stay tuned for the data drop."
                    />
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
                            <p className="text-muted-foreground">Unique insights into your coding discipline and financial accountability.</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="flex flex-col bg-gradient-to-br from-card to-card/50 border-border/50 transition-all duration-300 hover:border-primary/20">
                            <CardHeader className="items-center pb-0">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <IconTarget size={20} className="text-primary" />
                                    Difficulty Breakdown
                                </CardTitle>
                                <CardDescription>Solves by complexity level</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer config={difficultyConfig} className="mx-auto aspect-square max-h-[250px]">
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Pie
                                            data={difficultyData}
                                            dataKey="value"
                                            nameKey="complexity"
                                            innerRadius={60}
                                            strokeWidth={5}
                                        >
                                            <LabelList
                                                dataKey="complexity"
                                                className="fill-foreground text-[10px] font-bold uppercase"
                                                stroke="none"
                                                position="outside"
                                                formatter={(value: string) => difficultyConfig[value as keyof typeof difficultyConfig]?.label}
                                            />
                                        </Pie>
                                        <ChartLegend content={<ChartLegendContent nameKey="complexity" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border/50 transition-all duration-300 hover:border-destructive/20 shadow-2xl shadow-destructive/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl text-destructive">
                                    <IconAlertTriangle size={20} />
                                    Cumulative Financial Ruin
                                </CardTitle>
                                <CardDescription>Total spend on penny stocks over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={lossConfig} className="h-[250px] w-full">
                                    <AreaChart data={cumulativeLossData}>
                                        <defs>
                                            <linearGradient id="fillLoss" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-loss)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--color-loss)" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            className="text-[10px] font-bold uppercase fill-muted-foreground"
                                        />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-[10px] font-bold fill-muted-foreground" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area
                                            type="stepAfter"
                                            dataKey="loss"
                                            stroke="var(--color-loss)"
                                            strokeWidth={3}
                                            fill="url(#fillLoss)"
                                            dot={{ r: 4, fill: "var(--color-loss)", strokeWidth: 2, stroke: "var(--card)" }}
                                            activeDot={{ r: 6, strokeWidth: 0 }}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-1 bg-gradient-to-br from-card to-card/50 border-border/50 transition-all duration-300 hover:border-primary/20">
                            <CardHeader className="items-center pb-0">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <IconBrain size={20} className="text-primary" />
                                    Skill Radar
                                </CardTitle>
                                <CardDescription>Topic mastery distribution</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-0">
                                <ChartContainer config={skillConfig} className="mx-auto aspect-square max-h-[250px]">
                                    <RadarChart data={skillData}>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <PolarGrid className="fill-[--color-A] opacity-10 stroke-border" />
                                        <PolarAngleAxis dataKey="subject" className="text-[10px] font-bold uppercase fill-muted-foreground" />
                                        <Radar
                                            dataKey="A"
                                            fill="var(--color-A)"
                                            fillOpacity={0.5}
                                            stroke="var(--color-A)"
                                            strokeWidth={2}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border/50 transition-all duration-300 group overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <IconHistory size={20} className="text-primary" />
                                    Penny Stock Wall of Shame
                                </CardTitle>
                                <CardDescription>A record of every stock bought because you didn't grind hard enough.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px] overflow-auto scrollbar-hide">
                                    <Table>
                                        <TableHeader className="bg-muted/50 sticky top-0 z-10">
                                            <TableRow className="border-border/50 hover:bg-transparent">
                                                <TableHead className="text-[10px] uppercase font-black tracking-widest">Date</TableHead>
                                                <TableHead className="text-[10px] uppercase font-black tracking-widest">Ticker</TableHead>
                                                <TableHead className="text-[10px] uppercase font-black tracking-widest">Ruins</TableHead>
                                                <TableHead className="text-[10px] uppercase font-black tracking-widest">Reason</TableHead>
                                                <TableHead className="text-right text-[10px] uppercase font-black tracking-widest">Impact</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stockHistory.map((stock) => (
                                                <TableRow key={stock.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                                                    <TableCell className="font-mono text-xs opacity-50">{stock.date}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="font-black text-[10px] px-2 py-0.5 border-primary/20 bg-primary/5 text-primary">
                                                            {stock.ticker}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-destructive font-black font-mono text-sm">
                                                        -{stock.amount}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-[10px] italic leading-tight max-w-[150px] truncate">{stock.reason}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Badge
                                                            variant={stock.impact === "Critical" ? "destructive" : "secondary"}
                                                            className={`${stock.impact === "High" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : ""} text-[9px] uppercase font-black tracking-tighter px-1.5`}
                                                        >
                                                            {stock.impact}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
