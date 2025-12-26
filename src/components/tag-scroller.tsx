import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TagScroller({ tags }: { tags: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  const scroll = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setShowArrows(el.scrollWidth > el.clientWidth);
    };

    checkOverflow(); // initial check

    // Observe container resize & content changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    // Also listen for manual scrollWidth changes (e.g., tags loaded later)
    const mutationObserver = new MutationObserver(checkOverflow);
    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [tags]);

  return (
    <div className="flex items-center gap-2">
      {showArrows && (
        <button
          className="text-muted-foreground hover:text-foreground"
          onClick={() => scroll(-150)}
        >
          <ChevronLeft size={16}/>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth max-w-[240px] hide-scrollbar"
      >
        {tags.map((item) => (
          <Badge key={item} variant="secondary" className="whitespace-nowrap">
            {item}
          </Badge>
        ))}
      </div>

      {showArrows && (
        <button
          className="text-muted-foreground hover:text-foreground"
          onClick={() => scroll(150)}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
