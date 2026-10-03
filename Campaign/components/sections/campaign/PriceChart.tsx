"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber, formatToman } from "@/lib/format";

export interface PriceChartPoint {
  timeLabel: string;
  price: number;
}

/** جدا شده تا رِچارتز فقط وقتی این ویجت دیده می‌شود بارگذاری شود */
export default function PriceChart({
  points,
  seriesLabel,
}: {
  points: PriceChartPoint[];
  seriesLabel: string;
}) {
  const values = points.map((p) => p.price);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.max(1, Math.round((max - min) * 0.25));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="var(--line)" vertical={false} />
        <XAxis
          dataKey="timeLabel"
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: "var(--line)" }}
          minTickGap={24}
        />
        <YAxis
          domain={[min - pad, max + pad]}
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          tickFormatter={(v) => formatNumber(Number(v))}
          tickLine={false}
          axisLine={false}
          width={78}
        />
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--muted)" }}
          formatter={(value) => [formatToman(Number(value)), seriesLabel]}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="var(--gold-dim)"
          strokeWidth={2}
          fill="url(#priceFill)"
          dot={false}
          activeDot={{ r: 4, fill: "var(--gold)", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
