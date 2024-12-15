import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ArticleMetaProps {
  date: string; // ISO string representing the date and time
  category: string;
  readTime?: string;
}

export function ArticleMeta({ date, category, readTime }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      {/* Display the formatted date and time */}
      <time dateTime={date}>
        {format(new Date(date), "MMMM dd, yyyy, h:mm a")}
      </time>

      {/* Category Badge */}
      <Badge variant="secondary" className="font-normal">
        {category}
      </Badge>

      {/* Optional Read Time */}
      {readTime && (
        <span className="flex items-center gap-1">
          <span>•</span>
          <span>{readTime} min read</span>
        </span>
      )}
    </div>
  );
}
