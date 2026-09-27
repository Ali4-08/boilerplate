import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/admin/Card";

export default function LoadingPage() {
  return (
    <main className="bg-background min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* عنوان */}
        <h1 className="text-3xl font-bold text-text-main mb-8">پنل مدیر</h1>

        {/* کارت های آماری */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* کارت اول تعداد کاران */}
          <Card>
            <Skeleton className="h-full w-full" />
          </Card>

          {/* کارت دوم تعداد مدیران */}
          <Card>
            <Skeleton className="h-full w-full" />
          </Card>

          {/* کارت سوم کاربران جدید */}
          <Card>
            <Skeleton className="h-full w-full" />
          </Card>
        </div>

        {/* لیست کاربران */}
        <div className="border border-border bg-surface shadow-sm rounded-lg overflow-hidden">
          {/* عنوان جدول */}
          <div className="border-b border-border p-6">
            <Skeleton className="h-6 w-3/4" />
          </div>

          {/* جدول کاربران */}
          <div className="overflow-auto">
            <table className="w-full">
              {/* عنوان ستون ها */}
              <thead className="bg-background border-border border-b">
                <tr>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    <Skeleton className="h-4 w-full" />
                  </th>                  
                </tr>
              </thead>

              {/* سطر های جدول */}
              <tbody>
                <tr>
                  <td>
                    <Skeleton className="h-8 w-full border border-gray-300 mb-1" />
                    <Skeleton className="h-8 w-full border border-gray-300 mb-1" />
                    <Skeleton className="h-8 w-full border border-gray-300 mb-1" />
                    <Skeleton className="h-8 w-full border border-gray-300 mb-1" />
                  </td>                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
