import Skeleton from "@/components/ui/Skeleton";

export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-background md:p-0">
          
    
          <div className="w-full max-w-4xl mx-auto p-4 md:p-6 mt-18">
          
            <div className="mb-8">
              <Skeleton className="h-8 w-3/4"/>
            </div>
    
            <div className="bg-surface rounded-lg shadow-sm border border-border p-6 space-y-4">
                        
              <Skeleton className="h-6 w-2/4"/>

              <Skeleton className="h-4 w-1/4"/>

              <Skeleton className="h-4 w-1/4"/>
              <Skeleton className="h-4 w-1/4"/>

            </div>
          </div>
        </main>
  );
}
