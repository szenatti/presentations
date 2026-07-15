//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/** Skeleton placeholder that fills its container while a query is loading. */
export function LoadingSkeleton({ className }: { className?: string }) {
    return <div className={cn("h-full w-full animate-pulse rounded-xl bg-muted", className)} aria-hidden="true" />;
}

/** Centered muted message shown when a query succeeds but returns no rows. */
export function EmptyState({ message = "No data for the current filters." }: { message?: string }) {
    return (
        <div className="flex h-full w-full items-center justify-center p-l text-center text-200 text-muted-foreground">
            {message}
        </div>
    );
}

/** Destructive banner shown when a query fails. */
export function ErrorState({ message }: { message: string }) {
    return (
        <div className="flex h-full w-full items-start gap-s rounded-xl border border-destructive/40 bg-destructive/10 p-l text-200 text-destructive">
            <TriangleAlert className="icon-size-200 shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-words">{message}</span>
        </div>
    );
}
