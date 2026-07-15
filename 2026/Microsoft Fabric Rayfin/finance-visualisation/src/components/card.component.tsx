import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}

export function Card({ title, subtitle, action, className, children }: CardProps) {
    return (
        <section className={cn("flex min-h-0 flex-col rounded-xl border border-border bg-card shadow-sm", className)}>
            {(title || action) && (
                <header className="flex items-start justify-between gap-m border-b border-border px-xl py-l">
                    <div className="min-w-0">
                        {title && <h2 className="font-heading text-400 font-semibold text-card-foreground">{title}</h2>}
                        {subtitle && <p className="mt-xxs text-200 text-muted-foreground">{subtitle}</p>}
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                </header>
            )}
            <div className="flex min-h-0 flex-1 flex-col p-l">{children}</div>
        </section>
    );
}