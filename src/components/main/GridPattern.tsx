import { cn } from "@/lib/utils";
import { GridPattern as GridPatternComponent } from "../ui/grid-pattern";

export function GridPattern({children}:{children:React.ReactNode}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <GridPatternComponent
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15]
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      {children}
    </div>
  );
}
