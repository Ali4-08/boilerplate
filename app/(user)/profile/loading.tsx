import Skeleton from "@/components/ui/Skeleton";

export default function LoadingPage() {
  return (
  <main className="bg-background min-h-screen p-4 md:p-0">
         
        <div className="max-w-4xl mx-auto md:p-6">
  
          <Skeleton className="h-8 w-3/4 mb-8"/>
  
          <div className="space-y-2 mb-4 shadow-sm p-4 rounded-lg border border-border">
            
            <Skeleton className="h-6 w-2/4 mb-6"/>

            <Skeleton className="h-4 w-2/4"/>
            <Skeleton className="h-4 w-2/4"/>
            <Skeleton className="h-4 w-2/4"/>
            <Skeleton className="h-4 w-2/4"/>
          </div>
  
          <Skeleton className="h-16 w-full"/>
        </div>
      </main>
  );
}
