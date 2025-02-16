"use client";

import { Area, AreaChart as AreaChartComponent, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function AreaChart({ data, label }: { data: { date: string; labels: number }[]; label: string }) {
  const chartConfig = {
    [`${label}`]: {
      label,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <AreaChartComponent data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id={`fill${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={`var(--color-${label})`} stopOpacity={0.8} />
            <stop offset="95%" stopColor={`var(--color-${label})`} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="labels"
          type="natural"
          fill={`url(#fill${label})`}
          fillOpacity={0.4}
          stroke={`var(--color-${label})`}
          stackId="a"
        />
      </AreaChartComponent>
    </ChartContainer>
  );
}
