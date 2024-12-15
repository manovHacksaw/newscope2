import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      <Skeleton className="h-6 w-24 mb-8" />
      
      <div className="space-y-8">
        <Skeleton className="aspect-[2/1] w-full rounded-lg" />
        
        <Card className="border-none p-8 shadow-lg">
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}