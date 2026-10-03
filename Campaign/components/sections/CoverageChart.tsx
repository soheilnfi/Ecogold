"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPercent } from "@/lib/format";
import type { CoverageHistoryPoint } from "@/lib/mock/coverage";

/** جدا شده تا رِچارتز (کتابخانهٔ سنگین) فقط برای این سکشن، به‌صورت جدا از بستهٔ اصلی بارگذاری شود */
export default function CoverageChart({
  chartData,
  baselineLabel,
  ratioCaption,
}: {
  chartData: (CoverageHistoryPoint & { dateLabel: string })[];
  baselineLabel: string;
  ratioCaption: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid stroke="var(--vault-line)" vertical={false} />
        <XAxis
          dataKey="dateLabel"
          tick={{ fill: "var(--vault-muted)", fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: "var(--vault-line)" }}
        />
        <YAxis
          domain={[98, 106]}
          tick={{ fill: "var(--vault-muted)", fontSize: 11 }}
          tickFormatter={(v) => `${v}٪`}
          width={40}
        />
        <ReferenceLine
          y={100}
          stroke="var(--gold-dim)"
          strokeDasharray="4 4"
          label={{
            value: baselineLabel,
            position: "insideTopLeft",
            fill: "var(--gold-dim)",
            fontSize: 11,
          }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--vault-700)",
            border: "1px solid var(--vault-line)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--vault-muted)" }}
          formatter={(value) => [formatPercent(Number(value)), ratioCaption]}
          labelFormatter={(label) => label}
        />
        <Line
          type="linear"
          dataKey="ratio"
          stroke="var(--gold)"
          strokeWidth={2}
          dot={{ r: 4, fill: "var(--gold)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
