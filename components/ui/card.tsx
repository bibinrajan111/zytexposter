import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-emerald-300/20 bg-zinc-900/60 text-zinc-100 shadow-[0_18px_40px_-24px_rgba(74,222,128,0.6)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-5 md:p-6", className)} {...props} />;
}

export { Card, CardContent };
