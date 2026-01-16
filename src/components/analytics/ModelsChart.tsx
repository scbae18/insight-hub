import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ModelStat } from '@/lib/api';
import { Smartphone } from 'lucide-react';

interface ModelsChartProps {
  models: ModelStat[];
  isLoading?: boolean;
}

export function ModelsChart({ models, isLoading = false }: ModelsChartProps) {
  const chartData = models.slice(0, 8).map((m) => ({
    name: m.model.length > 15 ? m.model.slice(0, 15) + '...' : m.model,
    fullName: m.model,
    count: m.count,
  }));

  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">인기 모델</h3>
        </div>
        <div className="h-64 bg-muted rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">인기 모델</h3>
      </div>
      
      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">데이터가 없습니다</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                horizontal={false} 
              />
              <XAxis 
                type="number" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={120}
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
                labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ''}
                formatter={(value: number) => [`${value}건`, '문의']}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--chart-2))"
                radius={[0, 4, 4, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
