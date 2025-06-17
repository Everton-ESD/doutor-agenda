import { type ReactNode } from "react";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps {
  children: ReactNode;
  config: ChartConfig;
  className?: string;
}

export function ChartContainer({
  children,
  config,
  className,
}: ChartContainerProps) {
  return (
    <div className={className}>
      <style>
        {Object.entries(config).map(
          ([key, { color }]) => `
          :root {
            --color-${key}: ${color};
          }
        `,
        )}
      </style>
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  content: ReactNode;
}

export function ChartTooltip({ content }: ChartTooltipProps) {
  return content;
}

interface ChartTooltipContentProps {
  formatter: (value: number, name: string) => ReactNode;
  labelFormatter: (
    label: string,
    payload: Array<{ value: number; name: string }>,
  ) => string;
}

export function ChartTooltipContent({
  formatter,
  labelFormatter,
}: ChartTooltipContentProps) {
  return (
    <div className="p-2">
      <div className="font-medium">{labelFormatter("", [])}</div>
      <div>{formatter(0, "")}</div>
    </div>
  );
}
