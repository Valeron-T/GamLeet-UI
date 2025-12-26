import { CheckCircle, Circle, Clock, ShieldAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import { RiCopperCoinFill } from "react-icons/ri";
import { useRef } from "react";
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
                <p className="-mr-1">{difficultyReward[difficulty]}</p>
                <RiCopperCoinFill size={20} color="#ffc900" />

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://leetcode.com/problems/${slug}`, '_blank')}
                >
                    Open
                </Button>
            </ItemActions>
        </Item>
    );
}

export default TaskQuestion