import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TimeDistributionItem } from '@/lib/api';

interface TimeDistributionChartProps {
  data: TimeDistributionItem[];
  isLoading?: boolean;
  title?: string;
}

export function TimeDistributionChart({ 
  data, 
  isLoading = false,
  title = '시간대별 문의 분포'
}: TimeDistributionChartProps) {
  // Fill missing hours with 0
  const fullData = Array.from({ length: 24 }, (_, hour) => {
    const existing = data.find(d => d.hour === hour);
    return { hour: `${hour}시`, count: existing?.count || 0, originalHour: hour };
  });

  if (isLoading) {
    return (
      <Card className="p-5">
        <h3 className="text-base font-semibold text-foreground mb-4">{title}</h3>
        <div className="h-64 bg-muted rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="p-5 animate-fade-in">
      <h3 className="text-base font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fullData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
              formatter={(value: number) => [`${value}건`, '문의']}
            />
            <Bar 
              dataKey="count" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
