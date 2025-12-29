import { AppSidebar } from "@/components/app-sidebar.tsx"
import { SiteHeader } from "@/components/site-header.tsx"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Check, Search, ExternalLink, BookOpen, Sparkles, List, ChevronDown, ChevronRight, X, Filter } from "lucide-react"
import {
    fetchAllProblems,
    fetchTopics,
    fetchNeetCode150,
    fetchProblemSetPreference,
    updateProblemSetPreference,
    type Problem,
    type NeetCode150Response,
    type NeetCodeProblem,
    type ProblemSetPreference
} from "@/api/problems"

const difficultyColors: Record<string, string> = {
    Easy: "bg-green-500/20 text-green-400 border-green-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Hard: "bg-red-500/20 text-red-400 border-red-500/30",
}

export default function ProblemSets() {
    const [activeTab, setActiveTab] = useState<"sets" | "browser">("sets")
    const [preference, setPreference] = useState<ProblemSetPreference | null>(null)
    const [neetcode, setNeetcode] = useState<NeetCode150Response | null>(null)
    const [allProblems, setAllProblems] = useState<Problem[]>([])
    const [topics, setTopics] = useState<string[]>([])
    const [selectedTopics, setSelectedTopics] = useState<string[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [loadingProblems, setLoadingProblems] = useState(false)
    const [saving, setSaving] = useState(false)
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProblems, setTotalProblems] = useState(0)

    // Filter states
    const [filterDifficulty, setFilterDifficulty] = useState<string>("all")
    const [filterTopic, setFilterTopic] = useState<string>("all")

    useEffect(() => {
        loadInitialData()
    }, [])

    async function loadInitialData() {
        setLoading(true)
        try {
            const [pref, topicsData] = await Promise.all([
                fetchProblemSetPreference(),
                fetchTopics()
            ])
            setPreference(pref)
            setTopics(topicsData.topics || [])
            if (pref.topics) {
                setSelectedTopics(pref.topics)
            }
        } catch (err) {
            console.error("Failed to load initial data:", err)
        } finally {
            setLoading(false)
        }
    }

    async function loadNeetCode() {
        if (!neetcode) {
            try {
                const data = await fetchNeetCode150()
                setNeetcode(data)
                const firstCategory = Object.keys(data.categories)[0]
                if (firstCategory) {
                    setExpandedCategories(new Set([firstCategory]))
                }
            } catch (err) {
                console.error("Failed to load NeetCode 150:", err)
            }
        }
    }

    async function loadProblems(pageNum = 1, resetFilters = false) {
        setLoadingProblems(true)
        try {
            const difficulty = resetFilters ? undefined : (filterDifficulty !== "all" ? filterDifficulty : undefined)
            const topic = resetFilters ? undefined : (filterTopic !== "all" ? filterTopic : undefined)
            const data = await fetchAllProblems(pageNum, 50, difficulty, topic, search || undefined)
            setAllProblems(data.problems)
            setTotalPages(data.pages)
            setTotalProblems(data.total)
            setPage(pageNum)
        } catch (err) {
            console.error("Failed to load problems:", err)
        } finally {
            setLoadingProblems(false)
        }
    }

    async function selectSet(type: "default" | "sheet" | "topics", value?: string) {
        setSaving(true)
        try {
            if (type === "topics") {
                await updateProblemSetPreference({ type, topics: selectedTopics })
            } else if (type === "sheet") {
                await updateProblemSetPreference({ type, sheet: value || "neetcode150" })
            } else {
                await updateProblemSetPreference({ type })
            }
            const pref = await fetchProblemSetPreference()
            setPreference(pref)
            toast.success(`Problem set updated to ${type === "default" ? "Default" : type === "sheet" ? "NeetCode 150" : "Custom Topics"}`)
        } catch (err) {
            toast.error("Failed to update problem set preference")
        } finally {
            setSaving(false)
        }
    }

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(category)) {
            newExpanded.delete(category)
        } else {
            newExpanded.add(category)
        }
        setExpandedCategories(newExpanded)
    }

    const toggleTopic = (topic: string) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        )
    }

    const clearFilters = () => {
        setFilterDifficulty("all")
        setFilterTopic("all")
        setSearch("")
        loadProblems(1, true)
    }

    const hasActiveFilters = filterDifficulty !== "all" || filterTopic !== "all" || search !== ""

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-6">
                    <div className="max-w-6xl mx-auto w-full space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Problem Sets</h1>
                            <p className="text-muted-foreground mt-1">
                                Choose your daily problem source from curated lists or custom topics.
                            </p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex gap-2 border-b border-border/50 pb-2">
                            <Button
                                variant={activeTab === "sets" ? "default" : "ghost"}
                                onClick={() => setActiveTab("sets")}
                                className="gap-2"
                            >
                                <Sparkles size={16} />
                                Problem Sets
                            </Button>
                            <Button
                                variant={activeTab === "browser" ? "default" : "ghost"}
                                onClick={() => {
                                    setActiveTab("browser")
                                    if (allProblems.length === 0) loadProblems()
                                }}
                                className="gap-2"
                            >
                                <List size={16} />
                                Browse All
                            </Button>
                        </div>

                        {loading ? (
                            <div className="grid gap-4 md:grid-cols-3">
                                {[1, 2, 3].map(i => (
                                    <Skeleton key={i} className="h-48 rounded-xl" />
                                ))}
                            </div>
                        ) : activeTab === "sets" ? (
                            <div className="space-y-6">
                                {/* Problem Set Cards */}
                                <div className="grid gap-4 md:grid-cols-3">
                                    {/* Default Set */}
                                    <Card
                                        className={`cursor-pointer transition-all hover:border-primary/50 shadow-sm ${preference?.type === "default" ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border/50 bg-card hover:bg-muted/30"
                                            }`}
                                        onClick={() => selectSet("default")}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <BookOpen size={20} className="text-primary" />
                                                    Default
                                                </CardTitle>
                                                {preference?.type === "default" && (
                                                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                                                        <Check size={12} className="mr-1" /> Active
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardDescription>
                                                Random problems from all LeetCode questions, one per difficulty level.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm font-medium text-muted-foreground">3,000+ problems available</p>
                                        </CardContent>
                                    </Card>

                                    {/* NeetCode 150 */}
                                    <Card
                                        className={`cursor-pointer transition-all hover:border-primary/50 shadow-sm ${preference?.type === "sheet" && preference?.sheet === "neetcode150"
                                            ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                                            : "border-border/50 bg-card hover:bg-muted/30"
                                            }`}
                                        onClick={() => {
                                            selectSet("sheet", "neetcode150")
                                            loadNeetCode()
                                        }}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <Sparkles size={20} className="text-yellow-500" />
                                                    NeetCode 150
                                                </CardTitle>
                                                {preference?.type === "sheet" && preference?.sheet === "neetcode150" && (
                                                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                                                        <Check size={12} className="mr-1" /> Active
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardDescription>
                                                Curated list of 150 essential LeetCode problems for interviews.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm font-medium text-muted-foreground">150 curated problems</p>
                                        </CardContent>
                                    </Card>

                                    {/* Custom Topics */}
                                    <Card
                                        className={`cursor-pointer transition-all hover:border-primary/50 shadow-sm ${preference?.type === "topics" ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border/50 bg-card hover:bg-muted/30"
                                            }`}
                                        onClick={() => {
                                            if (selectedTopics.length > 0) {
                                                selectSet("topics")
                                            } else {
                                                toast.info("Select topics below first")
                                            }
                                        }}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <List size={20} className="text-blue-500" />
                                                    Custom Topics
                                                </CardTitle>
                                                {preference?.type === "topics" && (
                                                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                                                        <Check size={12} className="mr-1" /> Active
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardDescription>
                                                Practice problems from specific topics you choose.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {selectedTopics.length > 0
                                                    ? `${selectedTopics.length} topics selected`
                                                    : "Select topics below to customize"
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Topic Selector (for Custom Topics) */}
                                <Card className="border-border/50 shadow-sm overflow-hidden">
                                    <CardHeader className="bg-muted/20 pb-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Filter size={18} className="text-muted-foreground" />
                                            Topic Interests
                                        </CardTitle>
                                        <CardDescription>
                                            Refine your daily challenge by selecting topics you want to master.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-6">
                                        <div className="flex flex-wrap gap-2">
                                            {topics.map(topic => (
                                                <Badge
                                                    key={topic}
                                                    variant="outline"
                                                    className={`cursor-pointer py-1 px-3 transition-all rounded-full border shadow-none ${selectedTopics.includes(topic)
                                                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                                                        : "hover:bg-muted hover:border-muted-foreground/30 text-muted-foreground"
                                                        }`}
                                                    onClick={() => toggleTopic(topic)}
                                                >
                                                    {selectedTopics.includes(topic) && <Check size={12} className="mr-1.5" />}
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>
                                        {selectedTopics.length > 0 && preference?.type !== "topics" && (
                                            <Button
                                                className="mt-6 shadow-md"
                                                onClick={() => selectSet("topics")}
                                                disabled={saving}
                                            >
                                                <Sparkles size={16} className="mr-2" />
                                                Activate Custom Selection
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* NeetCode 150 Preview */}
                                {(preference?.type === "sheet" && preference?.sheet === "neetcode150" && neetcode) && (
                                    <Card className="border-border/50 shadow-sm overflow-hidden">
                                        <CardHeader className="bg-muted/20 pb-6 border-b border-border/30">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-lg">Roadmap Progress</CardTitle>
                                                    <CardDescription>Your journey through the NeetCode 150</CardDescription>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1 rounded-full text-sm font-bold shadow-none">
                                                        {neetcode.stats.completed} / {neetcode.stats.total} COMPLETED
                                                    </Badge>
                                                    <span className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase">{neetcode.stats.percentage}% TOTAL</span>
                                                </div>
                                            </div>
                                            {/* Minimal Progress Bar */}
                                            <div className="mt-4 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 transition-all duration-500"
                                                    style={{ width: `${neetcode.stats.percentage}%` }}
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0 max-h-[500px] overflow-y-auto">
                                            <div className="divide-y divide-border/20">
                                                {(Object.entries(neetcode.categories) as [string, NeetCodeProblem[]][]).map(([category, problems]) => (
                                                    <div key={category} className="group">
                                                        <button
                                                            onClick={() => toggleCategory(category)}
                                                            className="w-full flex items-center justify-between p-4 px-6 hover:bg-muted/40 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`p-1 rounded-md ${expandedCategories.has(category) ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                                                                    {expandedCategories.has(category) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                                </div>
                                                                <span className="font-semibold text-[15px]">{category}</span>
                                                                <Badge variant="secondary" className="bg-muted/50 text-[10px] h-5 px-1.5 border-none font-medium ml-2">
                                                                    {problems.length}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                                                                        <div
                                                                            className="h-full bg-primary"
                                                                            style={{ width: `${(problems.filter(p => p.completed).length / problems.length) * 100}%` }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-[12px] font-mono font-medium text-muted-foreground whitespace-nowrap">
                                                                        {problems.filter(p => p.completed).length} / {problems.length}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </button>
                                                        {expandedCategories.has(category) && (
                                                            <div className="bg-muted/10 border-t border-border/10">
                                                                {problems.map(problem => (
                                                                    <a
                                                                        key={problem.slug}
                                                                        href={problem.leetcode_url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center justify-between py-3 px-12 hover:bg-muted/50 transition-colors group/row"
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            {problem.completed ? (
                                                                                <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center text-green-500">
                                                                                    <Check size={12} strokeWidth={3} />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="w-5 h-5 rounded-full border border-muted-foreground/30 border-dashed" />
                                                                            )}
                                                                            <span className={`text-[14px] font-medium ${problem.completed ? "text-muted-foreground" : "text-foreground"}`}>
                                                                                {problem.title}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={`text-[10px] px-2 py-0 h-5 rounded-full shadow-none ${difficultyColors[problem.difficulty] || ""}`}
                                                                            >
                                                                                {problem.difficulty}
                                                                            </Badge>
                                                                            <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover/row:opacity-100 transition-opacity" />
                                                                        </div>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            /* Problem Browser Tab with Enhanced Filters */
                            <div className="space-y-6">
                                {/* Filters Row */}
                                <CardContent className="">
                                    <div className="flex flex-wrap items-center gap-4">
                                        {/* Search */}
                                        <div className="relative flex-1 min-w-[240px]">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                            <Input
                                                placeholder="Find problems by title..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && loadProblems(1)}
                                                className="pl-10 h-10 border-border/50 focus-visible:ring-primary/20 transition-all font-medium"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                                            {/* Difficulty Filter */}
                                            <Select value={filterDifficulty} onValueChange={(val) => setFilterDifficulty(val)}>
                                                <SelectTrigger className="w-[140px] h-10 border-border/50 font-medium">
                                                    <SelectValue placeholder="Difficulty" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Levels</SelectItem>
                                                    <SelectItem value="Easy">Easy</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Hard">Hard</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {/* Topic Filter */}
                                            <Select value={filterTopic} onValueChange={(val) => setFilterTopic(val)}>
                                                <SelectTrigger className="w-[180px] h-10 border-border/50 font-medium">
                                                    <SelectValue placeholder="All Topics" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Categories</SelectItem>
                                                    {topics.slice(0, 40).map(topic => (
                                                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            {/* Apply & Clear Buttons */}
                                            <Button onClick={() => loadProblems(1)} size="sm" className="h-10 px-6 font-semibold shadow-md active:scale-95 transition-transform">
                                                Filter
                                            </Button>

                                            {hasActiveFilters && (
                                                <Button variant="ghost" size="icon" onClick={clearFilters} className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted" title="Clear Filters">
                                                    <X size={18} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>

                                {/* Results Info */}
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted font-mono tracking-tight text-[11px] h-6 px-2">
                                            {loadingProblems ? "FETCHING..." : `${totalProblems.toLocaleString()} MATCHES`}
                                        </Badge>
                                        {hasActiveFilters && (
                                            <span className="text-[11px] font-bold text-primary tracking-widest uppercase">FILTER ENABLED</span>
                                        )}
                                    </div>
                                    {loadingProblems && <Skeleton className="h-4 w-24 rounded-full" />}
                                </div>

                                {/* Problem Table View */}
                                <div className="space-y-4">
                                    {loadingProblems ? (
                                        <div className="grid gap-4">
                                            {[1, 2, 3, 4, 5, 6].map(i => (
                                                <div key={i} className="bg-card border border-border/30 p-4 rounded-xl flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                                        <div className="space-y-2 flex-1">
                                                            <Skeleton className="h-4 w-1/3" />
                                                            <Skeleton className="h-3 w-1/6" />
                                                        </div>
                                                    </div>
                                                    <Skeleton className="h-6 w-20 rounded-full" />
                                                    <div className="flex gap-2 hidden md:flex">
                                                        <Skeleton className="h-5 w-16" />
                                                        <Skeleton className="h-5 w-16" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : allProblems.length === 0 ? (
                                        <Card className="border-border/50 border-dashed bg-muted/10 py-20 shadow-none">
                                            <CardContent className="flex flex-col items-center text-center space-y-4">
                                                <div className="p-6 rounded-full bg-muted/40 text-muted-foreground">
                                                    <Search size={40} strokeWidth={1.5} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-bold">No matches found</h3>
                                                    <p className="text-muted-foreground text-sm max-w-sm">
                                                        We couldn't find any challenges matching these parameters.
                                                    </p>
                                                </div>
                                                <Button variant="outline" onClick={clearFilters} className="mt-2 rounded-full border-border/50 hover:bg-card">
                                                    Reset all search filters
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <>
                                            <div className="border border-border/40 rounded-xl overflow-hidden shadow-sm bg-card">
                                                <Table>
                                                    <TableHeader className="bg-muted/30">
                                                        <TableRow className="border-b-border/30 hover:bg-transparent">
                                                            <TableHead className="w-[100px] h-12 uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-6 text-center">Status</TableHead>
                                                            <TableHead className="w-[80px] h-12 uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-4">#ID</TableHead>
                                                            <TableHead className="h-12 uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-4">Challenge</TableHead>
                                                            <TableHead className="w-[140px] h-12 uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-4">Complexity</TableHead>
                                                            <TableHead className="hidden lg:table-cell h-12 uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-4">Keywords</TableHead>
                                                            <TableHead className="w-[80px] h-12 uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-6 text-right">View</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {allProblems.map(problem => (
                                                            <TableRow
                                                                key={problem.id}
                                                                className="group transition-all hover:bg-muted/30 border-b-border/10 last:border-0"
                                                            >
                                                                <TableCell className="px-6 text-center">
                                                                    {problem.completed ? (
                                                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shadow-sm ring-4 ring-green-500/10">
                                                                            <Check size={14} strokeWidth={3} />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border/50 bg-muted/10 text-[10px] font-bold text-muted-foreground" title="Not started">
                                                                            ?
                                                                        </div>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="font-mono text-[12px] text-muted-foreground px-4">
                                                                    {problem.id}
                                                                </TableCell>
                                                                <TableCell className="px-4">
                                                                    <div className="flex flex-col py-1">
                                                                        <span className="font-bold text-[15px] group-hover:text-primary transition-colors leading-snug">
                                                                            {problem.title}
                                                                        </span>
                                                                        <span className="text-[11px] text-muted-foreground font-mono tracking-tight opacity-70">
                                                                            {problem.slug}
                                                                        </span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="px-4">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={`px-3 py-0.5 rounded-full font-bold text-[10px] border tracking-wider shadow-none ${difficultyColors[problem.difficulty] || ""}`}
                                                                    >
                                                                        {problem.difficulty.toUpperCase()}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className="hidden lg:table-cell px-4">
                                                                    <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                                                                        {problem.topics ? problem.topics.split(", ").slice(0, 3).map((topic: string, i: number) => (
                                                                            <Badge
                                                                                key={i}
                                                                                variant="secondary"
                                                                                className="bg-muted hover:bg-muted/80 text-muted-foreground text-[10px] leading-3 h-5 px-2 border-none font-medium capitalize"
                                                                            >
                                                                                {topic.toLowerCase()}
                                                                            </Badge>
                                                                        )) : <span className="text-muted-foreground/30 font-mono text-[10px]">null</span>}
                                                                        {problem.topics && problem.topics.split(", ").length > 3 && (
                                                                            <span className="text-[10px] font-bold text-muted-foreground/40 self-center ml-1">
                                                                                +{problem.topics.split(", ").length - 3}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="px-6 text-right">
                                                                    <Button
                                                                        asChild
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all shadow-sm translate-x-1 group-hover:translate-x-0"
                                                                    >
                                                                        <a
                                                                            href={`https://leetcode.com/problems/${problem.slug}/`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            title="Launch on LeetCode"
                                                                        >
                                                                            <ExternalLink size={14} strokeWidth={2.5} />
                                                                        </a>
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            {/* Advanced Pagination */}
                                            {totalPages > 1 && (
                                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                                    <div className="hidden sm:block">
                                                        <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest">
                                                            PAGE <span className="text-foreground font-black">{page}</span> OF <span className="text-foreground font-black">{totalPages}</span>
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-9 px-4 text-xs font-bold uppercase tracking-widest rounded-lg border-border/50 hover:bg-card transition-all"
                                                            disabled={page === 1 || loadingProblems}
                                                            onClick={() => {
                                                                window.scrollTo({ top: 0, behavior: "smooth" })
                                                                loadProblems(page - 1)
                                                            }}
                                                        >
                                                            <ChevronRight className="mr-1 rotate-180" size={14} /> Back
                                                        </Button>

                                                        {/* Page Indicator Bubble */}
                                                        <div className="flex items-center h-9 px-3 rounded-lg bg-card border border-border/50 shadow-inner">
                                                            <span className="text-[13px] font-black text-primary px-1">{page}</span>
                                                            <span className="text-xs text-muted-foreground/50 mx-1">/</span>
                                                            <span className="text-[13px] font-bold text-muted-foreground px-1">{totalPages}</span>
                                                        </div>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-9 px-4 text-xs font-bold uppercase tracking-widest rounded-lg border-border/50 hover:bg-card transition-all"
                                                            disabled={page === totalPages || loadingProblems}
                                                            onClick={() => {
                                                                window.scrollTo({ top: 0, behavior: "smooth" })
                                                                loadProblems(page + 1)
                                                            }}
                                                        >
                                                            Next <ChevronRight className="ml-1" size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
