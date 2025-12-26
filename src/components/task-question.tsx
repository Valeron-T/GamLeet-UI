import { CheckCircle, Circle, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { RiCopperCoinFill } from "react-icons/ri";
import { TagScroller } from "./tag-scroller";

interface TaskQuestionProps {
    title: string
    slug: string
    tags?: string[]
    state: "unattempted" | "attempted" | "completed"
    difficulty: "easy" | "med" | "hard"
}

const icons = {
    unattempted: <Circle className="text-gray-400" />,
    attempted: <Clock className="text-yellow-500" />,
    completed: <CheckCircle className="text-green-500" />,
};

const difficultyStyle = {
    'easy': 'border-green-500',
    'med': 'border-amber-500',
    'hard': 'border-red-500'
}

const difficultyReward = {
    'easy': 10,
    'med': 25,
    'hard': 50
}

const difficultyXP = {
    'easy': 50,
    'med': 100,
    'hard': 200
}

function TaskQuestion({ title, tags = [], state, slug, difficulty = "easy" }: TaskQuestionProps) {
    return (
        <Item className={difficultyStyle[difficulty]} variant="outline">
            <ItemMedia variant="icon">
                {icons[state]}
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="pb-0.5">{title}</ItemTitle>
                <ItemDescription className="flex items-center gap-2">
                    <TagScroller tags={tags} />
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <div className="flex flex-col items-end gap-1.5 min-w-[80px]">
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-0.5 rounded-md border border-border/50">
                        <RiCopperCoinFill size={14} color="#ffc900" />
                        <span className="text-[10px] font-black font-mono">{difficultyReward[difficulty]} GC</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                        <Zap size={10} className="text-primary fill-primary" />
                        <span className="text-[10px] font-black font-mono text-primary">+{difficultyXP[difficulty]} XP</span>
                    </div>
                </div>

                <Button
                    size="sm"
                    variant="outline"
                    className="h-9 px-4 font-bold uppercase tracking-tight hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => window.open(`https://leetcode.com/problems/${slug}`, '_blank')}
                >
                    Solve
                </Button>
            </ItemActions>
        </Item>
    );
}

export default TaskQuestion