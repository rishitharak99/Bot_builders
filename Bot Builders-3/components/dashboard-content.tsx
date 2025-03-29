import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardContent() {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Dashboard</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Card {i + 1}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  This is a sample card with some content. The sidebar now displays as icons by default and pushes
                  content when expanded.
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Main Content Area</h2>
            <p className="text-muted-foreground">
              This content area will shift to the right when the sidebar is expanded, rather than being covered by it.
              The sidebar starts in icon-only mode to maximize content space.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium">Section 1</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Content for section 1 goes here. This will move when the sidebar expands.
                </p>
              </div>
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium">Section 2</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Content for section 2 goes here. This will move when the sidebar expands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

