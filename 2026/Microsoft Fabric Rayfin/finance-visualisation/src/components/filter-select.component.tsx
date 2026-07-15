import { useId } from "react";
import { ChevronDown } from "lucide-react";

export interface FilterOption {
    value: string;
    label: string;
}

interface FilterSelectProps {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
    allLabel: string;
    disabled?: boolean;
}

export function FilterSelect({ label, value, options, onChange, allLabel, disabled }: FilterSelectProps) {
    const id = useId();

    return (
        <div className="flex min-w-0 flex-col gap-xxs">
            <label htmlFor={id} className="text-100 font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-input bg-card px-m pr-xxxl text-300 text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">{allLabel}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <ChevronDown className="icon-size-200 pointer-events-none absolute right-m top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            </div>
        </div>
    );
}