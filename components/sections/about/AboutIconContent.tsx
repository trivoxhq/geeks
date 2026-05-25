import type { AboutIconSectionData } from "@/data/aboutCoreValues";
import { cn } from "@/lib/utils";

interface AboutIconContentProps {
  data: AboutIconSectionData;
  headingId: string;
  className?: string;
}

export function AboutIconContent({ data, headingId, className }: AboutIconContentProps) {
  const Icon = data.icon;

  return (
    <div className={cn("flex items-start gap-5 sm:gap-6 lg:gap-8", className)}>
      <div className="flex shrink-0 items-center justify-center text-primary" aria-hidden>
        <Icon className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <h2
          id={headingId}
          className="font-secondary text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {data.heading}
        </h2>
        <p className="font-primary mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg sm:leading-relaxed">
          {data.content}
        </p>
      </div>
    </div>
  );
}
