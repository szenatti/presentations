//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    className?: string;
    contentClassName?: string;
    children: ReactNode;
}

/**
 * Surface wrapper for a dashboard section. Renders an optional header
 * (title + subtitle + action) above a flexible content area. The content
 * area is a `flex-1 min-h-0` column so charts and grids can build a valid
 * height chain down from a card with a definite height.
 */
export function Card({ title, subtitle, action, className, contentClassName, children }: CardProps) {
    const hasHeader = Boolean(title || action);
    return (
        <section className={cn("flex flex-col rounded-2xl border border-border bg-card shadow-sm", className)}>
            {hasHeader && (
                <header className="flex items-start justify-between gap-m px-xl pt-l pb-m">
                    <div className="min-w-0">
                        {title && (
                            <h2 className="font-heading text-500 font-semibold leading-500 text-card-foreground">
                                {title}
                            </h2>
                        )}
                        {subtitle && <p className="mt-xxs text-200 text-muted-foreground">{subtitle}</p>}
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                </header>
            )}
            <div className={cn("flex min-h-0 flex-1 flex-col px-xl pb-l", !hasHeader && "pt-l", contentClassName)}>
                {children}
            </div>
        </section>
    );
}
