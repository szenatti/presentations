import { TriangleAlert } from "lucide-react";

export function LoadingSkeleton() {
    return <div className="h-full w-full animate-pulse rounded-lg bg-muted" aria-label="Loading data" />;
}

export function EmptyState() {
    return (
        <div className="flex h-full items-center justify-center p-xl text-center text-200 text-muted-foreground">
            No finance data matches the current filters.
        </div>
    );
}

export function ErrorState({ message }: { message: string }) {
    return (
        <div className="flex items-start gap-s rounded-lg border border-destructive/40 bg-destructive/10 p-l text-200 text-destructive">
            <TriangleAlert className="icon-size-200 shrink-0" aria-hidden="true" />
            <span className="break-words">{message}</span>
        </div>
    );
}